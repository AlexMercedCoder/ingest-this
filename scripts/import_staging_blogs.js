const fs = require('fs');
const path = require('path');

const STAGING_DIR = path.join(process.cwd(), 'staging');
const POSTS_DIR = path.join(process.cwd(), 'posts', '2026');
const IMAGES_BASE_DIR = path.join(process.cwd(), 'public', 'images', '2026');

// Series directory mappings
const SERIES_MAP = {
    'AI_FEATURE_BLOGS': { category: 'AI', tags: ['ai', 'dremio', 'sql', 'machine learning'] },
    'connector-blogs': { category: 'Data Engineering', tags: ['dremio', 'connectors', 'data integration'] }
};

// Ensure directories exist
if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
}

// Escape MDX-problematic characters outside code fences and inline code
function escapeMdxContent(text) {
    // Split by code fences (``` blocks)
    const parts = text.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, idx) => {
        // Odd indices are code fence blocks — leave untouched
        if (part.startsWith('```')) return part;
        
        // For non-code parts, process line by line
        return part.split('\n').map(line => {
            // Preserve inline code spans: split by backtick pairs
            const segments = line.split(/(`[^`]+`)/g);
            return segments.map((seg, si) => {
                // Odd indices are inline code — leave untouched
                if (si % 2 === 1) return seg;
                
                // Escape { and } (MDX expressions)
                seg = seg.replace(/\{/g, '\\{').replace(/\}/g, '\\}');
                
                // Escape < and > but preserve markdown links/images and HTML entities
                // Escape standalone < that aren't part of HTML entities
                seg = seg.replace(/<(?!\/?\w|!--)/g, '\\<');
                seg = seg.replace(/(?<!="|=')>/g, '\\>');
                
                return seg;
            }).join('');
        }).join('\n');
    }).join('');
}

// Function to process a single post
function processPost(series, chapterDir) {
    const chapterPath = path.join(STAGING_DIR, series, chapterDir);
    const contentPath = path.join(chapterPath, 'content.md');

    if (!fs.existsSync(contentPath)) {
        console.warn(`Skipping ${chapterDir} in ${series}: content.md not found.`);
        return;
    }

    let content = fs.readFileSync(contentPath, 'utf-8');
    const lines = content.split('\n');

    // Extract Title (H1)
    let title = '';
    let titleIndex = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('# ')) {
            title = lines[i].replace('# ', '').trim();
            titleIndex = i;
            break;
        }
    }

    if (!title) {
        console.warn(`Skipping ${chapterDir} in ${series}: No H1 title found.`);
        return;
    }

    // remove title from content
    if (titleIndex !== -1) {
        lines.splice(titleIndex, 1);
    }

    // Extract Description (first paragraph)
    let description = '';
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line && !line.startsWith('#') && !line.startsWith('![')) {
             description = line;
             break;
        }
    }
    // refined description extraction strategy? 
    // Just find first non-empty line that isn't a header or image.
    // If it's too long, truncate? For now, leave as is.

    // Image Handling
    const imageDestDir = path.join(IMAGES_BASE_DIR, series, chapterDir);
    if (!fs.existsSync(imageDestDir)) {
        fs.mkdirSync(imageDestDir, { recursive: true });
    }

    let bannerImage = '';

    // Check for standalone banner.png in chapter dir
    if (!bannerImage) {
        const bannerFile = ['banner.png', 'banner.jpg', 'banner.jpeg', 'banner.webp']
            .find(f => fs.existsSync(path.join(chapterPath, f)));
        if (bannerFile) {
            const src = path.join(chapterPath, bannerFile);
            const dest = path.join(imageDestDir, bannerFile);
            fs.copyFileSync(src, dest);
            bannerImage = `/images/2026/${series}/${chapterDir}/${bannerFile}`;
        }
    }

    // Replace image links in content and move files
    const newContentLines = lines.map(line => {
        // Regex for Markdown images: ![alt](url)
        const regex = /!\[(.*?)\]\((.*?)\)/g;
        return line.replace(regex, (match, alt, url) => {
            // Skip external URLs
            if (url.startsWith('http://') || url.startsWith('https://')) {
                return match;
            }
            const imageName = path.basename(url);
            const imageSrcPath = path.join(chapterPath, url);
            
            if (fs.existsSync(imageSrcPath)) {
                // Determine destination
                const imageDestPath = path.join(imageDestDir, imageName);
                fs.copyFileSync(imageSrcPath, imageDestPath);
                
                // If no banner image yet, use the first image found
                if (!bannerImage) {
                    bannerImage = `/images/2026/${series}/${chapterDir}/${imageName}`;
                }
                
                return `![${alt}](/images/2026/${series}/${chapterDir}/${imageName})`;
            } else {
                console.warn(`Image not found: ${url} in ${chapterDir}`);
                return match; // return original if not found
            }
        });
    });

    // MDX-safe escaping: escape <, >, {, } outside code fences and inline code
    content = escapeMdxContent(newContentLines.join('\n'));


    // Generate Frontmatter
    const { category, tags } = SERIES_MAP[series] || { category: 'General', tags: [] };
    
    // Construct simplified slug from chapter dir (remove number prefix if desired, keeping it for ordering is better?)
    // The requirement was: 2026-03-01-[series]-[chapter]-[slug]
    // simpler: 2026-03-01-[series]-[chapterDir]
    const filename = `2026-03-01-${series}-${chapterDir}.md`;
    const finalPath = path.join(POSTS_DIR, filename);

    const frontmatter = [
        '---',
        `title: "${title.replace(/"/g, '\\"')}"`,
        `date: "2026-03-01"`,
        `description: "${description.replace(/"/g, '\\"')}"`,
        `author: "Alex Merced"`,
        `category: "${category}"`,
        `bannerImage: "${bannerImage}"`,
        'tags:',
        ...tags.map(t => `  - ${t}`),
        '---',
        ''
    ].join('\n');

    fs.writeFileSync(finalPath, frontmatter + content);
    console.log(`Generated: ${filename}`);
}

// Main Execution
const seriesList = Object.keys(SERIES_MAP);

seriesList.forEach(series => {
    const seriesPath = path.join(STAGING_DIR, series);
    if (fs.existsSync(seriesPath)) {
        const chapters = fs.readdirSync(seriesPath).filter(f => fs.statSync(path.join(seriesPath, f)).isDirectory());
        chapters.forEach(chapter => {
             processPost(series, chapter);
        });
    } else {
        console.warn(`Series directory not found: ${series}`);
    }
});
