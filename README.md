Sample from distributions in javascript (on the client side). Currently supported: 

- Bernoulli
- Binomial
- Discrete
- Multinomial

```
var bern = new Bernoulli(.5);
bern.draw();
bern.sample(10); // Get an array of 10 samples. 
```
```
var binom = new Binomial(10, 0.5);
binom.draw();
binom.sample(10);
```
```
var probabilities = [.1, .2, .3, .05, .15];
var disc = new Discrete(probabilities);
disc.draw(); 
disc.sample(10); 
```
```
// The probabilities will be normalized for you. 
var probs = [1,1,1,1,1,1,1,1,1,1,1,1,1,1]
var mult = new Multinomial(probs, 5);
mult.draw();
mult.sample(10);
```
```
var array = ["big", "dawg", "in", "hurr"];
array.sample(3,"no"); // Sample 3 elements without replacement. 
```



