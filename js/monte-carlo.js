
checkIE = function(){

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        var internetExplorer = 0;

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){      
            document.getElementById('modifyReturnsTable').style.display="none";
            internetExplorer = 1;
        }else{
            internetExplorer = 0;
        }
            

   return internetExplorer;

}

calculate = function(){

	// sets variable to see how long it took to run
	var startTime = performance.now();

	if (document.getElementById('expectedTable')){
		document.getElementById('expectedTable').style.display = "none";
	} 
	if (document.getElementById('retireWith')){
		document.getElementById('retireWith').style.display = "none";
	} 


	var internetExplorer = checkIE();

	if (internetExplorer == 1){
		var stockSlider = 0;
		var bondSlider = 0;
		var cashSlider = 0;
		var inflationSlider = 0;			
	}else{
		var stockSlider = +document.getElementById('stockSlider').value.replace(/\%/g,'');
		var bondSlider = +document.getElementById('bondSlider').value.replace(/\%/g,'');
		var cashSlider = +document.getElementById('cashSlider').value.replace(/\%/g,'');
		var inflationSlider = +document.getElementById('inflationSlider').value.replace(/\%/g,'');	
	}
	

	var year1 = 0, year2 = 0;year3 = 0;year4 = 0;year5 = 0;year6 = 0;year7 = 0;year8 = 0;year9 = 0;year10 = 0;year11 = 0;year12 = 0;year13 = 0;year14 = 0;year15 = 0;year16 = 0;year17 = 0;year18 = 0;year19 = 0;year20 = 0;year21 = 0;year22 = 0;year23 = 0;year24 = 0;year25 = 0;year26 = 0;year27 = 0;year28 = 0;year29 = 0;year30 = 0;year35 = 0;year40 = 0;year45 = 0;year50 = 0;year55 = 0;year60 = 0;year70 = 0;year80 = 0;year90 = 0;year100 = 0;year111 = 0;
	var totalYearsArray = [];
	var totalValueArray = [];
	var allTotalValueArray = [];

	var currentAge = +document.getElementById('currentAge').value.replace(/\,/g,'');
	if ((currentAge) > 100 || currentAge < 1 ){
		alert("Please enter a current age between 1 and 100");
		return;
	}

	var retirementAge = +document.getElementById('retirementAge').value.replace(/\,/g,'');
	if ((retirementAge) > 100 || retirementAge < 1 ){
		alert("Please enter a retirement age between 1 and 100");
		return;
	}

	if ((retirementAge) < currentAge ){
		alert("Please enter a retirement age equal to or greater than current age");
		return;
	}	

	var investment = +document.getElementById('investment').value.replace(/\,/g,'').replace(/\$/g,'');
	var annualAdditions = +document.getElementById('annualAdditions').value.replace(/\,/g,'').replace(/\$/g,'');
	var deductions = +document.getElementById('deductions').value.replace(/\,/g,'').replace(/\$/g,'');
	var simulations= 5000;

	if (document.getElementById('mobileVersion').value == "yes"){
		simulations = 1000;
	}

	var stockmarket= +document.getElementById('stockmarket').value.replace(/\,/g,'').replace(/\%/g,'');
	var bonds= +document.getElementById('bonds').value.replace(/\,/g,'').replace(/\%/g,'');
	var cash= +document.getElementById('cash').value.replace(/\,/g,'').replace(/\%/g,'');
		
	if ((stockmarket + bonds + cash) > 100 ){
		alert("Percent in Stocks, Bonds, and Cash must equal 100");
		return;
	}

	if ((stockmarket + bonds + cash) < 100 ){
		cash = 100 - (stockmarket + bonds);
		document.getElementById('cash').value = cash;
	}

	crashFactor = 1 - (document.getElementById('crashFactor').value)/100;
	crashAge = document.getElementById('crashAge').value;

	stockmarket= stockmarket * .01;
	bonds= bonds * .01;
	cash= cash * .01;	

	var RandomSandP;
	var averageTotalYears = 0;
	var maxValue = 0;
	var minValue = 1000000000000000000000000000000000000000000000000000000000000000000000000000000;


	for (a = 0; a < simulations; a++){
		
		var totalYears = 0;
		var totalStockValue = investment * stockmarket;
		var totalBondValue = investment * bonds;
		var totalCashValue = investment * cash;	
		var totalValue = totalCashValue + totalBondValue + totalStockValue;
		var inflationDeductions = deductions;
		var inflationAdditions = annualAdditions;

		while (totalYears < currentAge){
			totalValueArray[totalYears] = 0;
			totalYears += 1;			
		}
		while (totalYears < retirementAge)
		{
			totalValueArray[totalYears-1] = totalValue;
			var RandomSandP = Math.floor(Math.random()*89);
			var RandomBond = Math.floor(Math.random()*87);
			var RandomCash = Math.floor(Math.random()*87);			
			var RandomInflation = Math.floor(Math.random()*101);

			totalStockValue = totalValue * stockmarket;
			totalBondValue = totalValue * bonds;
			totalCashValue = totalValue * cash;	

			totalStockValue = totalStockValue + (totalStockValue * (SandP[RandomSandP]+stockSlider)/100);
			totalBondValue = totalBondValue + (totalBondValue * (bondReturns[RandomBond]+bondSlider)/100);
			totalCashValue = totalCashValue + (totalCashValue * (cashReturns[RandomCash]+cashSlider)/100);
			
			if (crashAge == totalYears && crashFactor != 0){
				totalStockValue *= crashFactor;
			}

			totalValue = totalStockValue + totalCashValue + totalBondValue + inflationAdditions;
			inflationDeductions *= (inflation[RandomInflation] + (inflationSlider/100)) ;
			inflationAdditions *= (inflation[RandomInflation] + (inflationSlider/100)) ;
			totalYears += 1;
		}	
		while (totalValue > 0 && totalYears < 111)
		{
			totalValueArray[totalYears-1] = totalValue;
			var RandomSandP = Math.floor(Math.random()*89);
			var RandomBond = Math.floor(Math.random()*87);
			var RandomCash = Math.floor(Math.random()*87);			
			var RandomInflation = Math.floor(Math.random()*101);

			totalStockValue = totalValue * stockmarket;
			totalBondValue = totalValue * bonds;
			totalCashValue = totalValue * cash;	

			totalStockValue = totalStockValue + (totalStockValue * (SandP[RandomSandP]+stockSlider)/100) - (inflationDeductions * stockmarket);
			totalBondValue = totalBondValue + (totalBondValue * (bondReturns[RandomBond]+bondSlider)/100) - (inflationDeductions * bonds);
			totalCashValue = totalCashValue + (totalCashValue * (cashReturns[RandomCash]+cashSlider)/100) - (inflationDeductions * cash);
			
			if (crashAge == totalYears && crashFactor != 0){
				totalStockValue *= crashFactor;
			}			

			totalValue = totalStockValue + totalCashValue + totalBondValue;
			inflationDeductions *= (inflation[RandomInflation] + (inflationSlider/100)) ;
			totalYears += 1;
			var totalYearsCounter = totalYears;
			if (totalValue < 0){
				while (totalYears < 111){
					totalValueArray[totalYears-1] = 0;
					totalYears+=1
				}
			}
		}

					

		if (totalYearsCounter >= retirementAge + 1){year1+=1;}	if (totalYearsCounter >= retirementAge + 2){year2+=1;}	if (totalYearsCounter >= retirementAge + 3){year3+=1;}	if (totalYearsCounter >= retirementAge + 4){year4+=1;}	if (totalYearsCounter >= retirementAge + 5){year5+=1;}	
		if (totalYearsCounter >= retirementAge + 6){year6+=1;}	if (totalYearsCounter >= retirementAge + 7){year7+=1;}	if (totalYearsCounter >= retirementAge + 8){year8+=1;}	if (totalYearsCounter >= retirementAge + 9){year9+=1;}	if (totalYearsCounter >= retirementAge + 10){year10+=1;}	
		if (totalYearsCounter >= retirementAge + 11){year11+=1;}	if (totalYearsCounter >= retirementAge + 12){year12+=1;}	if (totalYearsCounter >= retirementAge + 13){year13+=1;}	if (totalYearsCounter >= retirementAge + 14){year14+=1;}	if (totalYearsCounter >= retirementAge + 15){year15+=1;}	
		if (totalYearsCounter >= retirementAge + 16){year16+=1;}	if (totalYearsCounter >= retirementAge + 17){year17+=1;}	if (totalYearsCounter >= retirementAge + 18){year18+=1;}	if (totalYearsCounter >= retirementAge + 19){year19+=1;}	if (totalYearsCounter >= retirementAge + 20){year20+=1;}	
		if (totalYearsCounter >= retirementAge + 21){year21+=1;}	if (totalYearsCounter >= retirementAge + 22){year22+=1;}	if (totalYearsCounter >= retirementAge + 23){year23+=1;}	if (totalYearsCounter >= retirementAge + 24){year24+=1;}	if (totalYearsCounter >= retirementAge + 25){year25+=1;}	
		if (totalYearsCounter >= retirementAge + 26){year26+=1;}	if (totalYearsCounter >= retirementAge + 27){year27+=1;}	if (totalYearsCounter >= retirementAge + 28){year28+=1;}	if (totalYearsCounter >= retirementAge + 29){year29+=1;}	if (totalYearsCounter >= retirementAge + 30){year30+=1;}	
		if (totalYearsCounter >= retirementAge + 35){year35+=1;}	if (totalYearsCounter >= retirementAge + 40){year40+=1;}	if (totalYearsCounter >= retirementAge + 45){year45+=1;}	if (totalYearsCounter >= retirementAge + 50){year50+=1;}	if (totalYearsCounter >= retirementAge + 55){year55+=1;}	if (totalYearsCounter >= retirementAge + 60){year60+=1;}if (totalYearsCounter >= retirementAge + 70){year70+=1;}if (totalYearsCounter >= retirementAge + 80){year80+=1;}if (totalYearsCounter >= retirementAge + 90){year90+=1;}if (totalYearsCounter >= retirementAge + 100){year100+=1;}if (totalYearsCounter >= 111){year111+=1;}

		totalYearsArray[a] = totalYearsCounter;
		allTotalValueArray[a] = totalValueArray.slice();
	}		
	


	totalYearsArray.sort((function(a, b){return b-a}));


var frequency = [];
var a = 1;
var frequencyCount = 0;

	for(i = 0; i<simulations; i++){
		if(totalYearsArray[i] == totalYearsArray[i+1]){ 
			a-=1;
			frequencyCount+=1;
			frequency[totalYearsArray[i]-1] = frequencyCount;
		}else{
			frequencyCount = 0;
		}
		a+=1;

	}

	document.getElementById('summary').innerHTML="";
	document.getElementById('summary').style.display="";
	document.getElementById('simulationData').style.display="";
	var useDisplayRunOutAge = totalYearsArray[Math.floor(.4999*simulations)];
	if (useDisplayRunOutAge == 111){useDisplayRunOutAge+="+";};

	var until100 = Math.round(totalYearsArray.indexOf(109)*2)/100 + "%";


	if (until100 == "-0.02%" && useDisplayRunOutAge == "111+"){
			until100 = "100%";
	}
	if (until100 == "-0.02%" && useDisplayRunOutAge <= 110){
			until100 = "0%";
	}


	document.getElementById('summary').innerHTML = "<h4>The simulation was run " + simulations.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " times with a median bankrupt age of " + useDisplayRunOutAge + "</h4><h5 style = 'color:#3366cc'>" + until100 + " of scenarios survived until age 110.</h5><div style = 'margin-top:5px;'>(scroll down for more data, scroll up to recalculate)</div>";

	document.getElementById('percentageSummary').style.display="";
		if (retirementAge < 100){document.getElementById('1label').innerHTML = retirementAge + 1 + ": "; document.getElementById('1year').innerHTML = Math.round(year1/simulations*100) + "%";} else{document.getElementById('1label').innerHTML ="";document.getElementById('1year').innerHTML = "";};
		if (retirementAge + 1 < 110){document.getElementById('2label').innerHTML = retirementAge + 2 + ": "; document.getElementById('2year').innerHTML = Math.round(year2/simulations*100) + "%";} else{document.getElementById('2label').innerHTML ="";document.getElementById('2year').innerHTML = "";};
		if (retirementAge + 2 < 110){document.getElementById('3label').innerHTML = retirementAge + 3 + ": "; document.getElementById('3year').innerHTML = Math.round(year3/simulations*100) + "%";} else{document.getElementById('3label').innerHTML ="";document.getElementById('3year').innerHTML = "";};
		if (retirementAge + 3 < 110){document.getElementById('4label').innerHTML = retirementAge + 4 + ": "; document.getElementById('4year').innerHTML = Math.round(year4/simulations*100) + "%";} else{document.getElementById('4label').innerHTML ="";document.getElementById('4year').innerHTML = "";};
		if (retirementAge + 4 < 110){document.getElementById('5label').innerHTML = retirementAge + 5 + ": "; document.getElementById('5year').innerHTML = Math.round(year5/simulations*100) + "%";} else{document.getElementById('5label').innerHTML ="";document.getElementById('5year').innerHTML = "";};
		if (retirementAge + 5 < 110){document.getElementById('6label').innerHTML = retirementAge + 6 + ": "; document.getElementById('6year').innerHTML = Math.round(year6/simulations*100) + "%";} else{document.getElementById('6label').innerHTML ="";document.getElementById('6year').innerHTML = "";};
		if (retirementAge + 6 < 110){document.getElementById('7label').innerHTML = retirementAge + 7 + ": "; document.getElementById('7year').innerHTML = Math.round(year7/simulations*100) + "%";} else{document.getElementById('7label').innerHTML ="";document.getElementById('7year').innerHTML = "";};
		if (retirementAge + 7 < 110){document.getElementById('8label').innerHTML = retirementAge + 8 + ": "; document.getElementById('8year').innerHTML = Math.round(year8/simulations*100) + "%";} else{document.getElementById('8label').innerHTML ="";document.getElementById('8year').innerHTML = "";};
		if (retirementAge + 8 < 110){document.getElementById('9label').innerHTML = retirementAge + 9 + ": "; document.getElementById('9year').innerHTML = Math.round(year9/simulations*100) + "%";} else{document.getElementById('9label').innerHTML ="";document.getElementById('9year').innerHTML = "";};
		if (retirementAge + 9 < 110){document.getElementById('10label').innerHTML = retirementAge + 10 + ": "; document.getElementById('10year').innerHTML = Math.round(year10/simulations*100) + "%";} else{document.getElementById('10label').innerHTML ="";document.getElementById('10year').innerHTML = "";};
		if (retirementAge + 10 < 110){document.getElementById('11label').innerHTML = retirementAge + 11 + ": "; document.getElementById('11year').innerHTML = Math.round(year11/simulations*100) + "%";} else{document.getElementById('11label').innerHTML ="";document.getElementById('11year').innerHTML = "";};
		if (retirementAge + 11 < 110){document.getElementById('12label').innerHTML = retirementAge + 12 + ": "; document.getElementById('12year').innerHTML = Math.round(year12/simulations*100) + "%";} else{document.getElementById('12label').innerHTML ="";document.getElementById('12year').innerHTML = "";};
		if (retirementAge + 12 < 110){document.getElementById('13label').innerHTML = retirementAge + 13 + ": "; document.getElementById('13year').innerHTML = Math.round(year13/simulations*100) + "%";} else{document.getElementById('13label').innerHTML ="";document.getElementById('13year').innerHTML = "";};
		if (retirementAge + 13 < 110){document.getElementById('14label').innerHTML = retirementAge + 14 + ": "; document.getElementById('14year').innerHTML = Math.round(year14/simulations*100) + "%";} else{document.getElementById('14label').innerHTML ="";document.getElementById('14year').innerHTML = "";};
		if (retirementAge + 14 < 110){document.getElementById('15label').innerHTML = retirementAge + 15 + ": "; document.getElementById('15year').innerHTML = Math.round(year15/simulations*100) + "%";} else{document.getElementById('15label').innerHTML ="";document.getElementById('15year').innerHTML = "";};
		if (retirementAge + 15 < 110){document.getElementById('16label').innerHTML = retirementAge + 16 + ": "; document.getElementById('16year').innerHTML = Math.round(year16/simulations*100) + "%";} else{document.getElementById('16label').innerHTML ="";document.getElementById('16year').innerHTML = "";};
		if (retirementAge + 16 < 110){document.getElementById('17label').innerHTML = retirementAge + 17 + ": "; document.getElementById('17year').innerHTML = Math.round(year17/simulations*100) + "%";} else{document.getElementById('17label').innerHTML ="";document.getElementById('17year').innerHTML = "";};
		if (retirementAge + 17 < 110){document.getElementById('18label').innerHTML = retirementAge + 18 + ": "; document.getElementById('18year').innerHTML = Math.round(year18/simulations*100) + "%";} else{document.getElementById('18label').innerHTML ="";document.getElementById('18year').innerHTML = "";};
		if (retirementAge + 18 < 110){document.getElementById('19label').innerHTML = retirementAge + 19 + ": "; document.getElementById('19year').innerHTML = Math.round(year19/simulations*100) + "%";} else{document.getElementById('19label').innerHTML ="";document.getElementById('19year').innerHTML = "";};
		if (retirementAge + 19 < 110){document.getElementById('20label').innerHTML = retirementAge + 20 + ": "; document.getElementById('20year').innerHTML = Math.round(year20/simulations*100) + "%";} else{document.getElementById('20label').innerHTML ="";document.getElementById('20year').innerHTML = "";};
		if (retirementAge + 20 < 110){document.getElementById('21label').innerHTML = retirementAge + 21 + ": "; document.getElementById('21year').innerHTML = Math.round(year21/simulations*100) + "%";} else{document.getElementById('21label').innerHTML ="";document.getElementById('21year').innerHTML = "";};
		if (retirementAge + 21 < 110){document.getElementById('22label').innerHTML = retirementAge + 22 + ": "; document.getElementById('22year').innerHTML = Math.round(year22/simulations*100) + "%";} else{document.getElementById('22label').innerHTML ="";document.getElementById('22year').innerHTML = "";};
		if (retirementAge + 22 < 110){document.getElementById('23label').innerHTML = retirementAge + 23 + ": "; document.getElementById('23year').innerHTML = Math.round(year23/simulations*100) + "%";} else{document.getElementById('23label').innerHTML ="";document.getElementById('23year').innerHTML = "";};
		if (retirementAge + 23 < 110){document.getElementById('24label').innerHTML = retirementAge + 24 + ": "; document.getElementById('24year').innerHTML = Math.round(year24/simulations*100) + "%";} else{document.getElementById('24label').innerHTML ="";document.getElementById('24year').innerHTML = "";};
		if (retirementAge + 24 < 110){document.getElementById('25label').innerHTML = retirementAge + 25 + ": "; document.getElementById('25year').innerHTML = Math.round(year25/simulations*100) + "%";} else{document.getElementById('25label').innerHTML ="";document.getElementById('25year').innerHTML = "";};
		if (retirementAge + 25 < 110){document.getElementById('26label').innerHTML = retirementAge + 26 + ": "; document.getElementById('26year').innerHTML = Math.round(year26/simulations*100) + "%";} else{document.getElementById('26label').innerHTML ="";document.getElementById('26year').innerHTML = "";};
		if (retirementAge + 26 < 110){document.getElementById('27label').innerHTML = retirementAge + 27 + ": "; document.getElementById('27year').innerHTML = Math.round(year27/simulations*100) + "%";} else{document.getElementById('27label').innerHTML ="";document.getElementById('27year').innerHTML = "";};
		if (retirementAge + 27 < 110){document.getElementById('28label').innerHTML = retirementAge + 28 + ": "; document.getElementById('28year').innerHTML = Math.round(year28/simulations*100) + "%";} else{document.getElementById('28label').innerHTML ="";document.getElementById('28year').innerHTML = "";};
		if (retirementAge + 28 < 110){document.getElementById('29label').innerHTML = retirementAge + 29 + ": "; document.getElementById('29year').innerHTML = Math.round(year29/simulations*100) + "%";} else{document.getElementById('29label').innerHTML ="";document.getElementById('29year').innerHTML = "";};
		if (retirementAge + 29 < 110){document.getElementById('30label').innerHTML = retirementAge + 30 + ": "; document.getElementById('30year').innerHTML = Math.round(year30/simulations*100) + "%";} else{document.getElementById('30label').innerHTML ="";document.getElementById('30year').innerHTML = "";};
		if (retirementAge + 34 < 110){document.getElementById('35label').innerHTML = retirementAge + 35 + ": "; document.getElementById('35year').innerHTML = Math.round(year35/simulations*100) + "%";} else{document.getElementById('35label').innerHTML ="";document.getElementById('35year').innerHTML = "";};
		if (retirementAge + 39 < 110){document.getElementById('40label').innerHTML = retirementAge + 40 + ": "; document.getElementById('40year').innerHTML = Math.round(year40/simulations*100) + "%";} else{document.getElementById('40label').innerHTML ="";document.getElementById('40year').innerHTML = "";};
		if (retirementAge + 44 < 110){document.getElementById('45label').innerHTML = retirementAge + 45 + ": "; document.getElementById('45year').innerHTML = Math.round(year45/simulations*100) + "%";} else{document.getElementById('45label').innerHTML ="";document.getElementById('45year').innerHTML = "";};
		if (retirementAge + 49 < 110){document.getElementById('50label').innerHTML = retirementAge + 50 + ": "; document.getElementById('50year').innerHTML = Math.round(year50/simulations*100) + "%";} else{document.getElementById('50label').innerHTML ="";document.getElementById('50year').innerHTML = "";};
		if (retirementAge + 54 < 110){document.getElementById('55label').innerHTML = retirementAge + 55 + ": "; document.getElementById('55year').innerHTML = Math.round(year55/simulations*100) + "%";} else{document.getElementById('55label').innerHTML ="";document.getElementById('55year').innerHTML = "";};
		if (retirementAge + 59 < 110){document.getElementById('60label').innerHTML = retirementAge + 60 + ": "; document.getElementById('60year').innerHTML = Math.round(year60/simulations*100) + "%";} else{document.getElementById('60label').innerHTML ="";document.getElementById('60year').innerHTML = "";};
		if (retirementAge + 69 < 110){document.getElementById('70label').innerHTML = retirementAge + 70 + ": "; document.getElementById('70year').innerHTML = Math.round(year70/simulations*100) + "%";} else{document.getElementById('70label').innerHTML ="";document.getElementById('70year').innerHTML = "";};
		if (retirementAge + 79 < 110){document.getElementById('80label').innerHTML = retirementAge + 80 + ": "; document.getElementById('80year').innerHTML = Math.round(year80/simulations*100) + "%";} else{document.getElementById('80label').innerHTML ="";document.getElementById('80year').innerHTML = "";};
		if (retirementAge + 89 < 110){document.getElementById('90label').innerHTML = retirementAge + 90 + ": "; document.getElementById('90year').innerHTML = Math.round(year90/simulations*100) + "%";} else{document.getElementById('90label').innerHTML ="";document.getElementById('90year').innerHTML = "";};
		if (retirementAge + 99 < 110){document.getElementById('100label').innerHTML = retirementAge + 100 + "+: "; document.getElementById('100year').innerHTML = Math.round(year100/simulations*100) + "%";} else{document.getElementById('100label').innerHTML ="";document.getElementById('100year').innerHTML = "";};

		var medianAllTotalValueArray = allTotalValueArray;


	var medianValueArray = []; var medianValueArray2 = []; var medianValueArray2a = []; var medianValueArray3 = []; var medianValueArray4 = []; var medianValueArray5 = []; var medianValueArray6 = []; var medianValueArray7 = []; var medianValueArray8 = []; var medianValueArray9 = []; var medianValueArray10 = []; var medianValueArray11 = []; var medianValueArray12 = []; var medianValueArray13 = []; var medianValueArray14 = []; var medianValueArray15 = []; var medianValueArray16 = []; var medianValueArray17 = []; var medianValueArray18 = []; var medianValueArray19 = []; var medianValueArray20 = []; var medianValueArray21 = [];

	for (i = 0; i < 101; i++){
		medianAllTotalValueArray.sort(function(a, b){
		    return ( a[i] < b[i] ? -1 : ( a[i] > b[i]? 1: 0 ) ) 
		})	

		medianValueArray[i] = Math.round(medianAllTotalValueArray[Math.floor(0*simulations)][i]);
		medianValueArray2a[i] = Math.round(medianAllTotalValueArray[Math.floor(.0199*simulations)][i]);		
		medianValueArray2[i] = Math.round(medianAllTotalValueArray[Math.floor(.0499*simulations)][i]);
		medianValueArray3[i] = Math.round(medianAllTotalValueArray[Math.floor(.0999*simulations)][i]);
		medianValueArray4[i] = Math.round(medianAllTotalValueArray[Math.floor(.1499*simulations)][i]);
		medianValueArray5[i] = Math.round(medianAllTotalValueArray[Math.floor(.1999*simulations)][i]);
		medianValueArray6[i] = Math.round(medianAllTotalValueArray[Math.floor(.2499*simulations)][i]);
		medianValueArray7[i] = Math.round(medianAllTotalValueArray[Math.floor(.2999*simulations)][i]);
		medianValueArray8[i] = Math.round(medianAllTotalValueArray[Math.floor(.3499*simulations)][i]);
		medianValueArray9[i] = Math.round(medianAllTotalValueArray[Math.floor(.3999*simulations)][i]);
		medianValueArray10[i] = Math.round(medianAllTotalValueArray[Math.floor(.4499*simulations)][i]);
		medianValueArray11[i] = Math.round(medianAllTotalValueArray[Math.floor(.4999*simulations)][i]);
		medianValueArray12[i] = Math.round(medianAllTotalValueArray[Math.floor(.5499*simulations)][i]);
		medianValueArray12[i] = Math.round(medianAllTotalValueArray[Math.floor(.5499*simulations)][i]);
		medianValueArray12[i] = Math.round(medianAllTotalValueArray[Math.floor(.5499*simulations)][i]);
		medianValueArray13[i] = Math.round(medianAllTotalValueArray[Math.floor(.5999*simulations)][i]);
		medianValueArray14[i] = Math.round(medianAllTotalValueArray[Math.floor(.6499*simulations)][i]);
		medianValueArray15[i] = Math.round(medianAllTotalValueArray[Math.floor(.6999*simulations)][i]);
		medianValueArray16[i] = Math.round(medianAllTotalValueArray[Math.floor(.7499*simulations)][i]);
		medianValueArray17[i] = Math.round(medianAllTotalValueArray[Math.floor(.7999*simulations)][i]);
		medianValueArray18[i] = Math.round(medianAllTotalValueArray[Math.floor(.8499*simulations)][i]);
		medianValueArray19[i] = Math.round(medianAllTotalValueArray[Math.floor(.8999*simulations)][i]);
		medianValueArray20[i] = Math.round(medianAllTotalValueArray[Math.floor(.9499*simulations)][i]);		
		medianValueArray21[i] = Math.round(medianAllTotalValueArray[Math.floor(.9999*simulations)][i]);	
	}

	createPercentileChart(medianAllTotalValueArray, currentAge, retirementAge, simulations,medianValueArray,medianValueArray2a,medianValueArray2,medianValueArray3,medianValueArray4,medianValueArray5,medianValueArray6,medianValueArray7,medianValueArray8,medianValueArray9,medianValueArray10,medianValueArray11,medianValueArray12,medianValueArray13,medianValueArray14,medianValueArray15,medianValueArray16,medianValueArray17,medianValueArray18,medianValueArray19,medianValueArray20,medianValueArray21);

	googleChart(currentAge,retirementAge,medianValueArray, medianValueArray3, medianValueArray5, medianValueArray7, medianValueArray9, medianValueArray11, medianValueArray15, medianValueArray19);

	$('html, body').animate({
        scrollTop: $("#simulationData").offset().top
    }, 800);

    // this sees how long it took
	var endTime = performance.now();
	console.log(`Took ${endTime - startTime} milliseconds to run`)
};

