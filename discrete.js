// discrete.js
// Sample from discrete distributions.

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

function fillArrayWith(size, thing) {
		var out = [];
		while (size > 0) {
				out.push(thing);
				size--;
		}
		return out;
}

// Sampling from arrays. 

Array.prototype.sample = function(howMany, replace) {
		if (!replace) var replace=1;
		if (!howMany) var howMany=1;
		if (replace == 0 & howMany > this.length) {
				throw "can't sample more elements than the array contains without replacement!";
		}
		if (replace==1) {
				var disc = new Discrete(fillArrayWith(this.length, 1));
				var out = this[disc.draw()];
		} else {
				var copy = this.slice(0);
				var out = [];
				while (howMany > 0) {
						var disc = new Discrete(fillArrayWith(copy.length), 1);
						var index = disc.draw();
						out.push(this[index]);
						this.splice(index, 1);
						howMany--;
				}
				return out;
		}
}

// Distribution OOP. 

function Bernoulli(p) {
		this.p = p
		this.draw = function() {
				if (Math.random() < this.p) return 1;
				return 0;
		}
		this.sample = function(n) {
				var out = [];
				while (n > 0) {
						out.push(this.draw());
						n--;
				}
				return out;
		}
}

function Binomial(n, p) {
		this.n = n;
		this.p = p;
		this.bern = new Bernoulli(p);
		this.draw = function() {
				var total = 0;
				for (var i = 0; i < this.n; i++) {
						total += this.bern.draw();
				}
				return total;
		}
		this.sample = function(N) {
				var out = [];
				while (N > 0) {
						out.push(this.draw());
						N--;
				}
				return out;
		}
}

function Discrete(probs) {
		this.probs = probs;
		this.draw = function() {
				if (sumVec(this.probs) != 1) this.probs = normalize(this.probs);
				var k = this.probs.length;
				for (var i = 0; i < k; i++) {
						var newProbs = normalize(this.probs.slice(i));
						var bern = new Bernoulli(newProbs[0]);
						var choice = bern.draw();
						if (choice == 1) return i;
				}
				return k-1;
		}
		this.sample = function(N) {
				var out = [];
				while (N > 0) {
						out.push(this.draw());
						N--;
				}
				return out;
		}
}

function Multinomial(probs, n) {
		this.probs = probs;
		this.n = n;
		this.k = this.probs.length;
		this.disc = new Discrete(this.probs);
		this.draw = function() {
				var out = fillZeroes(this.k);
				for (var i = 0; i < this.n; i++) {
						var index = this.disc.draw();
						out[index] += 1;
				}
				return out;
		}
		this.sample = function(N) {
				var out = [];
				while (N > 0) {
						out.push(this.draw());
						N--;
				}
				return out;
		}
}
