(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ISRCalculators=api})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const finite=(...v)=>v.every(Number.isFinite);const positive=(v,n)=>{if(!finite(...v)||v.some(x=>x<=0))throw new Error(n||'Enter values greater than zero.')};const nonnegative=(v,n)=>{if(!finite(...v)||v.some(x=>x<0))throw new Error(n||'Enter valid non-negative values.')};
  return {
    breakEven({fixed,price,variable}){nonnegative([fixed,variable]);positive([price],'Selling price must be greater than zero.');if(price<=variable)throw new Error('Selling price must exceed variable cost.');const contribution=price-variable,units=Math.ceil(fixed/contribution);return{primary:units,revenue:units*price,contribution}},
    profitMargin({revenue,cost}){positive([revenue],'Revenue must be greater than zero.');nonnegative([cost]);return{primary:(revenue-cost)/revenue*100,profit:revenue-cost}},
    markup({cost,price}){positive([cost],'Cost must be greater than zero.');nonnegative([price]);return{primary:(price-cost)/cost*100,profit:price-cost}},
    roi({gain,cost}){positive([cost],'Investment cost must be greater than zero.');nonnegative([gain]);return{primary:(gain-cost)/cost*100,net:gain-cost}},
    revenueGrowth({previous,current}){positive([previous],'Previous revenue must be greater than zero.');nonnegative([current]);return{primary:(current-previous)/previous*100,change:current-previous}},
    runway({cash,burn}){nonnegative([cash]);positive([burn],'Monthly net burn must be greater than zero.');return{primary:cash/burn}},
    burnRate({opening,closing,expenses,months}){nonnegative([opening,closing,expenses]);positive([months],'Period must be greater than zero.');return{primary:expenses/months,net:(opening-closing)/months}},
    valuation({revenue,multiple,cash,debt}){nonnegative([revenue,cash,debt]);positive([multiple],'Revenue multiple must be greater than zero.');const enterprise=revenue*multiple;return{primary:enterprise+cash-debt,enterprise}},
    dilution({preMoney,investment}){nonnegative([preMoney]);positive([investment],'Investment must be greater than zero.');const post=preMoney+investment;return{primary:investment/post*100,retained:preMoney/post*100,post}},
    founderSplit(v){const w=[.25,.25,.2,.2,.1],a=[v.aContribution,v.aCommitment,v.aCapital,v.aRole,v.aIp],b=[v.bContribution,v.bCommitment,v.bCapital,v.bRole,v.bIp];positive([...a,...b],'All factor scores must be between 1 and 10.');if([...a,...b].some(x=>x>10))throw new Error('All factor scores must be between 1 and 10.');const sa=a.reduce((s,x,i)=>s+x*w[i],0),sb=b.reduce((s,x,i)=>s+x*w[i],0),ap=Math.round(sa/(sa+sb)*10000)/100;return{primary:ap,founderB:Math.round((100-ap)*100)/100,scoreA:sa,scoreB:sb}},
    cac({spend,customers}){nonnegative([spend]);positive([customers],'New customers must be greater than zero.');return{primary:spend/customers}},
    ltv({arpu,margin,churn}){nonnegative([arpu]);positive([margin,churn],'Gross margin and churn must be greater than zero.');if(margin>100||churn>100)throw new Error('Percentages cannot exceed 100%.');return{primary:arpu*(margin/100)/(churn/100),lifetime:1/(churn/100)}},
    ltvCac({ltv,cac}){nonnegative([ltv]);positive([cac],'CAC must be greater than zero.');return{primary:ltv/cac}},
    roas({revenue,cost}){nonnegative([revenue]);positive([cost],'Advertising cost must be greater than zero.');return{primary:revenue/cost,percent:revenue/cost*100}},
    cagr({begin,end,years}){positive([begin,years],'Beginning value and years must be greater than zero.');nonnegative([end]);return{primary:(Math.pow(end/begin,1/years)-1)*100}}
  }
});