function charts(){
	    google.charts.load('current', {'packages':['corechart', 'line']});
}

function googleChart(currentAge,retirementAge,medianValueArray, medianValueArray3, medianValueArray5, medianValueArray7, medianValueArray9, medianValueArray11, medianValueArray15, medianValueArray19){

	var googleChartData1 = [];
	var googleChartData3 = [];
	var googleChartData5 = [];
	var googleChartData7 = [];
	var googleChartData9 = [];
	var googleChartData11 = [];
	var googleChartData15 = [];
	var googleChartData19 = [];

    for (i = currentAge; i <= 100; i++){
    	googleChartData1[i] = [i,medianValueArray[i]];
    	googleChartData3[i] = [i,medianValueArray3[i]];
    	googleChartData5[i] = [i,medianValueArray5[i]];    	
    	googleChartData7[i] = [i,medianValueArray7[i]];
    	googleChartData9[i] = [i,medianValueArray9[i]];
    	googleChartData11[i] = [i,medianValueArray11[i]];
    	googleChartData15[i] = [i,medianValueArray15[i]];
    	googleChartData19[i] = [i,medianValueArray19[i]];
    }

    google.charts.setOnLoadCallback(drawChart); 

    function drawChart() {

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Age');
      data.addColumn('number', 'Worst Scenario');
      data.addColumn('number', '10th Percentile');
      data.addColumn('number', '20th Percentile');
      data.addColumn('number', '30th Percentile');
      data.addColumn('number', '40th Percentile');     
      data.addColumn('number', 'Median');
      data.addColumn('number', '70th Percentile');
      data.addColumn('number', '90th Percentile');


     for(i = currentAge; i <= 100; i++){
	      data.addRows([
			[i,  googleChartData1[i][1], googleChartData3[i][1], googleChartData5[i][1],  googleChartData7[i][1], googleChartData9[i][1], googleChartData11[i][1], googleChartData15[i][1], googleChartData19[i][1]],
	      ]);     	
     }

      var linearOptions = {
        title: 'Scenarios by Percentile',
	       'height': 500,
	       'chartArea': {'height': '80%',     
	       		backgroundColor: {stroke: '#ddd', strokeWidth: 3
    		}},
        hAxis: {
        	title: 'Age',
            viewWindowMode:'explicit',
            viewWindow: {
              max:100,
              min:currentAge
            },

        },        
        vAxis: {
        	format: '$#,###',
            viewWindowMode:'explicit',
            viewWindow: {
              max: 3* medianValueArray11[retirementAge],
              min:0
            }
        },
      };


      var linearChart = new google.visualization.LineChart(document.getElementById('linechart_material'));
       linearChart.draw(data, linearOptions);
    }
}

