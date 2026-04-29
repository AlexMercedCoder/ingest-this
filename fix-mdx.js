const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(process.cwd(), 'posts', '2026');

const files = fs.readdirSync(POSTS_DIR).filter(file => file.startsWith('2026-04-29-'));

files.forEach(file => {
    const filePath = path.join(POSTS_DIR, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Fix the description in frontmatter
    content = content.replace(/description:\s*"<!--\s*Meta Description:\s*(.*?)\s*-->"/i, 'description: "$1"');
    
    // Fallback: If it's a generic comment but not Meta Description
    content = content.replace(/description:\s*"<!--\s*(.*?)\s*-->"/i, 'description: "$1"');

    // Remove all HTML comments from the rest of the body (and any leftover in frontmatter if escaping went wrong, but frontmatter shouldn't have any after above)
    // Wait, the above regex fixes the description. Now we just strip all <!-- ... --> or <!-- ... --\>
    content = content.replace(/<!--[\s\S]*?--\\?>/g, '');

    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${file}`);
});
