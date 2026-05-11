const { JSDOM } = require('jsdom');
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html, { runScripts: 'dangerously' });
dom.window.addEventListener('error', e => console.error(e.error));
try {
    dom.window.eval(fs.readFileSync('app2.js', 'utf8'));
} catch(e) {
    console.error('EVAL ERROR:', e);
}
