var assert = require('chai').assert;
var discrete = require('./discrete.js');

// Bernoulli Draw
var bern = new discrete.Bernoulli(0.5);
var draw = bern.draw();
assert(draw === 0 || draw === 1,
       'Bernoulli does not draw correctly.');

// Samples are correct length
var sample = bern.sample(20);
assert(sample.length === 20,
       'Sample is not the correct length.');

// Binomial draw
var binom = new discrete.Binomial(10, 0.5);
draw = binom.draw();
assert(draw >= 0 && draw <= 10,
       'Binomial gives impossible value from draw.');

// Discrete handles prob 0
var disc = new discrete.Discrete([0, 0, 1, 0]);
assert(disc.draw() == 2,
       "Discrete does not give correctly draw, or may not handle zero" +
       " or handle zero probability well.");

// Discrete draw
disc = new discrete.Discrete([4, 4, 10]);
draw = disc.draw();
assert(draw < 3 && draw >= 0,
       "Discrete gives an impossible value for draw");

// Discrete sampling without replacement
assert(disc.sampleNoReplace(3).length,
       3,
       'Discrete\'s sampling without replacement gives a sample of the' +
       ' wrong size');

// Multinomial Draw
var multinom = new discrete.Multinomial(3, [2, 3, 2]);
assert.equal(multinom.draw().reduce(function(a,b) { return a + b}, 0),
       3,
       "Multinomial draw gives wrong total of counts.");
assert(multinom.draw().length === 3,
       "Multinomial draw gives output of incorrect length.");

// Negative Binomial Draw
var negbinom = new discrete.NegBinomial(4, 0.5);
assert(negbinom.draw() >= 0,
       "Negative binomial draw is giving negative output.");

// Poisson Draw
var poisson = new discrete.Poisson(3);
assert(poisson.draw() >= 0,
       "Poisson draw is giving a negative output.");

// Sample from array
var a = ['will', 'jones', 'is', 'cool'];

sample = discrete.sample_from_array(a, 4, false);

assert.sameMembers(a, sample,
		   'Sample from array loses some members from original array');

sample = discrete.sample_from_array(a, 12, true);

assert(sample.length === 12,
       'Sample from array gives array of incorrect length.');

console.log("Looks good!");
