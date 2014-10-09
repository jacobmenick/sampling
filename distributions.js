// distributions.js
// A few distributions in javascript. 

// UTILITIES

function sumVec(xs) {
    return xs.reduce(function(a, b) {return a+b;});
}

function normalize(vector) {
    var sum = sumVec(vector);
    return vector.map(function(x) {return x/sum;});
}

function rangeFunc(upper) {
    var out = [];
    for (var i = 0; i < upper; i++) {
	out.push(i);
    }
    return out;
}

function fillZeroes(size) {
    var out = [];
    while (size > 0) {
	out.push(0);
	size--;
    }
    return out;
}

// DISTRIBUTIONS

// Returns 1 with probability p and 0 with probability (1-p). 
function Bernoulli(p) {
    var unif = Math.random();
    if (unif < p) return 1;
    return 0;
}

// Samples from the Discrete distribution described by the 'probs' vector.
// The ith entry indicates the probability of receiving i. 
function Discrete(probs) {
    if (sumVec(probs) != 1) probs = normalize(probs);
    var k = probs.length;
    for (var i = 0; i < k; i++) {
	var newProbs = normalize(probs.slice(i));
	var choice = Bernoulli(newProbs[0]);
	if (choice == 1) return i;
    }
    return k-1;
}

function testDiscrete(numTimes, probs,df) {
    var totals = fillZeroes(probs.length);
    while (numTimes > 0) {
	totals[df(probs)]++;
	numTimes--;
    }
    return normalize(totals);
}