createPercentileChart = function(medianAllTotalValueArray, currentAge, retirementAge, simulations,medianValueArray, medianValueArray2a, medianValueArray2,medianValueArray3,medianValueArray4,medianValueArray5,medianValueArray6,medianValueArray7,medianValueArray8,medianValueArray9,medianValueArray10,medianValueArray11,medianValueArray12,medianValueArray13,medianValueArray14,medianValueArray15,medianValueArray16,medianValueArray17,medianValueArray18,medianValueArray19,medianValueArray20,medianValueArray21){

	document.getElementById('percentileChart').innerHTML = "";
	var table=document.getElementById("percentileChart");

		var row=table.insertRow(0);
			table.style.border = "1px solid #ccc";
			var cell=row.insertCell(0);
				cell.innerHTML= "Age";
				cell.style.background = "#1da1f2";
				cell.style.color = "white";
			var cell=row.insertCell(1);
				cell.innerHTML= "Worst Scenario";
				cell.style.background = "#1da1f2";
				cell.style.color = "white";								
			var cell=row.insertCell(2);
				cell.innerHTML= "10th Percentile";
				cell.style.background = "#1da1f2";
				cell.style.color = "white";				
			var cell=row.insertCell(3);
				cell.innerHTML= "25th Percentile";
				cell.style.background = "#1da1f2";
				cell.style.color = "white";				
			var cell=row.insertCell(4);
				cell.innerHTML= "Median Scenario";
				cell.style.background = "#1da1f2";
				cell.style.color = "white";				
			var cell=row.insertCell(5);
				cell.innerHTML= "75th Percentile";
				cell.style.background = "#1da1f2";
				cell.style.color = "white";								
			var cell=row.insertCell(6);
				cell.innerHTML= "90th Percentile";
				cell.style.background = "#1da1f2";
				cell.style.color = "white";				
																	

	for(i=currentAge; i < 101; i++){

		var row=table.insertRow(i-currentAge+1);
			var cell=row.insertCell(0);
				cell.innerHTML= i;
			var cell=row.insertCell(1);
				cell.innerHTML= rounddollarformat(medianValueArray[i-1]);				
			var cell=row.insertCell(2);
				cell.innerHTML= rounddollarformat(medianValueArray3[i-1]);				
			var cell=row.insertCell(3);
				cell.innerHTML= rounddollarformat(medianValueArray6[i-1]);
			var cell=row.insertCell(4);
				cell.innerHTML= rounddollarformat(medianValueArray11[i-1]);
			var cell=row.insertCell(5);
				cell.innerHTML= rounddollarformat(medianValueArray16[i-1]);			
			var cell=row.insertCell(6);
				cell.innerHTML= rounddollarformat(medianValueArray19[i-1]);																			
	}			
}

