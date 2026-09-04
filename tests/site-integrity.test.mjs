import fs from'node:fs';import path from'node:path';
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(x=>x.name==='.git'?[]:x.isDirectory()?walk(path.join(d,x.name)):[path.join(d,x.name)]);
const files=walk('.').filter(f=>f.endsWith('.html')),broken=[];
for(const f of files){const s=fs.readFileSync(f,'utf8');for(const m of s.matchAll(/href="([^"#?]+)"/g)){const u=m[1];if(/^(https?:|mailto:)/.test(u))continue;let p=u.startsWith('/')?'.'+u:path.join(path.dirname(f),u);if(p.endsWith('/'))p+='index.html';if(!path.extname(p))p+='.html';if(!fs.existsSync(p))broken.push(f+' -> '+u)}}
const dirs=fs.readdirSync('tools',{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>x.name),idx=fs.readFileSync('tools/index.html','utf8'),site=fs.readFileSync('sitemap.xml','utf8');
const orphan=dirs.filter(s=>!idx.includes('/tools/'+s+'/')),unsited=dirs.filter(s=>!site.includes('/tools/'+s+'/'));
const required=['<h1','Formula and methodology','Worked example','How to use','Frequently asked questions','Related tools','canonical','application/ld+json'];
const badContent=dirs.filter(d=>{const s=fs.readFileSync(path.join('tools',d,'index.html'),'utf8');return!required.every(x=>s.includes(x))});
const duplicated=[...site.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]).filter((x,i,a)=>a.indexOf(x)!==i);
const result={htmlFiles:files.length,tools:dirs.length,brokenLinks:broken.length,orphanTools:orphan,toolsMissingFromSitemap:unsited,sitemapToolUrls:(site.match(/<loc>https:\/\/indiastartupradar.com\/tools\/[^<]+<\/loc>/g)||[]).length,badContentPages:badContent,duplicateSitemapUrls:duplicated};
console.log(JSON.stringify(result,null,2));if(broken.length)console.log(broken.slice(0,30).join('\n'));if(broken.length||orphan.length||unsited.length||badContent.length||duplicated.length||dirs.length!==75)process.exitCode=1;
