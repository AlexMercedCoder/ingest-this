---
title: "Maintaining Apache Iceberg Tables: Compaction, Expiry, and Cleanup"
date: "2026-04-29"
description: "Keep Iceberg tables fast with compaction, snapshot expiry, orphan cleanup, and manifest rewriting. Here is when and how to run each operation."
author: "Alex Merced"
category: "Data Lakehouse"
bannerImage: "/images/2026/apache-iceberg-masterclass/10-maintaining-iceberg/maintenance-operations.png"
tags:
  - apache iceberg
  - data lakehouse
  - data engineering
  - dremio
---





This is Part 10 of a 15-part [Apache Iceberg Masterclass](/posts/2026/2026-04-29-apache-iceberg-masterclass-01-table-formats). [Part 9](/posts/2026/2026-04-29-apache-iceberg-masterclass-09-storage-degradation) covered how tables degrade. This article covers the four maintenance operations that keep Iceberg tables healthy and the three approaches to running them.

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

## The Four Maintenance Operations

![The four Iceberg maintenance operations: compaction, snapshot expiry, orphan cleanup, and manifest rewriting](/images/2026/apache-iceberg-masterclass/10-maintaining-iceberg/maintenance-operations.png)

### 1. Compaction (File Rewriting)

![Compaction merging 500 small files into 2 large files with identical data](/images/2026/apache-iceberg-masterclass/10-maintaining-iceberg/compaction-before-after.png)

Compaction reads small files, merges them into optimally-sized files (128-512 MB), and optionally re-sorts the data. It is the most impactful maintenance operation because it directly addresses the [small file problem](/posts/2026/2026-04-29-apache-iceberg-masterclass-09-storage-degradation) and restores sort order effectiveness.

**In Spark:**

```sql
CALL system.rewrite_data_files('analytics.orders')
```