dollarformat = function(number){
	
	var number = number.toString(), 
    dollars = number.split('.')[0], 
    cents = (number.split('.')[1] || '') +'00';
    dollars = dollars.split('').reverse().join('')
        .replace(/(\d{3}(?!$))/g, '$1,')
        .split('').reverse().join('');
   	number = '$' + dollars + '.' + cents.slice(0, 2);
   	return number;
}

rounddollarformat = function(number){
	
	var number = number.toString(), 
    dollars = number.split('.')[0], 
    cents = (number.split('.')[1] || '') +'00';
    dollars = dollars.split('').reverse().join('')
        .replace(/(\d{3}(?!$))/g, '$1,')
        .split('').reverse().join('');
   	number = '$' + dollars;
   	return number;
}

function inflationSlider(vol) {
	document.querySelector('#inflationSlider').value = vol+"%";
}

function stockSlider(vol) {
	document.querySelector('#stockSlider').value = vol+"%";
}

function bondSlider(vol) {
	document.querySelector('#bondSlider').value = vol+"%";
}

function cashSlider(vol) {
	document.querySelector('#cashSlider').value = vol+"%";
}


function crashFactorSelector(){
	if (document.getElementById('crashFactor').value != 0){
		document.getElementById('crashFactorAge').style.display = "";
		document.getElementById('crashFactorAge2').style.display = "";
	}
	if (document.getElementById('crashFactor').value == 0){
		document.getElementById('crashFactorAge').style.display = "none";
		document.getElementById('crashFactorAge2').style.display = "none";
	}	
}


