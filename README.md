# sampling

_JavaScript for sampling from a handful of discrete probability distributions_

## Currently Supported

- Bernoulli
- Binomial
- Discrete
- Multinomial
- Poisson
- Negative Binomial

## Examples

```javascript
var bern = Sampling.Bernoulli(.5);
bern.draw();     // One random draw
bern.sample(10); // Get an array of 10 samples. 
```
```javascript
var binom = SJS.Binomial(10, 0.5);  // alternate syntax (Sampling === SJS)
binom.draw();
binom.sample(10);
```
```javascript
var probabilities = [.1, .2, .3, .05, .15];
var disc = SJS.Discrete(probabilities);
disc.draw(); 
disc.sample(10); 
```
```javascript
// The probabilities will be normalized for you. 
var probs = [1,1,1,1,1,1,1,1,1,1,1,1,1,1]
var mult = SJS.Multinomial(5, probs);
mult.draw();
mult.sample(10);
```
```javascript
var myArray = [0,1,2,3,4,5]
// sample five elements with replacement
sample_from_array(myArray, 5, true)
// sample five elements without replacement
sample_from_array(myArray, 5)
```


