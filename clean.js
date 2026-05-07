const fs = require('fs');
const path = require('path');

const dir = 'd:/Dữ liệu ô d/[4] PM/[Pinnacle] Improve Dashboard/[Pinnacle] Dashboard/pinnacle-prototype';
const indexHtmlPath = path.join(dir, 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const startMarker = '<div id="mini-dashboard-container"';
const endMarker = '<div class="grid-stack" id="main-grid">';

const startIndex = indexHtml.indexOf(startMarker);
const endIndex = indexHtml.indexOf(endMarker, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    const before = indexHtml.substring(0, startIndex);
    const after = indexHtml.substring(endIndex);
    fs.writeFileSync(indexHtmlPath, before + after, 'utf8');
    console.log('Successfully removed the mini-dashboard container.');
} else {
    console.log('Could not find markers. startIndex:', startIndex, 'endIndex:', endIndex);
}