**In [Dremio](https://www.dremio.com/blog/compaction-in-apache-iceberg-fine-tuning-your-iceberg-tables-data-files/):**

```sql
OPTIMIZE TABLE analytics.orders REWRITE DATA USING BIN_PACK
```

Compaction with sorting rewrites files so that column values are ordered, tightening the min/max statistics and making [file skipping](/posts/2026/2026-04-29-apache-iceberg-masterclass-03-iceberg-metadata-performance) far more effective:

```sql
OPTIMIZE TABLE analytics.orders REWRITE DATA USING SORT (order_date, customer_id)
```

### 2. Snapshot Expiry

Snapshot expiry removes old snapshots from the metadata. After expiry, the snapshot and its exclusive data files are eligible for cleanup. You typically retain snapshots for a window (e.g., 7 days) to support time travel, then expire everything older.

```sql
-- Spark
CALL system.expire_snapshots('analytics.orders', TIMESTAMP '2024-04-22 00:00:00')

-- Dremio
ALTER TABLE analytics.orders EXPIRE SNAPSHOTS OLDER_THAN = '2024-04-22 00:00:00'
```

### 3. Orphan File Cleanup

After snapshots are expired, the data files they exclusively referenced become orphans. Orphan cleanup scans the storage directory, compares files against the current metadata, and deletes files that are not referenced by any snapshot.

```sql
-- Spark
CALL system.remove_orphan_files('analytics.orders')
```

This operation should run after snapshot expiry and with a safety delay (e.g., files older than 3 days) to avoid deleting files from in-progress writes.

Running orphan cleanup too aggressively can delete files from long-running write operations. A 3-day safety window ensures that any write operation has had time to complete before its files are considered orphans.

### 4. Manifest Rewriting

Over many commits, manifests accumulate. A single snapshot's manifest list might reference hundreds of small manifests from individual commits. Manifest rewriting consolidates them into fewer, larger manifests.

```sql
-- Spark
CALL system.rewrite_manifests('analytics.orders')
```

This speeds up scan planning because the engine reads fewer manifest files. Each manifest file requires a separate I/O operation to read, so reducing the count from 500 to 20 eliminates 480 I/O round trips during query planning.

### Sort-Order Compaction

Standard compaction (BIN_PACK) merges small files without changing the data order. Sort-order compaction rewrites files with data sorted by specified columns, which tightens the min/max statistics and makes [file skipping](/posts/2026/2026-04-29-apache-iceberg-masterclass-03-iceberg-metadata-performance) more effective:

```sql
-- Dremio sort-order compaction
OPTIMIZE TABLE analytics.orders REWRITE DATA USING SORT (order_date, customer_id)

-- Spark sort-order compaction
CALL system.rewrite_data_files(
  table => 'analytics.orders',
  strategy => 'sort',
  sort_order => 'order_date ASC NULLS LAST, customer_id ASC NULLS LAST'
)
```

Sort-order compaction is more expensive than BIN_PACK because it reads, sorts, and rewrites all data. However, the performance improvement for queries that filter on the sorted columns is substantial: file skipping can eliminate 90%+ of data files when the sort columns match common query filters.

### Data Retention Policies

Decide how long to keep historical data accessible through time travel:

| Retention Need | Recommended Snapshot Retention |
|---|---|
| Debugging recent issues | 7 days |
| Monthly reporting compliance | 30 days |
| Regulatory audit requirements | 90+ days |
| Storage cost optimization | 3-5 days |

Longer retention means more snapshots, more metadata, and more storage consumed by old data files. Shorter retention reduces costs but limits time travel capabilities.

## Three Approaches to Maintenance

![Comparison of automated versus manual maintenance approaches](/images/2026/apache-iceberg-masterclass/10-maintaining-iceberg/auto-vs-manual-maintenance.png)

### Manual (Scheduled Jobs)

Run maintenance operations on a schedule using Spark, Trino, or Dremio. A typical pattern:

1. Run compaction daily for heavily-written tables
2. Expire snapshots older than 7 days
3. Remove orphan files older than 3 days
4. Rewrite manifests monthly

**Pros:** Full control over timing and configuration. **Cons:** Requires operational effort; forgotten or broken jobs lead to degradation.

### Semi-Automated (Scheduled with Monitoring)

Build a monitoring layer that checks table health metrics ([Part 9](/posts/2026/2026-04-29-apache-iceberg-masterclass-09-storage-degradation) diagnostics) and triggers maintenance only when thresholds are exceeded (e.g., average file size drops below 64 MB).

### Fully Automated

Use a platform that handles maintenance autonomously. [Dremio's automatic table optimization](https://www.dremio.com/blog/table-optimization-in-dremio/) runs compaction, expiry, and cleanup for tables managed by Open Catalog without any user configuration. AWS [S3 Tables](/posts/2026/2026-04-29-apache-iceberg-masterclass-08-embedded-catalogs) provides built-in compaction.

| Approach | Effort | Risk | Best For |
|---|---|---|---|
| Manual | High | High (can forget) | Full control needs |
| Semi-Automated | Medium | Medium | Custom thresholds |
| Fully Automated | None | Low | Most production tables |

## Recommended Maintenance Schedule

| Operation | Frequency | Recommendation |
|---|---|---|
| Compaction | Daily (heavy tables), weekly (light) | Trigger when avg file size \< 64 MB |
| Snapshot expiry | Daily | Retain 7-30 days for time travel |
| Orphan cleanup | Weekly | Safety delay of 3+ days |
| Manifest rewrite | Monthly | When manifest count \> 500 |

For most teams, starting with [Dremio's autonomous optimization](https://www.dremio.com/platform/reflections/) and only adding manual jobs for tables with unusual requirements is the most practical approach.

## Common Maintenance Pitfalls

**Running compaction during peak query hours:** Compaction reads and rewrites data files, which competes with analytical queries for I/O bandwidth. Schedule compaction during off-peak hours, or use a separate compute cluster (Spark on EMR) that does not share resources with your query engine.

**Expiring snapshots too aggressively:** If you expire snapshots while a long-running query is using one of them, the query can fail because the data files it needs might be cleaned up. Always keep snapshots for at least as long as your longest-running query.

**Forgetting orphan cleanup:** Many teams run compaction and snapshot expiry but forget orphan cleanup. Without it, compacted and expired data files accumulate indefinitely. Set up orphan cleanup as a weekly job with a 3-day safety window.

**Not monitoring after migration:** Tables migrated from Hive or other formats ([Part 15](/posts/2026/2026-04-29-apache-iceberg-masterclass-15-migrating-to-iceberg)) often inherit poor file layouts. Run an immediate compaction pass after any in-place migration.

[Part 11](/posts/2026/2026-04-29-apache-iceberg-masterclass-11-metadata-tables) covers how to query the metadata tables that power diagnostics.

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
