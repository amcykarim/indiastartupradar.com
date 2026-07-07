async function loadJobs(limit){
  const box=document.getElementById('jobsList'); if(!box) return;
  const q=(document.getElementById('q')?.value||'').toLowerCase();
  const city=(document.getElementById('city')?.value||'').toLowerCase();
  const res=await fetch('/data/jobs.json').catch(()=>fetch('data/jobs.json'));
  const jobs=await res.json();
  const filtered=jobs.filter(j=>[j.title,j.company,j.category,j.type,j.mode,j.experience].join(' ').toLowerCase().includes(q)&&(!city||j.city.toLowerCase().includes(city)));
  box.innerHTML=filtered.slice(0,limit||50).map(j=>`<article class="job"><h3>${j.title}</h3><p><b>${j.company}</b></p><div class="job-meta"><span class="tag">${j.city}</span><span class="tag">${j.category}</span><span class="tag">${j.type}</span><span class="tag">${j.mode}</span><span class="tag">${j.experience}</span></div><a class="btn" href="${j.applyUrl}">Apply / Source</a></article>`).join('')||'<p>No jobs found.</p>';
}
document.addEventListener('DOMContentLoaded',()=>loadJobs(50));
