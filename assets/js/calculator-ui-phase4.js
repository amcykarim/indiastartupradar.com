(function(){
const form=document.querySelector('[data-phase4-form]');if(!form)return;
const key=form.dataset.phase4Form,box=document.querySelector('[data-result]'),out=document.querySelector('[data-primary-result]'),detail=document.querySelector('[data-result-details]');
const money=new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',minimumFractionDigits:0,maximumFractionDigits:2}),num=new Intl.NumberFormat('en-IN',{maximumFractionDigits:2});
const fmt={
loanEmi:r=>[money.format(r.primary)+'/month','Total '+money.format(r.total)+'; interest '+money.format(r.interest)],
loanRepayment:r=>[num.format(r.primary)+' months','Total '+money.format(r.total)+'; interest '+money.format(r.interest)],
simpleInterest:r=>[money.format(r.primary)+' interest','Maturity amount '+money.format(r.amount)],
compoundInterest:r=>[money.format(r.primary),'Compound interest '+money.format(r.interest)],
futureValue:r=>[money.format(r.primary),'Growth '+money.format(r.growth)],
presentValue:r=>[money.format(r.primary),'Discount from future value '+money.format(r.discount)],
savingsGoal:r=>[money.format(r.primary)+'/month','Remaining future gap '+money.format(r.gap)],
dti:r=>[num.format(r.primary)+'%','Monthly debt as a percentage of gross monthly income.'],
dscr:r=>[num.format(r.primary)+':1','Operating surplus after debt service '+money.format(r.surplus)],
businessGrowth:r=>[num.format(r.primary)+'% total growth',num.format(r.compound)+'% compound growth per period'],
freelancerRate:r=>[money.format(r.primary)+'/billable hour','Annual revenue required '+money.format(r.required)],
hourlyMonthly:r=>[money.format(r.primary)+'/month','Annualised income '+money.format(r.annual)],
projectPricing:r=>[money.format(r.primary),'Base '+money.format(r.base)+'; contingency '+money.format(r.contingencyAmount)],
freelanceProfit:r=>[money.format(r.primary),r.margin===null?'Margin undefined at zero revenue.':num.format(r.margin)+'% profit margin'],
commission:r=>[money.format(r.primary),'Variable commission '+money.format(r.variable)],
leadConversion:r=>[num.format(r.primary)+'%',num.format(r.unconverted)+' leads not converted'],
salesPipeline:r=>[money.format(r.primary)+' weighted pipeline','Unweighted pipeline '+money.format(r.raw)],
marketingBudget:r=>[money.format(r.primary)+'/year',money.format(r.monthly)+'/month'],
adBudget:r=>[money.format(r.primary),'Target conversions multiplied by allowable CPA.'],
bundlePricing:r=>[money.format(r.primary)+' recommended minimum','At entered bundle price: profit '+money.format(r.profit)+', margin '+num.format(r.actualMargin)+'%, discount '+num.format(r.discount)+'%']};
form.addEventListener('submit',e=>{e.preventDefault();const v={};new FormData(form).forEach((x,k)=>v[k]=Number(x));box.hidden=false;try{const r=ISRPhase4[key](v),s=fmt[key](r);out.textContent=s[0];detail.textContent=s[1]}catch(err){out.textContent='Check your inputs';detail.textContent=err.message}box.focus()});
form.addEventListener('reset',()=>{box.hidden=true;out.textContent='';detail.textContent=''})
}());
