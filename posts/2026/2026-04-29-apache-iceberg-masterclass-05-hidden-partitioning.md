---
title: "Hidden Partitioning: How Iceberg Eliminates Accidental Full Table Scans"
date: "2026-04-29"
description: "Iceberg's hidden partitioning separates physical layout from user queries using transform functions. Here is how it works and why it eliminates accidental full scans."
author: "Alex Merced"
category: "Data Lakehouse"
tags:
  - apache iceberg
  - data lakehouse
  - data engineering
  - dremio
---





This is Part 5 of a 15-part [Apache Iceberg Masterclass](/posts/2026/2026-04-29-apache-iceberg-masterclass-01-table-formats). [Part 4](/posts/2026/2026-04-29-apache-iceberg-masterclass-04-partition-evolution) covered partition evolution. This article covers hidden partitioning, the feature that ensures users never need to know how their data is physically organized.

The most expensive mistake in data lake querying is the accidental full table scan: a query that reads every file because the user did not correctly reference the partition columns. In Hive, this happens constantly. In Iceberg, it is structurally impossible because users never reference partition columns at all.

## Table of Contents

1. [What Are Table Formats and Why Were They Needed?](/posts/2026/2026-04-29-apache-iceberg-masterclass-01-table-formats)
2. [The Metadata Structure of Current Table Formats](/posts/2026/2026-04-29-apache-iceberg-masterclass-02-metadata-structures)
3. [Performance and Apache Iceberg's Metadata](/posts/2026/2026-04-29-apache-iceberg-masterclass-03-iceberg-metadata-performance)
4. [Technical Deep Dive on Partition Evolution](/posts/2026/2026-04-29-apache-iceberg-masterclass-04-partition-evolution)
5. [Technical Deep Dive on Hidden Partitioning](/posts/2026/2026-04-29-apache-iceberg-masterclass-05-hidden-partitioning)
6. [Writing to an Apache Iceberg Table](/posts/2026/2026-04-29-apache-iceberg-masterclass-06-writing-to-iceberg)
7. [What Are Lakehouse Catalogs?](/posts/2026/2026-04-29-apache-iceberg-masterclass-07-lakehouse-catalogs)
8. [Embedded Catalogs: S3 Tables and MinIO AI Stor](/posts/2026/2026-04-29-apache-iceberg-masterclass-08-embedded-catalogs)
9. [How Iceberg Table Storage Degrades Over Time](/posts/2026/2026-04-29-apache-iceberg-masterclass-09-storage-degradation)
10. [Maintaining Apache Iceberg Tables](/posts/2026/2026-04-29-apache-iceberg-masterclass-10-maintaining-iceberg)
11. [Apache Iceberg Metadata Tables](/posts/2026/2026-04-29-apache-iceberg-masterclass-11-metadata-tables)
12. [Using Iceberg with Python and MPP Engines](/posts/2026/2026-04-29-apache-iceberg-masterclass-12-python-and-mpp)
13. [Streaming Data into Apache Iceberg Tables](/posts/2026/2026-04-29-apache-iceberg-masterclass-13-streaming-to-iceberg)
14. [Hands-On with Iceberg Using Dremio Cloud](/posts/2026/2026-04-29-apache-iceberg-masterclass-14-hands-on-dremio-cloud)
15. [Migrating to Apache Iceberg](/posts/2026/2026-04-29-apache-iceberg-masterclass-15-migrating-to-iceberg)

## The Accidental Full Scan Problem

![Exposed partitioning in Hive versus hidden partitioning in Iceberg showing the same pruning with different user experience](/images/2026/apache-iceberg-masterclass/05-hidden-partitioning/exposed-vs-hidden-partitioning.png)

In Hive, a table partitioned by `year`, `month`, and `day` requires queries to filter on those exact columns:

```sql
-- Hive: This prunes correctly
SELECT * FROM orders WHERE year = 2024 AND month = 3 AND day = 15

-- Hive: This scans EVERYTHING (no pruning)
SELECT * FROM orders WHERE order_date = '2024-03-15'
```

The second query reads every partition because Hive does not know that `order_date` maps to the `year`, `month`, and `day` partition columns. There is no error, no warning. The query simply runs 100x slower than it should.

This happens because Hive partitioning is "exposed." The physical partition columns (`year`, `month`, `day`) are separate from the source column (`order_date`). Users must understand this mapping and construct their filters accordingly.

## How Iceberg Hides Partitioning

Iceberg flips this model. Users filter on the source column (`order_date`), and the engine automatically maps the filter to the partition values using [transform functions](https://iceberg.apache.org/spec/#partitioning).

```sql
-- Iceberg: This prunes correctly. Always.
SELECT * FROM orders WHERE order_date = '2024-03-15'
```

The table's partition spec declares: `PARTITIONED BY (day(order_date))`. When the engine processes this query, it:

1. Reads the partition spec from the table metadata
2. Applies the `day()` transform to the filter value: `day('2024-03-15')` = `2024-03-15`
3. Checks manifest entries for files with matching partition values
4. Skips every file whose partition value is not `2024-03-15`

The user writes natural SQL against the source columns. The engine handles the physical-to-logical mapping. This is why it is called "hidden" partitioning: the partition structure is invisible to the user.

## The Six Transform Functions

![Iceberg's six partition transform functions showing how each maps source values to partition values](/images/2026/apache-iceberg-masterclass/05-hidden-partitioning/partition-transform-functions.png)

Iceberg defines six [partition transforms](https://iceberg.apache.org/spec/#partition-transforms) that map source column values to partition values:

### Temporal Transforms

| Transform | Input | Output | Use Case |
|---|---|---|---|
| `year(ts)` | `2024-03-15 10:30:00` | `2024` | Low-volume tables, yearly reporting |
| `month(ts)` | `2024-03-15 10:30:00` | `2024-03` | Medium-volume tables, monthly queries |
| `day(ts)` | `2024-03-15 10:30:00` | `2024-03-15` | High-volume tables, daily queries |
| `hour(ts)` | `2024-03-15 10:30:00` | `2024-03-15-10` | Very high-volume streaming data |

The temporal transforms are hierarchical. If a table is partitioned by `day(ts)` and a user filters `WHERE ts >= '2024-03-01' AND ts < '2024-04-01'`, the engine recognizes this as a range of days and prunes to only the 31 matching partitions. Engines like [Dremio](https://www.dremio.com/blog/fewer-accidental-full-table-scans-brought-to-you-by-apache-icebergs-hidden-partitioning/) handle this mapping automatically for equality, range, and IN-list predicates.

### Value Transforms

| Transform | Input | Output | Use Case |
|---|---|---|---|
| `truncate(N, col)` | `'New York'` (N=3) | `'New'` | Grouping strings by prefix |
| `bucket(N, col)` | `12345` (N=16) | `7` | Even distribution of high-cardinality columns |

**`truncate(N, col)`** takes the first N characters of a string (or truncates a number to a width). This is useful when you want to group data by a string prefix without creating one partition per unique value.

**`bucket(N, col)`** applies a hash function and mod N to produce a bucket number from 0 to N-1. This distributes data evenly across a fixed number of buckets, regardless of the column's value distribution. It is the go-to transform for high-cardinality columns like `user_id` or `order_id` where identity partitioning would create millions of tiny partitions.

### The Identity Transform

The identity transform (`identity(col)`) uses the raw column value as the partition value. This is equivalent to Hive-style partitioning, but the column is still "hidden" because the engine handles the mapping. It is useful for low-cardinality columns like `region` or `status` where each unique value should be its own partition.

## How Pruning Works Under the Hood

![Step-by-step flow showing how the engine maps a user query through the partition spec to prune files](/images/2026/apache-iceberg-masterclass/05-hidden-partitioning/hidden-partition-pruning-flow.png)

The pruning process works in three phases:

**Phase 1: Predicate translation.** The engine examines each `WHERE` clause predicate and checks if the filtered column is part of the partition spec. If `order_date` is the source column for `day(order_date)`, the engine can translate `order_date = '2024-03-15'` into a partition filter.

**Phase 2: Manifest list evaluation.** The manifest list stores partition value ranges per manifest. The engine checks if each manifest's range includes the target partition value. Manifests whose range does not overlap are skipped entirely.

**Phase 3: Manifest entry evaluation.** For each surviving manifest, the engine checks individual file entries. Only files whose partition value matches `2024-03-15` are included in the scan plan.

This is the same pruning cascade described in [Part 3](/posts/2026/2026-04-29-apache-iceberg-masterclass-03-iceberg-metadata-performance), but now the partition values were derived automatically from the user's filter on a source column.

## Choosing the Right Transform

The choice of partition transform depends on data volume and query patterns:

| Scenario | Recommended Transform | Rationale |
|---|---|---|
| 10 GB/day of event data | `day(event_time)` | Each day is one partition (~10 GB), well-sized files |
| 1 TB/day of event data | `hour(event_time)` | Each hour is ~42 GB, prevents oversized partitions |
| 500 MB/month of reports | `month(report_date)` | Monthly partitions keep file counts manageable |
| User-level data, 10M users | `bucket(64, user_id)` | Even distribution, avoids millions of tiny partitions |
| Region-based data, 5 regions | `identity(region)` | Only 5 partitions, each meaningfully distinct |

The goal is to create partitions that are large enough to contain optimally-sized files (128-512 MB each) but small enough that partition pruning eliminates most files for typical queries.

**Over-partitioning** (too many small partitions) creates the small file problem: thousands of tiny files that bloat metadata and slow query planning. **Under-partitioning** (too few large partitions) reduces pruning effectiveness because each partition contains too much data.

## Combining Transforms

Iceberg supports multi-column partition specs:

```sql
CREATE TABLE events (
  event_id BIGINT,
  event_time TIMESTAMP,
  user_id BIGINT,
  event_type STRING
) PARTITIONED BY (day(event_time), bucket(32, user_id))
```

This creates a two-dimensional partition space: each combination of day and user bucket is a separate partition. Queries filtering on `event_time` get day-level pruning. Queries filtering on `user_id` get bucket-level pruning. Queries filtering on both get pruning from both dimensions.

[Dremio](https://www.dremio.com/blog/apache-iceberg-101-your-guide-to-learning-apache-iceberg-concepts-and-practices/) supports all Iceberg transform functions and automatically applies pruning for any combination of partition columns in the query's WHERE clause.

## Why This Matters for Teams

Hidden partitioning changes the operational model for data teams:

**Data engineers** define the partition strategy once in the table's partition spec. They can change it later through [partition evolution](/posts/2026/2026-04-29-apache-iceberg-masterclass-04-partition-evolution) without breaking anything.

**Analysts and data scientists** write natural SQL against the business columns they understand. They never need to know whether the table is partitioned by day, month, or bucket. Their queries are automatically optimized.

**BI tools and dashboards** connect to Iceberg tables and issue standard SQL. The tools do not need to understand Iceberg's partitioning; the engine handles the optimization. This is why hidden partitioning is essential for self-service analytics platforms like [Dremio](https://www.dremio.com/platform/semantic-layer/).

The net result: no accidental full table scans, no partition-aware query patterns required from users, and the ability to change the physical layout without impacting any downstream consumer. [Part 6](/posts/2026/2026-04-29-apache-iceberg-masterclass-06-writing-to-iceberg) covers what happens when data is written to an Iceberg table.

### Books to Go Deeper

- [Architecting the Apache Iceberg Lakehouse](https://www.amazon.com/Architecting-Apache-Iceberg-Lakehouse-open-source/dp/1633435105/) by Alex Merced (Manning)
- [Lakehouses with Apache Iceberg: Agentic Hands-on](https://www.amazon.com/Lakehouses-Apache-Iceberg-Agentic-Hands-ebook/dp/B0GQL4QNRT/) by Alex Merced
- [Constructing Context: Semantics, Agents, and Embeddings](https://www.amazon.com/Constructing-Context-Semantics-Agents-Embeddings/dp/B0GSHRZNZ5/) by Alex Merced
- [Apache Iceberg & Agentic AI: Connecting Structured Data](https://www.amazon.com/Apache-Iceberg-Agentic-Connecting-Structured/dp/B0GW2WF4PX/) by Alex Merced
- [Open Source Lakehouse: Architecting Analytical Systems](https://www.amazon.com/Open-Source-Lakehouse-Architecting-Analytical/dp/B0GW595MVL/) by Alex Merced

### Free Resources

- [FREE - Apache Iceberg: The Definitive Guide](https://drmevn.fyi/linkpageiceberg)
- [FREE - Apache Polaris: The Definitive Guide](https://drmevn.fyi/linkpagepolaris)
- [FREE - Agentic AI for Dummies](https://hello.dremio.com/wp-resources-agentic-ai-for-dummies-reg.html?utm_source=link_page&utm_medium=influencer&utm_campaign=iceberg&utm_term=qr-link-list-04-07-2026&utm_content=alexmerced)
- [FREE - Leverage Federation, The Semantic Layer and the Lakehouse for Agentic AI](https://hello.dremio.com/wp-resources-agentic-analytics-guide-reg.html?utm_source=link_page&utm_medium=influencer&utm_campaign=iceberg&utm_term=qr-link-list-04-07-2026&utm_content=alexmerced)
- [FREE with Survey - Understanding and Getting Hands-on with Apache Iceberg in 100 Pages](https://forms.gle/xdsun6JiRvFY9rB36)
