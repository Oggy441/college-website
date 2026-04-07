const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) results = results.concat(walk(file));
    else if (file.endsWith('.jsx') || file.endsWith('.js')) results.push(file);
  });
  return results;
}

const files = walk('d:/Website/college-ms/src');
let changed = 0;

files.forEach(file => {
  let text = fs.readFileSync(file, 'utf8');
  let original = text;
  
  text = text.replace(/'#F2EAE0'/g, "'var(--text-primary)'");
  text = text.replace(/"#F2EAE0"/g, "'var(--text-primary)'");
  
  text = text.replace(/'#B8AFA5'/g, "'var(--text-secondary)'");
  text = text.replace(/"#B8AFA5"/g, "'var(--text-secondary)'");
  
  text = text.replace(/'#7a7068'/g, "'var(--text-muted)'");
  text = text.replace(/"#7a7068"/g, "'var(--text-muted)'");
  
  text = text.replace(/'#241e2c'/g, "'var(--bg-card)'");
  text = text.replace(/"#241e2c"/g, "'var(--bg-card)'");
  
  text = text.replace(/'#1a1520'/g, "'var(--bg-app)'");
  text = text.replace(/"#1a1520"/g, "'var(--bg-app)'");
  
  text = text.replace(/rgba\(78,\s*69,\s*96,/g, 'rgba(var(--border-rgb),');
  text = text.replace(/rgba\(26,\s*21,\s*32,/g, 'rgba(var(--bg-app-rgb),');
  
  // Specific gradient string in Login
  text = text.replace(/'linear-gradient\(135deg, #1a1520 0%, #241e2c 50%, #1a1520 100%\)'/g, "'var(--bg-gradient)'");

  if (text !== original) {
    fs.writeFileSync(file, text);
    changed++;
    console.log('Updated: ' + file);
  }
});

console.log('Files changed: ' + changed);
