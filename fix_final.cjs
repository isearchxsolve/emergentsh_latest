const fs = require('fs');
const content = fs.readFileSync('D:/emergentsh_latest/frontend/chatpane_backup.tsx', 'utf8');
const fixed = content.replace(/^\uFEFF/, '').replace('\
use
client\;', '\use
client\;\n\nimport React from \react\;');
fs.writeFileSync('D:/emergentsh_latest/frontend/src/components/ChatPane.tsx', fixed);
console.log('Fixed ChatPane.tsx');
