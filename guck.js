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
    'Infinity': '+(+!![]+(!![]+[])[+!![]+!![]+!![]]+[+!![]]+[+[]]+[+[]]+[+[]])'
}
Object.assign(SIMPLE, fuckedNumbers);
// helper functions
// get SIMPLE's values
// append +[] to them
// find the key with the smallest index where the character occurs
const keyIndexFinder = (c) => Object.fromEntries(Object.keys(SIMPLE).filter((k) => k.includes(c)).map((s) => [s.indexOf(c), s])); // returns empty object if not found
const minIndexFinder = (c) => Object.keys(keyIndexFinder(c)).reduce((a,b) => Math.min(a,b)); 
const keyFinder = (c) => keyIndexFinder(c)[minIndexFinder(c)];
// TODO: break pipeline after the filter to do a separate check for chars in none of the simple words
// the sauce
const mapping = (c) => `(${SIMPLE[keyFinder(c)]}+[])[${fuckedNumbers[minIndexFinder(c)]}]`;

// test mapping function's encoding of numbers
const exampleFileLine = 'ad123';
const mapLn = (str) => str.split('').map((c) => mapping(c)).join('+'); // also the sauce
console.log(mapLn(exampleFileLine), Function(`return ${mapLn(exampleFileLine)}`)());