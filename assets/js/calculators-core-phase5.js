(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ISRPhase5=api})(typeof globalThis!=='undefined'?globalThis:this,function(){
const finite=a=>a.every(Number.isFinite),nn=(a,m='Enter valid non-negative values.')=>{if(!finite(a)||a.some(x=>x<0))throw Error(m)},pos=(a,m='Enter values greater than zero.')=>{if(!finite(a)||a.some(x=>x<=0))throw Error(m)},pct=(n,d,m)=>{nn([n]);pos([d]);if(n>d)throw Error(m||'The numerator cannot exceed the total.');return n/d*100};
return{
startupCost:v=>{const a=[v.registration,v.equipment,v.inventory,v.marketing,v.deposit,v.operatingReserve,v.other];nn(a);return{primary:a.reduce((x,y)=>x+y,0),oneTime:v.registration+v.equipment+v.inventory+v.marketing+v.deposit+v.other,reserve:v.operatingReserve}},
currentRatio:({currentAssets,currentLiabilities})=>{nn([currentAssets]);pos([currentLiabilities]);return{primary:currentAssets/currentLiabilities,net:currentAssets-currentLiabilities}},
cashConversionCycle:({dio,dso,dpo})=>{nn([dio,dso,dpo]);return{primary:dio+dso-dpo}},
operatingExpenseRatio:({operatingExpenses,revenue})=>({primary:pct(operatingExpenses,revenue)}),
variableCostRatio:({variableCosts,revenue})=>({primary:pct(variableCosts,revenue)}),
marginOfSafety:({sales,breakEvenSales})=>{nn([sales,breakEvenSales]);const amount=sales-breakEvenSales;return{primary:amount,percent:sales===0?null:amount/sales*100}},
operatingLeverage:({contributionMargin,operatingProfit})=>{nn([contributionMargin]);if(!Number.isFinite(operatingProfit)||operatingProfit<=0)throw Error('Operating profit must be greater than zero for a meaningful operating-leverage ratio.');return{primary:contributionMargin/operatingProfit}},
revenueForecast:({currentRevenue,growthRate,periods})=>{nn([currentRevenue,periods]);if(!Number.isFinite(growthRate)||growthRate<=-100)throw Error('Growth rate must be greater than -100%.');const value=currentRevenue*Math.pow(1+growthRate/100,periods);return{primary:value,change:value-currentRevenue}},
profitGrowth:({previousProfit,currentProfit})=>{if(!finite([previousProfit,currentProfit]))throw Error('Enter valid profit values.');if(previousProfit<=0)throw Error('Percentage growth is not meaningful when previous profit is zero or negative. Compare the profit amounts directly.');return{primary:(currentProfit-previousProfit)/previousProfit*100,change:currentProfit-previousProfit}},
expenseGrowth:({previousExpense,currentExpense})=>{pos([previousExpense]);nn([currentExpense]);return{primary:(currentExpense-previousExpense)/previousExpense*100,change:currentExpense-previousExpense}},
gmv:({units,averageSellingPrice})=>{nn([units,averageSellingPrice]);return{primary:units*averageSellingPrice}},
sellThrough:({unitsSold,unitsAvailable})=>({primary:pct(unitsSold,unitsAvailable,'Units sold cannot exceed units available.')}),
repeatPurchase:({repeatCustomers,totalCustomers})=>({primary:pct(repeatCustomers,totalCustomers,'Repeat customers cannot exceed total customers.')}),
returnRate:({returned,total})=>({primary:pct(returned,total,'Returned units or orders cannot exceed the total.')}),
reorderPoint:({dailyDemand,leadTimeDays,safetyStock})=>{nn([dailyDemand,leadTimeDays,safetyStock]);return{primary:dailyDemand*leadTimeDays+safetyStock,leadTimeDemand:dailyDemand*leadTimeDays}},
leadVelocity:({previousLeads,currentLeads})=>{pos([previousLeads]);nn([currentLeads]);return{primary:(currentLeads-previousLeads)/previousLeads*100,change:currentLeads-previousLeads}},
paybackPeriod:({cac,monthlyRevenuePerCustomer,grossMargin})=>{nn([cac,monthlyRevenuePerCustomer,grossMargin]);if(grossMargin>100)throw Error('Gross margin cannot exceed 100%.');const gp=monthlyRevenuePerCustomer*grossMargin/100;pos([gp],'Monthly gross profit per customer must be greater than zero.');return{primary:cac/gp,grossProfit:gp}},
marketingEfficiency:({totalRevenue,marketingSpend})=>{nn([totalRevenue]);pos([marketingSpend]);return{primary:totalRevenue/marketingSpend}},
marketingRoi:({marketingReturn,marketingCost})=>{nn([marketingReturn]);pos([marketingCost]);return{primary:(marketingReturn-marketingCost)/marketingCost*100,net:marketingReturn-marketingCost}},
emailConversion:({conversions,deliveredEmails})=>({primary:pct(conversions,deliveredEmails,'Conversions cannot exceed delivered emails.')}),
billableHours:({workingDays,hoursPerDay,nonBillablePercent})=>{nn([workingDays,hoursPerDay,nonBillablePercent]);if(workingDays>366||hoursPerDay>24||nonBillablePercent>100)throw Error('Use at most 366 days, 24 hours per day and 100% non-billable time.');const available=workingDays*hoursPerDay;return{primary:available*(1-nonBillablePercent/100),available}},
capacityUtilization:({productiveOutput,availableCapacity})=>({primary:pct(productiveOutput,availableCapacity,'Productive output cannot exceed available capacity.')}),
employeeCost:({salary,benefits,employerExpenses,otherCosts})=>{nn([salary,benefits,employerExpenses,otherCosts]);return{primary:salary+benefits+employerExpenses+otherCosts,extras:benefits+employerExpenses+otherCosts}},
salaryHourly:({annualSalary,workingDays,hoursPerDay})=>{nn([annualSalary]);pos([workingDays,hoursPerDay]);if(workingDays>366||hoursPerDay>24)throw Error('Use at most 366 working days and 24 hours per day.');return{primary:annualSalary/(workingDays*hoursPerDay),hours:workingDays*hoursPerDay}},
overheadRate:({overheadCosts,directLabourCost})=>{nn([overheadCosts]);pos([directLabourCost]);return{primary:overheadCosts/directLabourCost*100}}
}});
