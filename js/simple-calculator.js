

// does the simple calculator
function runSimple(){

	let sp_average = 10.4259;
	let cash_average = 3.313434;
	let inflation_average = 1.030935;
	let bonds_average = 4.947;

	const current_age = +document.getElementById('currentAge').value.replace(/\,/g,'');
	if ((currentAge) > 100 || currentAge < 1 ){
		alert("Please enter a current age between 1 and 100");
		return;
	}
	const retirement_age = +document.getElementById('retirementAge').value.replace(/\,/g,'');
	if ((retirementAge) > 100 || retirementAge < 1 ){
		alert("Please enter a retirement age between 1 and 100");
		return;
	}
	const stock_market_percentage = +document.getElementById('stockMarketPercentage').value.replace(/\,/g,'').replace(/\%/g,'')/100;
	const bonds_percentage = +document.getElementById('bondsPercentage').value.replace(/\,/g,'').replace(/\%/g,'')/100;
	const cash_percentage = +document.getElementById('cashPercentage').value.replace(/\,/g,'').replace(/\%/g,'')/100;
	const current_savings = +document.getElementById('currentSavings').value.replace(/\,/g,'').replace(/\$/g,'');
	const crash_factor =  document.getElementById('crashFactor').value/100;
	const crash_age = +document.getElementById('crashAge').value;
	const stock_slider = +document.getElementById('stockSlider').value.replace(/\%/g,'')/100;
	const bond_slider = +document.getElementById('bondSlider').value.replace(/\%/g,'')/100;
	const cash_slider = +document.getElementById('cashSlider').value.replace(/\%/g,'')/100;
	const inflation_slider = +document.getElementById('inflationSlider').value.replace(/\%/g,'')/100;	

	let annual_deposits = +document.getElementById('annualDeposits').value.replace(/\,/g,'').replace(/\$/g,'');
	let annual_withdrawals = +document.getElementById('annualWithdrawals').value.replace(/\,/g,'').replace(/\$/g,'');
	let money_total = current_savings;

	const money_total_by_year = [];

	sp_average = sp_average/100 + stock_slider;
	bonds_average = bonds_average/100 + bond_slider;	
	cash_average = cash_average/100 + cash_slider;
	inflation_average = inflation_average + inflation_slider;		
	let yearly_return = (stock_market_percentage * sp_average + bonds_percentage * bonds_average + cash_percentage * cash_average);
	let bankrupt_age = "110+";

	// adds the savings until retirement
	for (let i = current_age; i < retirement_age; i++){

 		annual_withdrawals *= inflation_average;
 		annual_deposits *= inflation_average;
		money_total = money_total * (1 + yearly_return) + annual_deposits;

		// adjusts amount if a stock market crash is selected
		if (i == crash_age){
			let crash_amount = crash_factor * stock_market_percentage * money_total;
			money_total -= crash_amount;
		}
		money_total_by_year.push(money_total);
	}

	// adds the savings until retirement
	for (let i = retirement_age; i <= 110; i++){

		annual_withdrawals *= inflation_average;
		money_total = money_total * (1 + yearly_return) - annual_withdrawals;

		// adjusts amount if a stock market crash is selected
		if (i == crash_age){
			let crash_amount = crash_factor * stock_market_percentage * money_total;
			money_total -= crash_amount;
		}	
		if (money_total <= 0){
			if (bankrupt_age == "110+"){
				bankrupt_age = i;					
			}
			money_total = 0;
		}
		money_total_by_year.push(money_total);	
	}	

	document.getElementById('summary1').textContent = "Retirement savings lasted until age " + bankrupt_age;
	document.getElementById('summary2').textContent = ""; 

	googleChartSimple(current_age, retirement_age, money_total_by_year);
	$('html, body').animate({
        scrollTop: $("#simulationData").offset().top
    }, 80);

}

// draws the line graphs by percentiles
function googleChartSimple(current_age, retirement_age, money_total_by_year){

    google.charts.setOnLoadCallback(drawChart); 

    function drawChart() {
		var data = new google.visualization.DataTable();
		data.addColumn('number', 'Age');  		
		data.addColumn('number', 'Amount by Year');

		// sets the chart data from the results array
		for(i = 0; i <= 100 - current_age; i++){
		  	data.addRows([ [i + current_age, Math.round(money_total_by_year[i]) ] ]); 

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
			      min:current_age
			    },

			},        
			vAxis: {
				format: '$#,###',
			    viewWindowMode:'explicit',
			    viewWindow: {
			      //max:,
			      min:0
			    }
			},
		};

      	var linearChart = new google.visualization.LineChart(document.getElementById('linechart_material'));
       	linearChart.draw(data, linearOptions);
    }
}



