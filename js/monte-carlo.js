 
//array to save scenarios.
let saved_scenarios = [];

if (localStorage.length!==0){
	saved_scenarios.push(JSON.parse(localStorage.getItem("All Saved Results")));
	document.getElementById("saved_results").innerHTML = saved_scenarios.join(", "); 
}
// sets beginning selection to simple
document.getElementsByClassName("btn btn-simple")[0].style.backgroundColor="red";

// does the simulation
function runSimulation(){

	// sets variable to see how long it took to run
	var startTime = performance.now();
	// gets all the user variables
	let successful_simulations = 0;
	const simulations = 5000;
	const results_array = [];
	const current_age = +document.getElementById('currentAge').value.replace(/\,/g,'');
	if ((current_age) > 100 || current_age < 1 ){
		alert("Please enter a current age between 1 and 100");
		return;
	}
	const retirement_age = +document.getElementById('retirementAge').value.replace(/\,/g,'');
	if ((retirement_age) > 100 || retirement_age < 1 ){
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

	//runs inidividual simulations based on the number of simulations selected
	for (let simulation_count = 1; simulation_count <= simulations; simulation_count++){

		let annual_deposits = +document.getElementById('annualDeposits').value.replace(/\,/g,'').replace(/\$/g,'');
		let annual_withdrawals = +document.getElementById('annualWithdrawals').value.replace(/\,/g,'').replace(/\$/g,'');
		let money_total = current_savings;
		let bankrupt_age = 110;
		const money_total_by_year = [];

		// adds the savings until retirement
		for (let i = current_age; i < retirement_age; i++){
			let random_sp_year = sp_historical[Math.floor(Math.random() * sp_historical.length)]/100 + stock_slider;
			let random_bond_year = bonds_historical[Math.floor(Math.random() * bonds_historical.length)]/100 + bond_slider;
			let random_cash_year = cash_historical[Math.floor(Math.random() * cash_historical.length)]/100 + cash_slider;			
			let random_inflation_year = inflation_historical[Math.floor(Math.random() * inflation_historical.length)] + inflation_slider;		

			let yearly_return = (stock_market_percentage * random_sp_year + bonds_percentage * random_bond_year + cash_percentage * random_cash_year);
	 
	 		annual_withdrawals *= random_inflation_year;
	 		annual_deposits *= random_inflation_year;
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
			let random_sp_year = sp_historical[Math.floor(Math.random() * sp_historical.length)]/100;
			let random_bond_year = bonds_historical[Math.floor(Math.random() * bonds_historical.length)]/100;
			let random_cash_year = cash_historical[Math.floor(Math.random() * cash_historical.length)]/100;			
			let random_inflation_year = inflation_historical[Math.floor(Math.random() * inflation_historical.length)];					
			let yearly_return = (stock_market_percentage * random_sp_year + bonds_percentage * random_bond_year + cash_percentage * random_cash_year);

			annual_withdrawals *= random_inflation_year;
			money_total = money_total * (1 + yearly_return) - annual_withdrawals;

			// adjusts amount if a stock market crash is selected
			if (i == crash_age){
				let crash_amount = crash_factor * stock_market_percentage * money_total;
				money_total -= crash_amount;
			}	
			if (money_total <= 0){
				if (bankrupt_age == 110){
					bankrupt_age = i;					
				}
				money_total = 0;
			}
			money_total_by_year.push(money_total);	
		}	
		if (money_total > 0){
			successful_simulations++;
		}
		money_total_by_year.push(bankrupt_age);
		results_array.push(money_total_by_year);	
	}	

	// sorts the results_array by age of failure and then ending amount.
	results_array.sort(function(a, b){
		let length_sort = a[results_array[0].length - 1] - b[results_array[0].length - 1];
		if (length_sort != 0){
			return length_sort
		}
		let ending_value_sort = a[results_array[0].length - 2] - b[results_array[0].length - 2];
		return ending_value_sort
	});

	let median_bankrupt = results_array[simulations/2][results_array[simulations/2].length - 1];
	if (median_bankrupt == 110){
		median_bankrupt += "+";
	}

	document.getElementById('summary1').textContent = "Simulation was run " + simulations + " times with a median bankrupt age of " + median_bankrupt;
	document.getElementById('summary2').textContent = Math.round(successful_simulations/simulations * 10000)/100 + "% of scenarios were successful past age 110";
	document.getElementById('saveButtonDiv').style.visibility = "visible"
	document.getElementById('savedResultsDiv').style.visibility = "visible"

	googleChart(current_age, retirement_age, simulations, results_array);
	$('html, body').animate({
        scrollTop: $("#simulationData").offset().top
    }, 80);

    // this sees how long it took
	var endTime = performance.now();
	console.log(`Took ${endTime - startTime} milliseconds to run`);

	// the start of saving scenarios
	let scenario_detail = {};
	scenario_detail["successful"] = successful_simulations/simulations;
	saved_scenarios.push(scenario_detail["successful"]);

	document.getElementById('saveButton').addEventListener("click", function saveResult (){
		document.getElementById("saved_results").innerHTML = saved_scenarios.join(", "); 
		localStorage.setItem("All Saved Results", JSON.stringify(saved_scenarios))
	});

	document.getElementById('clearButton').addEventListener("click", function clearResults (){
		document.getElementById("saved_results").innerHTML = "(none saved)"; 
		localStorage.clear();
		saved_scenarios = [];
	});
}

// draws the line graphs by percentiles
function googleChart(current_age, retirement_age, simulations, results_array){

    google.charts.setOnLoadCallback(drawChart); 

    function drawChart() {
		var data = new google.visualization.DataTable();
		data.addColumn('number', 'Age');  		
		data.addColumn('number', '10th Percentile');
		data.addColumn('number', '25th Percentile');
		data.addColumn('number', 'Median');
		data.addColumn('number', '75th Percentile');
		data.addColumn('number', '90th Percentile');

		// sets the chart data from the results array
		for(i = 0; i <= 100 - current_age; i++){
		  	data.addRows([ [i + current_age, Math.round(results_array[simulations*.1][i]), Math.round(results_array[simulations*.25][i]), Math.round(results_array[simulations*.5][i]), Math.round(results_array[simulations*.75][i]), Math.round(results_array[simulations*.9][i]) ] ]); 
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

function simpleSelect() {
	console.log("simple selected");
	document.getElementsByClassName("btn btn-simple")[0].style.backgroundColor="red";
	document.getElementsByClassName("btn btn-simple")[0].style.color="white";
	document.getElementsByClassName("btn btn-advanced")[0].style.backgroundColor="lightgray";
	document.getElementsByClassName("btn btn-advanced")[0].style.color="black";
}

function advancedSelect() {
	console.log("advanced selected");
	document.getElementsByClassName("btn btn-simple")[0].style.backgroundColor="lightgray";
	document.getElementsByClassName("btn btn-simple")[0].style.color="black";
	document.getElementsByClassName("btn btn-advanced")[0].style.backgroundColor="red";
	document.getElementsByClassName("btn btn-advanced")[0].style.color="white";
}

function simpleAdvanced() {
	if (document.getElementsByClassName("btn btn-simple")[0].style.backgroundColor=="red"){
		runSimple();
		document.getElementById('saveButtonDiv').style.visibility = "hidden"
		document.getElementById('savedResultsDiv').style.visibility = "hidden"
	}
	else{
		runSimulation();
	}
}



