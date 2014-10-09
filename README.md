Sample from distributions in javascript. Currently supported: 

- Bernoulli
- Binomial
- Discrete
- Multinomial

Syntax: 

var bern = new Bernoulli(.5);
bern.draw(); // Take one sample. 
bern.sample(10); // Get an array of 10 samples. 

var disc = new Discrete([.1, .2, .3, .05, .15]); // the array is an array of probabilities of each index. 

disc.draw(); // sample from the discrete interval [0,4] with the probabilities given above.
disc.sample(10); // draw 10 such samples in an array. 



