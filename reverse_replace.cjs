const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, 'src/pages'),
  path.join(__dirname, 'src/components/dashboard'),
  path.join(__dirname, 'src/layouts')
];

function processFile(filePath) {
  // Skip Home.jsx
  if (filePath.endsWith('Home.jsx')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Reverse 1. bg-white/5 backdrop-blur-sm border border-white/10 -> bg-bgSurfaceHighlight
  content = content.replace(/bg-white\/5 backdrop-blur-sm border border-white\/10/g, 'bg-bgSurfaceHighlight');
  
  // Reverse 2. bg-[#0a0a0a]/80 backdrop-blur-md -> bg-bgSurface
  content = content.replace(/bg-\[#0a0a0a\]\/80 backdrop-blur-md/g, 'bg-bgSurface');

  // Reverse 3. border-white/10 -> border-borderColor
  content = content.replace(/border-white\/10/g, 'border-borderColor');

  // Reverse 4. shadows
  content = content.replace(/shadow-\[0_0_15px_rgba\(139,92,246,0\.1\)\]/g, 'shadow-sm');
  content = content.replace(/shadow-\[0_0_30px_rgba\(139,92,246,0\.15\)\]/g, 'shadow-lg');
  content = content.replace(/shadow-\[0_0_40px_rgba\(139,92,246,0\.2\)\]/g, 'shadow-xl');

  // Also replace any lingering bg-[#0a0a0a]/80 or bg-white/5 that got added without the exact string match
  content = content.replace(/bg-\[#0a0a0a\]\/80/g, 'bg-bgSurface');
  content = content.replace(/bg-white\/5/g, 'bg-bgSurfaceHighlight');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Reversed ${filePath}`);
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
console.log('Reverse replacement complete.');
