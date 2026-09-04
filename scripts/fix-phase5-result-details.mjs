import fs from'node:fs';
const file='assets/js/calculator-ui-phase5.js';let s=fs.readFileSync(file,'utf8');
const from="const fmt=(r)=>{if(money.includes(k))return[m.format(r.primary),r.change!==undefined?'Change '+m.format(r.change):r.oneTime!==undefined?'One-time costs '+m.format(r.oneTime)+'; reserve '+m.format(r.reserve):''];";
const to="const fmt=(r)=>{if(k==='marginOfSafety')return[m.format(r.primary),r.percent===null?'Percentage is undefined when sales are zero.':n.format(r.percent)+'% of sales'];if(k==='employeeCost')return[m.format(r.primary),'Benefits and other employer-paid costs '+m.format(r.extras)];if(money.includes(k))return[m.format(r.primary),r.change!==undefined?'Change '+m.format(r.change):r.oneTime!==undefined?'One-time costs '+m.format(r.oneTime)+'; reserve '+m.format(r.reserve):''];";
if(!s.includes(from))throw Error('Phase 5 formatter target not found');fs.writeFileSync(file,s.replace(from,to));
