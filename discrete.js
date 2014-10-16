// discrete.js
// Sample from discrete distributions.

// Distribution OOP. 
// * Uses IIFE pattern
var Sampling = SJS = (function(){

	// Utility functions
	function _sum(a, b) {
		return a + b;
	};
	function _fillArrayWithNumber(size, num) {
		// thanks be to stackOverflow... this is a beautiful one-liner
		return Array.apply(null, Array(size)).map(Number.prototype.valueOf, num);
	};
	// Prototype function
	function _samplerFunction(size) {
		if (!this.draw) { 
			throw new Error ("Distribution must specify a draw function.");
		}
		var result = [];
		while (size--) { 
			result.push(this.draw()); 
		}
		return result;
	};
	// Prototype for discrete distributions
	var _samplerPrototype = {
		sample: _samplerFunction
	};

	function Bernoulli(p) {

		var result = Object.create(_samplerPrototype);

		result.draw = function() {
			return (Math.random() < p) ? 1 : 0;
		};

		result.toString = function() {
			return "Bernoulli( " + p + " )";
		};

		return result;
	}

	function Binomial(n, p) {

		var result = Object.create(_samplerPrototype),
			bern = Sampling.Bernoulli(p);

		result.draw = function() {
			return bern.sample(n).reduce(_sum, 0); // less space efficient than adding a bunch of draws, but cleaner :)
		}

		result.toString = function() { 
			return "Binom( " + 
					[n, p].join(", ") + 
					" )"; 
		}

		return result;
	}

	function Discrete(probs) { // probs should be an array of probabilities. (they get normalized automagically) //
		
		var result = Object.create(_samplerPrototype),
			k = probs.length;

		result.draw = function() {
			var i, p;
			for (i = 0; i < k; i++) {
				p = probs[i] / probs.slice(i).reduce(_sum, 0); // this is the (normalized) head of a slice of probs
				if (Bernoulli(p).draw()) return i;             // using the truthiness of a Bernoulli draw
			}
			return k - 1;
		};

		result.toString = function() {
			return "Dicrete( [" + 
					probs.join(", ") + 
					"] )";
		};

		return result;
	}

	function Multinomial(n, probs) {

		var result = Object.create(_samplerPrototype),
			k = probs.length,
			disc = Discrete(probs);

		result.draw = function() {
			var draw_result = _fillArrayWithNumber(k, 0),
				i = n;
			while (i--) {
				draw_result[disc.draw()] += 1;
			}
			return draw_result;
		};

		result.toString = function() {
			return "Multinom( " + 
					n + 
					", [" + probs.join(", ") + 
					"] )";
		};

		return result;
	}

	return {
		_fillArrayWithNumber: _fillArrayWithNumber, // REMOVE EVENTUALLY - this is just so the Array.prototype mod can work
		Bernoulli: Bernoulli,
		Binomial: Binomial,
		Discrete: Discrete,
		Multinomial: Multinomial
	};
})();

//*** Sampling from arrays ***//
function sample_from_array(array, numSamples, withReplacement) {
	var n = numSamples || 1,
		result = [],
		copy,
		disc,
		index;

		if (!withReplacement && numSamples > array.length) {
			throw new Error("Sampling without replacement, and the sample size exceeds vector size.")
		}

		if (withReplacement) {
			while(numSamples--) {
				disc = SJS.Discrete(SJS._fillArrayWithNumber(array.length, 1));
				result.push(array[disc.draw()]);
			}
		} else {
			// instead of splicing, consider sampling from an array of possible indices? meh?
			copy = array.slice(0);
			while (numSamples--) {
				disc = SJS.Discrete(SJS._fillArrayWithNumber(copy.length, 1));
				index = disc.draw();
				result.push(copy[index]);
				copy.splice(index, 1);
				console.log("array: "+copy);
			}	
		}
		return result;
}
// throw an error if sample is already defined on the array prototype
// if (Array.prototype.hasOwnProperty("sample")) { 
// 	throw new Error("Array prototype already has 'sample' property.");
// }
// Array.prototype.sample = function(howMany, replace) {
// 	var result = [],
// 		counter = 0,
// 		copy,
// 		disc,
// 		index;

// 	// input validation
// 	howMany = howMany || 1;
// 	if (replace === undefined || replace === null) {
// 		replace = 1; // default to sampling with replacement?
// 	}
// 	if (replace !== 1 && howMany > this.length) {
// 		throw "can't sample more elements than the array contains without replacement!";
// 	}

// 	if (replace === 1) {
// 		while (counter < howMany) {
// 			disc = SJS.Discrete(SJS._fillArrayWithNumber(this.length, 1));
// 			result.push(this[disc.draw()]);
// 			counter++;
// 		}
// 	} else {
// 		copy = this.slice(0);
// 		while (counter < howMany) {
// 			disc = SJS.Discrete(SJS._fillArrayWithNumber(copy.length, 1));
// 			index = disc.draw();
// 			result.push(copy[index]);
// 			copy.splice(index, 1);
// 			console.log("array: "+copy);
// 			counter++;
// 		}
// 	}
// 	return result;
// }
