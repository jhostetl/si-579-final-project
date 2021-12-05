formatDollars = function(number){

	var number = Math.round(number * 100)/100;

	number = number.toString(), 
	dollars = number.split('.')[0], 
	cents = (number.split('.')[1] || '') +'00';
	dollars = dollars.split('').reverse().join('')
		.replace(/(\d{3}(?!$))/g, '$1,')
		.split('').reverse().join('');
    var number = '$' + dollars + '.' + cents.slice(0, 2);
	
	return number;
}


formatDollarsWithoutCents = function(number){

	var number = Math.round(number * 100)/100;

	number = number.toString(), 
	dollars = number.split('.')[0], 
	cents = (number.split('.')[1] || '') +'00';
	dollars = dollars.split('').reverse().join('')
		.replace(/(\d{3}(?!$))/g, '$1,')
		.split('').reverse().join('');
    var number = '$' + dollars;
	
	return number;
}