function percentageStock(){
	var stockmarket= +Math.floor(document.getElementById('stockmarket').value.replace(/\,/g,'').replace(/\%/g,''));
	var bonds= +document.getElementById('bonds').value.replace(/\,/g,'').replace(/\%/g,'');
	var cash= +document.getElementById('cash').value.replace(/\,/g,'').replace(/\%/g,'');

	if (stockmarket	< 0){
		document.getElementById('stockmarket').value = 0;
	}

	if (stockmarket	> 100){
		document.getElementById('stockmarket').value = 100;
	}

	var stockmarket= +Math.floor(document.getElementById('stockmarket').value.replace(/\,/g,'').replace(/\%/g,''));
	var bonds= +document.getElementById('bonds').value.replace(/\,/g,'').replace(/\%/g,'');
	var cash= +document.getElementById('cash').value.replace(/\,/g,'').replace(/\%/g,'');

	if ((stockmarket + bonds + cash) > 100 ){
		while (stockmarket + bonds + cash > 100 && bonds > 0){
				bonds -=1;	
		}
	}

	if ((stockmarket + bonds + cash) > 100 ){
		while (stockmarket + bonds + cash > 100 && cash > 0){
				cash -=1;
		}
	}

	document.getElementById('cash').value = cash;
	document.getElementById('stockmarket').value = stockmarket;
	document.getElementById('bonds').value = bonds;


}

