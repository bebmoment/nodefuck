const ZERO = '+[]';
const ONE = '+!![]';

const number = (n) => (n === 0) ? ZERO : Array.from({length: n}, () => ONE).join('');

const fuckedNumbers = Object.fromEntries([0,1,2,3,4,5,6,7,8,9].map(n => [n, number(n)])); // binary might be the meta
/*
{
  '0': '+[]',
  '1': '+!![]',
  '2': '+!![]+!![]',
  '3': '+!![]+!![]+!![]',
  '4': '+!![]+!![]+!![]+!![]',
  '5': '+!![]+!![]+!![]+!![]+!![]',
  '6': '+!![]+!![]+!![]+!![]+!![]+!![]',
  '7': '+!![]+!![]+!![]+!![]+!![]+!![]+!![]',
  '8': '+!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]',
  '9': '+!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]'
}
'10': '[+!![]]+[+[]]'
// etc
*/
const SIMPLE = {
    'false': '![]',
    'true': '!![]',
    'undefined': '[][[]]',
    'NaN': '+[![]]',
    'Infinity': '+(+!![]+(!![]+[])[+!![]+!![]+!![]]+[+!![]]+[+[]]+[+[]]+[+[]])',
}
Object.assign(SIMPLE, fuckedNumbers); // might remove

// helper functions
// get SIMPLE's values
// append +[] to them
// find the key with the smallest index where the character occurs
// TODO: get rid of implicit dependence on SIMPLE and pass it or something else as an argument in order to deal with things not in simple
const debugChar = '1';
const keyIndexFinder = (c) => Object.fromEntries(Object.keys(SIMPLE).filter((k) => k.includes(c)).map((s) => [s.indexOf(c), s]))
const indexFinder = (c) => Object.keys(keyIndexFinder(c)); // returns empty [] if not found
const keyFinder = (c) => Object.values(keyIndexFinder(c));
const minIndexFinder = (c) => ((indexFinder(c)).length !== 0) ? indexFinder(c).reduce((a,b) => Math.min(a,b)) : []; 
const minKeyFinder= (c) => keyFinder(c)[indexFinder(c).indexOf(`${minIndexFinder(c)}`)];

// the sauce - FIX SIMPLE PASS FOR NUMBERS
const mapping = (c) => (isNaN(c)) ? `(${SIMPLE[minKeyFinder(c)]}+[])[${fuckedNumbers[minIndexFinder(c)]}]` : `[${fuckedNumbers[c]}]`;
// test mapping function's encoding of numbers
const exampleFileLine = '1111';
const mapLn = (str) => str.split('').map((c) => mapping(c)).join('+'); // also the sauce
console.log(mapLn(exampleFileLine), Function(`return ${mapLn(exampleFileLine)}`)());
// console.log([indexFinder, keyFinder, minIndexFinder, minKeyFinder, mapping].map(f => f(debugChar)));