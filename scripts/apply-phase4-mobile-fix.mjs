import fs from'node:fs';import path from'node:path';
const old='<link rel="stylesheet" href="/assets/css/site.css">',add=old+'<link rel="stylesheet" href="/assets/css/phase4.css">';
for(const d of fs.readdirSync('tools',{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>x.name)){const f=path.join('tools',d,'index.html'),s=fs.readFileSync(f,'utf8');if(s.includes('data-phase4-form')&&!s.includes('/assets/css/phase4.css'))fs.writeFileSync(f,s.replace(old,add))}
const generator='scripts/generate-tools-phase4.mjs',source=fs.readFileSync(generator,'utf8');if(!source.includes('/assets/css/phase4.css'))fs.writeFileSync(generator,source.replace(old,add));
