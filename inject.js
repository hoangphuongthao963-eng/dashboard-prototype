const fs = require('fs');
const path = require('path');

const dir = 'd:/Dữ liệu ô d/[4] PM/[Pinnacle] Improve Dashboard/[Pinnacle] Dashboard/pinnacle-prototype';
const indexHtmlPath = path.join(dir, 'index.html');
const snippetPath = path.join(dir, 'mini-dashboard-snippet.html');

let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const snippetHtml = fs.readFileSync(snippetPath, 'utf8');

const target1 = '<div class="grid-stack" id="main-grid">\r\n                                <!-- Widgets dynamically loaded here -->\r\n                            </div>';
const target2 = '<div class="grid-stack" id="main-grid">\n                                <!-- Widgets dynamically loaded here -->\n                            </div>';
const target3 = '<div class="grid-stack" id="main-grid">';

const replacement = `<div id="mini-dashboard-container" style="display:none; width: 100%;">
${snippetHtml}
</div>
<div class="grid-stack" id="main-grid">`;

if(indexHtml.includes(target1)) {
    indexHtml = indexHtml.replace(target1, replacement + '\r\n                                <!-- Widgets dynamically loaded here -->\r\n                            </div>');
    console.log('Replaced target1');
} else if (indexHtml.includes(target2)) {
    indexHtml = indexHtml.replace(target2, replacement + '\n                                <!-- Widgets dynamically loaded here -->\n                            </div>');
    console.log('Replaced target2');
} else if (indexHtml.includes(target3)) {
    indexHtml = indexHtml.replace(target3, replacement);
    console.log('Replaced target3');
} else {
    console.log('Could not find target');
}

fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
