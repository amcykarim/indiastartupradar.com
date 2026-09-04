import fs from'node:fs';
const file='index.html',marker='data-phase4-featured';
let html=fs.readFileSync(file,'utf8');
if(!html.includes(marker)){
  const section='<section class="section" data-phase4-featured><div class="container"><div class="heading"><p class="eyebrow">New planning tools</p><h2>Loans, freelance and growth planning</h2></div><div class="grid"><article class="card"><h3>Business Loan EMI Calculator</h3><p>Estimate monthly instalments and total interest.</p><a href="/tools/business-loan-emi-calculator/">Open calculator</a></article><article class="card"><h3>Freelancer Rate Calculator</h3><p>Set an hourly rate from income, expenses and billable time.</p><a href="/tools/freelancer-rate-calculator/">Open calculator</a></article><article class="card"><h3>Sales Pipeline Calculator</h3><p>Estimate probability-weighted pipeline value.</p><a href="/tools/sales-pipeline-calculator/">Open calculator</a></article></div></div></section>';
  html=html.replace('</main>',section+'</main>');
  fs.writeFileSync(file,html);
}
