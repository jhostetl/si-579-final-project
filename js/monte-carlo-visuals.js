// shows stock market crash age if selected. hides age if not selected
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

// updates the slider values as user slides
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


// updates the allocations when user changes percentage in stocks
function percentageStocks(){
	let stock_market_percentage = +document.getElementById('stockMarketPercentage').value.replace(/\,/g,'').replace(/\%/g,'');
	let bonds_percentage = +document.getElementById('bondsPercentage').value.replace(/\,/g,'').replace(/\%/g,'');
	let cash_percentage = +document.getElementById('cashPercentage').value.replace(/\,/g,'').replace(/\%/g,'');

	if (stock_market_percentage < 0){
		document.getElementById('stockMarketPercentage').value = 0;
		stock_market_percentage = 0;
	}

	if (stock_market_percentage > 100){
		document.getElementById('stockMarketPercentage').value = 100;
		stock_market_percentage = 100;
	}

	if ((stock_market_percentage + bonds_percentage + cash_percentage) > 100 ){
		while (stock_market_percentage + bonds_percentage + cash_percentage > 100 && bonds_percentage > 0){
				bonds_percentage -=1;	
		}
	}

	if ((stock_market_percentage + bonds_percentage + cash_percentage) > 100 ){
		while (stock_market_percentage + bonds_percentage + cash_percentage > 100 && cash_percentage > 0){
				cash_percentage -=1;
		}
	}

	document.getElementById('cashPercentage').value = cash_percentage;
	document.getElementById('stockMarketPercentage').value = stock_market_percentage;
	document.getElementById('bondsPercentage').value = bonds_percentage;
}

// updates the allocations when user changes percentage in bonds
function percentageBonds(){
	let stock_market_percentage = +document.getElementById('stockMarketPercentage').value.replace(/\,/g,'').replace(/\%/g,'');
	let bonds_percentage = +document.getElementById('bondsPercentage').value.replace(/\,/g,'').replace(/\%/g,'');
	let cash_percentage = +document.getElementById('cashPercentage').value.replace(/\,/g,'').replace(/\%/g,'');

	if (bonds_percentage < 0){
		document.getElementById('bondsPercentage').value = 0;
	}

	if (bonds_percentage > 100){
		document.getElementById('bondsPercentage').value = 100;
	}	

	if ((stock_market_percentage + bonds_percentage + cash_percentage) > 100 ){
		while (stock_market_percentage + bonds_percentage + cash_percentage > 100 && cash_percentage > 0){
				cash_percentage -=1;	
		}
	}

	if ((stock_market_percentage + bonds_percentage + cash_percentage) > 100 ){
		while (stock_market_percentage + bonds_percentage + cash_percentage > 100 && stock_market_percentage > 0){
				stock_market_percentage -=1;
		}
	}		

	cash_percentage = 100 - stock_market_percentage - bonds_percentage;

	document.getElementById('cashPercentage').value = cash_percentage;
	document.getElementById('stockMarketPercentage').value = stock_market_percentage;
	document.getElementById('bondsPercentage').value = bonds_percentage;
}

// updates the allocations when user changes percentage in cash
function percentageCash(){
	let stock_market_percentage = +document.getElementById('stockMarketPercentage').value.replace(/\,/g,'').replace(/\%/g,'');
	let bonds_percentage = +document.getElementById('bondsPercentage').value.replace(/\,/g,'').replace(/\%/g,'');
	let cash_percentage = +document.getElementById('cashPercentage').value.replace(/\,/g,'').replace(/\%/g,'');

	if (cash_percentage < 0){
		document.getElementById('cashPercentage').value = 0;
	}

	if (cash_percentage > 100){
		document.getElementById('cashPercentage').value = 100;
	}	

	if ((stock_market_percentage + bonds_percentage + cash_percentage) > 100 ){
		while (stock_market_percentage + bonds_percentage + cash_percentage > 100 && stock_market_percentage > 0){
				stock_market_percentage -=1;	
		}
	}

	if ((stock_market_percentage + bonds_percentage + cash_percentage) > 100 ){
		while (stock_market_percentage + bonds_percentage + cash_percentage > 100 && bonds_percentage > 0){
				bonds_percentage -=1;	
		}
	}

	if ((stock_market_percentage + bonds_percentage + cash_percentage) < 100 ){
		while (stock_market_percentage + bonds_percentage + cash_percentage < 100 && bonds_percentage < 100){
				bonds_percentage +=1;	
		}
	}

	document.getElementById('cashPercentage').value = cash_percentage;
	document.getElementById('stockMarketPercentage').value = stock_market_percentage;
	document.getElementById('bondsPercentage').value = bonds_percentage;
}


// draws line color graphic for portfolio allocation
google.charts.load('current', {packages: ['corechart', 'bar']});
function drawBarGraphic(){

	let stockmarket= +document.getElementById('stockMarketPercentage').value.replace(/\,/g,'').replace(/\%/g,'');
	let bonds= +document.getElementById('bondsPercentage').value.replace(/\,/g,'').replace(/\%/g,'');
	let cash= +document.getElementById('cashPercentage').value.replace(/\,/g,'').replace(/\%/g,'');
 
	let data = google.visualization.arrayToDataTable([
		['Portfolio', 'Stocks', 'Bonds', 'Cash'],
		['', stockmarket, bonds, cash],
	]);

	let options = {
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
	let chart = new google.visualization.BarChart(document.getElementById('barGraphic'));
	chart.draw(data, options);
}

// shows info when user hovers over question mark
$(document).ready(function(){
    $('[data-toggle="popover"]').popover(); 
    
});


