var counter = (arr) => {
    return 'there are ' + arr.length + " elements in this array";
};

var adder = function(a, b) {
    return `the sum of the two numbers is ${a+b}`;
};

var pi = 3.142;
var name = `PALVEET KAUR SALUJA`
module.exports.counter = counter;
module.exports.adder = adder;
module.exports.pi = pi;
module.exports.name = name;