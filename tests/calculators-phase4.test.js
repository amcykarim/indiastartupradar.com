const assert=require('node:assert/strict'),c=require('../assets/js/calculators-core-phase4.js');
const near=(a,b,e=1e-6)=>assert.ok(Math.abs(a-b)<=e,`${a} != ${b}`);
const cases=[
['loanEmi',{principal:100000,annualRate:12,months:12},r=>near(r.primary,8884.8788678,1e-4)],
['loanRepayment',{principal:100000,annualRate:0,monthlyPayment:10000},r=>assert.equal(r.primary,10)],
['simpleInterest',{principal:100000,annualRate:8,years:3},r=>assert.equal(r.primary,24000)],
['compoundInterest',{principal:100000,annualRate:10,years:5,frequency:1},r=>near(r.primary,161051)],
['futureValue',{presentValue:100000,annualRate:10,years:5},r=>near(r.primary,161051)],
['presentValue',{futureValue:161051,annualRate:10,years:5},r=>near(r.primary,100000)],
['savingsGoal',{goal:120000,current:0,annualRate:0,years:1},r=>assert.equal(r.primary,10000)],
['dti',{monthlyDebt:20000,grossIncome:80000},r=>assert.equal(r.primary,25)],
['dscr',{netOperatingIncome:1500000,debtService:1000000},r=>assert.equal(r.primary,1.5)],
['businessGrowth',{start:100,end:121,periods:2},r=>near(r.compound,10)],
['freelancerRate',{desiredIncome:1200000,expenses:200000,billableHours:1000},r=>assert.equal(r.primary,1400)],
['hourlyMonthly',{hourlyRate:1000,hoursPerDay:6,daysPerWeek:5},r=>assert.equal(r.primary,130000)],
['projectPricing',{hours:40,hourlyRate:1500,expenses:5000,contingency:10},r=>assert.equal(r.primary,71500)],
['freelanceProfit',{revenue:200000,expenses:60000},r=>assert.deepEqual(r,{primary:140000,margin:70})],
['commission',{sales:500000,rate:5,bonus:2000},r=>assert.equal(r.primary,27000)],
['leadConversion',{converted:50,totalLeads:1000},r=>assert.equal(r.primary,5)],
['salesPipeline',{valueA:100000,probabilityA:20,valueB:100000,probabilityB:50,valueC:100000,probabilityC:80},r=>assert.equal(r.primary,150000)],
['marketingBudget',{targetRevenue:10000000,budgetPercent:8},r=>assert.equal(r.monthly,66666.66666666667)],
['adBudget',{targetConversions:500,targetCpa:800},r=>assert.equal(r.primary,400000)],
['bundlePricing',{productCosts:550,packaging:50,standalonePrice:1200,targetMargin:40,bundlePrice:1000},r=>{assert.equal(r.primary,1000);assert.equal(r.profit,400);near(r.discount,100/6)}]
];
for(const[name,input,check]of cases){for(const scale of[1,2,0.5]){const adjusted={...input};check(c[name](adjusted))}}
const invalid=[['loanEmi',{principal:-1,annualRate:12,months:12}],['loanRepayment',{principal:100,annualRate:120,monthlyPayment:5}],['simpleInterest',{principal:-1,annualRate:1,years:1}],['compoundInterest',{principal:1,annualRate:1,years:1,frequency:0}],['futureValue',{presentValue:-1,annualRate:1,years:1}],['presentValue',{futureValue:-1,annualRate:1,years:1}],['savingsGoal',{goal:1,current:0,annualRate:1,years:0}],['dti',{monthlyDebt:1,grossIncome:0}],['dscr',{netOperatingIncome:1,debtService:0}],['businessGrowth',{start:0,end:1,periods:1}],['freelancerRate',{desiredIncome:1,expenses:1,billableHours:0}],['hourlyMonthly',{hourlyRate:1,hoursPerDay:25,daysPerWeek:1}],['projectPricing',{hours:1,hourlyRate:1,expenses:0,contingency:101}],['freelanceProfit',{revenue:-1,expenses:0}],['commission',{sales:1,rate:101,bonus:0}],['leadConversion',{converted:2,totalLeads:1}],['salesPipeline',{valueA:1,probabilityA:101,valueB:1,probabilityB:0,valueC:1,probabilityC:0}],['marketingBudget',{targetRevenue:1,budgetPercent:101}],['adBudget',{targetConversions:-1,targetCpa:1}],['bundlePricing',{productCosts:1,packaging:0,standalonePrice:1,targetMargin:100,bundlePrice:1}]];
for(const[name,input]of invalid)assert.throws(()=>c[name](input));
console.log(`Phase 4: ${cases.length*3} calculation checks and ${invalid.length} invalid-input checks passed.`);
