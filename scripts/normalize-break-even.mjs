import fs from'node:fs';const f='tools/break-even-calculator/index.html';let s=fs.readFileSync(f,'utf8');
const replacements=[
['<nav class="main-nav" id="nav" data-main-nav>','<nav class="main-nav" id="nav" data-main-nav aria-label="Main navigation">'],
['<nav class="breadcrumb"><ol>','<nav class="breadcrumb" aria-label="Breadcrumb"><ol>'],
['<span class="prefix">₹</span>','<span class="prefix" aria-hidden="true">₹</span>'],
['<h2>FAQ</h2>','<h2>Frequently asked questions</h2>'],
['<a href="/privacy.html">Privacy</a> · <a href="/disclaimer.html">Disclaimer</a>','<a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a> · <a href="/disclaimer.html">Disclaimer</a>'],
['"isAccessibleForFree":true},{"@type":"FAQPage"','"isAccessibleForFree":true,"description":"Calculate break-even units and revenue from fixed costs, selling price and variable cost per unit."},{"@type":"FAQPage"']
];for(const[a,b]of replacements)s=s.split(a).join(b);fs.writeFileSync(f,s);
