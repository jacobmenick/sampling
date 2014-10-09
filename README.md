Sample from distributions in javascript. Currently supported: 

- Bernoulli
- Binomial
- Discrete
- Multinomial

Syntax: 

```
var bern = new Bernoulli(.5);
// draw a sample
bern.draw();
// draw 10 samples into an array
bern.sample(10); // Get an array of 10 samples. 
```

```
var probabilities = [.1, .2, .3, .05, .15];
var disc = new Discrete(probabilities);
disc.draw(); 
disc.sample(10); 
```



