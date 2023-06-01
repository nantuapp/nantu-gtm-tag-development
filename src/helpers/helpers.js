// Description: Helper functions for the A/B testing framework.
// Author: Juan Castro
// Last modified: 2023-05-26
// License: Apache 2.0
// Version: 1.0.0
// Path: helpers.js

// shortName converts a variation long name to a short name.
function shortName(variationLongName) {
	if ( ! variationLongName ) {
		return "u";
	}

	if (variationLongName === "control") {
		return "c";
	} else if (variationLongName === "none") {
		return "n";
	} else if (variationLongName.indexOf("variation") === 0 && variationLongName.length >= 10) {
		const variationNumber = variationLongName.slice(9);
		if (strToInt(variationNumber) > 0 || variationNumber === "0") {
			return "v" + variationNumber;
		} else {
			return "u";
		}
	} else {
		return "u";
	}
}
// longName converts a variation short name to a long name.
function longName(variationShortName) {
	if ( ! variationShortName ) {
		return "unset";
	}

	if (variationShortName === "c") {
		return "control";
	} else if (variationShortName === "n") {
		return "none";
	} else if (variationShortName.indexOf("v") === 0 && variationShortName.length >= 2) {
		const variationNumber = variationShortName.slice(1);
		if (strToInt(variationNumber) > 0) {
			return "variation" + variationNumber;
		} else {
			return "unset";
		}
	} else {
		return "unset";
	}
}

// strToInt converts a string to an integer. If the string is not a number, it returns null.
function strToInt(num)
{
	let total_value = 0;

	if(num)
	{
		for(let char_index = 0; char_index < num.length; char_index++)
		{
			let digit_value = 0;
			let current_letter = num.charAt(char_index);

			if(current_letter === "1")
			{
				digit_value = 1;
			}
			else if (current_letter === "2")
			{
				digit_value = 2;
			}
			else if (current_letter === "3")
			{
				digit_value = 3;
			}
			else if (current_letter === "4")
			{
				digit_value = 4;
			}
			else if (current_letter === "5")
			{
				digit_value = 5;
			}
			else if (current_letter === "6")
			{
				digit_value = 6;
			}
			else if (current_letter === "7")
			{
				digit_value = 7;
			}
			else if (current_letter === "8")
			{
				digit_value = 8;
			}
			else if (current_letter === "9")
			{
				digit_value = 9;
			}
			else if (current_letter !== "0")
			{
				return null;
			}

			total_value += digit_value * Math.pow(10, num.length - char_index - 1);
		}
	}

	return total_value;
}

// parseTestsVariations parses a string of tests variations into an array of objects.
// [123:v1,456:v2,789:v3,345:u,678:n] => [{id: 123, variation: variation}, {id: 456, variation: variation2}, {id: 789, variation: variation3}, {id: 345, variation: unset}, {id: 678, variation: none}]
function parseTestsVariations(testsVariations) {
	// Split the string into an array of key-value pairs.
	const pairs = testsVariations.slice(1, -1).split(',');

	const results = [];

	for (const pair of pairs) {
		const keyValue = pair.split(':');

		const key = strToInt(keyValue[0]);
		const value = longName(keyValue[1]);

		if (key > 0) {
			const result = {
				id: key,
				variation: value
			};
			results.push(result);
		}
	}

	return results;
}
