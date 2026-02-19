const fs = require('fs');
const path = require('path');

const STAGING_DIR = path.join(process.cwd(), 'staging');
const POSTS_DIR = path.join(process.cwd(), 'posts', '2026');
const IMAGES_BASE_DIR = path.join(process.cwd(), 'public', 'images', '2026');

// Series directory mappings
const SERIES_MAP = {
    'data_modeling': { category: 'Data Modeling', tags: ['data modeling', 'database design'] },
    'debp': { category: 'Data Engineering', tags: ['data engineering', 'best practices'] },
    'semantic_layer_seo': { category: 'Semantic Layer', tags: ['semantic layer', 'seo', 'analytics'] }
};

// Ensure directories exist
if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
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

    // Check for postbanner folder
    const bannerPath = path.join(chapterPath, 'postbanner');
    if (fs.existsSync(bannerPath)) {
        const files = fs.readdirSync(bannerPath);
        const imageFile = files.find(f => /\.(png|jpg|jpeg|gif|webp)$/i.test(f));
        if (imageFile) {
             const src = path.join(bannerPath, imageFile);
             const dest = path.join(imageDestDir, imageFile);
             fs.copyFileSync(src, dest);
             bannerImage = `/images/2026/${series}/${chapterDir}/${imageFile}`;
        }
    }

    // Replace image links in content and move files
    const newContentLines = lines.map(line => {
        // Regex for Markdown images: ![alt](url)
        const regex = /!\[(.*?)\]\((.*?)\)/g;
        return line.replace(regex, (match, alt, url) => {
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

    content = newContentLines.join('\n');


    // Generate Frontmatter
    const { category, tags } = SERIES_MAP[series] || { category: 'General', tags: [] };
    
    // Construct simplified slug from chapter dir (remove number prefix if desired, keeping it for ordering is better?)
    // The requirement was: 2026-02-19-[series]-[chapter]-[slug]
    // simpler: 2026-02-19-[series]-[chapterDir]
    const filename = `2026-02-19-${series}-${chapterDir}.md`;
    const finalPath = path.join(POSTS_DIR, filename);

    const frontmatter = [
        '---',
        `title: "${title.replace(/"/g, '\\"')}"`,
        `date: "2026-02-19"`,
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