function percentageBond(){
	var stockmarket= +document.getElementById('stockmarket').value.replace(/\,/g,'').replace(/\%/g,'');
	var bonds= +Math.floor(document.getElementById('bonds').value.replace(/\,/g,'').replace(/\%/g,''));
	var cash= +document.getElementById('cash').value.replace(/\,/g,'').replace(/\%/g,'');

	if (bonds < 0){
		document.getElementById('bonds').value = 0;
	}

	if (bonds > 100){
		document.getElementById('bonds').value = 100;
	}	

	var stockmarket= +Math.floor(document.getElementById('stockmarket').value.replace(/\,/g,'').replace(/\%/g,''));
	var bonds= +document.getElementById('bonds').value.replace(/\,/g,'').replace(/\%/g,'');
	var cash= +document.getElementById('cash').value.replace(/\,/g,'').replace(/\%/g,'');

	if ((stockmarket + bonds + cash) > 100 ){
		while (stockmarket + bonds + cash > 100 && cash > 0){
				cash -=1;	
		}
	}

	if ((stockmarket + bonds + cash) > 100 ){
		while (stockmarket + bonds + cash > 100 && stockmarket > 0){
				stockmarket -=1;
		}
	}
		
	cash = 100 - stockmarket - bonds;

	document.getElementById('cash').value = cash;
	document.getElementById('stockmarket').value = stockmarket;
	document.getElementById('bonds').value = bonds;
}

