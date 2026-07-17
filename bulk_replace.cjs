const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, 'src/pages'),
  path.join(__dirname, 'src/components/dashboard'),
  path.join(__dirname, 'src/layouts')
];

function processFile(filePath) {
  // Skip Home.jsx as requested
  if (filePath.endsWith('Home.jsx')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replacements
  // 1. bg-bgSurfaceHighlight -> bg-white/5 backdrop-blur-sm border border-white/10
  content = content.replace(/\bbg-bgSurfaceHighlight\b/g, 'bg-white/5 backdrop-blur-sm border border-white/10');
  
  // 2. bg-bgSurface -> bg-[#0a0a0a]/80 backdrop-blur-md
  // We need to be careful not to replace bg-bgSurface if it was already replaced by the Highlight rule, 
  // but the Highlight rule removes the word bgSurface so it's safe.
  content = content.replace(/\bbg-bgSurface\b/g, 'bg-[#0a0a0a]/80 backdrop-blur-md');

  // 3. border-borderColor -> border-white/10
  content = content.replace(/\bborder-borderColor\b/g, 'border-white/10');

  // 4. shadow-sm -> shadow-[0_0_15px_rgba(139,92,246,0.1)]
  content = content.replace(/\bshadow-sm\b/g, 'shadow-[0_0_15px_rgba(139,92,246,0.1)]');

  // 5. shadow-lg -> shadow-[0_0_30px_rgba(139,92,246,0.15)]
  content = content.replace(/\bshadow-lg\b/g, 'shadow-[0_0_30px_rgba(139,92,246,0.15)]');

  // 6. shadow-xl -> shadow-[0_0_40px_rgba(139,92,246,0.2)]
  content = content.replace(/\bshadow-xl\b/g, 'shadow-[0_0_40px_rgba(139,92,246,0.2)]');

  // 7. Remove "dark:" prefix from these replacements to enforce the aesthetic in all modes if they were duplicated
  content = content.replace(/dark:bg-white\/5/g, 'bg-white/5');
  content = content.replace(/dark:bg-\[#0a0a0a\]\/80/g, 'bg-[#0a0a0a]/80');
  content = content.replace(/dark:border-white\/10/g, 'border-white/10');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (stat.isFile() && filePath.endsWith('.jsx')) {
      processFile(filePath);
    }
  }
}

targetDirs.forEach(walkDir);
console.log('Bulk replacement complete.');