function percentageCash(){
	var stockmarket= +document.getElementById('stockmarket').value.replace(/\,/g,'').replace(/\%/g,'');
	var bonds= +document.getElementById('bonds').value.replace(/\,/g,'').replace(/\%/g,'');
	var cash= +Math.floor(document.getElementById('cash').value.replace(/\,/g,'').replace(/\%/g,''));

	if (cash < 0){
		document.getElementById('cash').value = 0;
	}

	if (cash > 100){
		document.getElementById('cash').value = 100;
	}	

	var stockmarket= +Math.floor(document.getElementById('stockmarket').value.replace(/\,/g,'').replace(/\%/g,''));
	var bonds= +document.getElementById('bonds').value.replace(/\,/g,'').replace(/\%/g,'');
	var cash= +document.getElementById('cash').value.replace(/\,/g,'').replace(/\%/g,'');

	if ((stockmarket + bonds + cash) > 100 ){
		while (stockmarket + bonds + cash > 100 && stockmarket > 0){
				stockmarket -=1;	
		}
	}

	if ((stockmarket + bonds + cash) > 100 ){
		while (stockmarket + bonds + cash > 100 && bonds > 0){
				bonds -=1;	
		}
	}


	document.getElementById('cash').value = cash;
	document.getElementById('stockmarket').value = stockmarket;
	document.getElementById('bonds').value = bonds;



}

google.charts.load('current', {packages: ['corechart', 'bar']});


function drawPieChart() {

	var stockmarket= +document.getElementById('stockmarket').value.replace(/\,/g,'').replace(/\%/g,'');
	var bonds= +document.getElementById('bonds').value.replace(/\,/g,'').replace(/\%/g,'');
	var cash= +document.getElementById('cash').value.replace(/\,/g,'').replace(/\%/g,'');
 
	var data = google.visualization.arrayToDataTable([
		['Portfolio', 'Stocks', 'Bonds', 'Cash'],
		['', stockmarket, bonds, cash],
	]);

	var options = {
		title: 'Portfolio',
		chartArea: {width: '100%'},
		isStacked: true,
		hAxis: {
		  title: '',
		  minValue: 0,
		},
		vAxis: {
		  title: 'Portfolio'
		}
	};
	var chart = new google.visualization.BarChart(document.getElementById('piechart'));
	chart.draw(data, options);
}


