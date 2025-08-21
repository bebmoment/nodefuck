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

*/
const SIMPLE = {
    'false': '![]',
    'true': '!![]',
    'undefined': '[][[]]',
    'NaN': '+[![]]',
    'Infinity': '+(+!![]+(!![]+[])[+!![]+!![]+!![]]+[+!![]]+[+[]]+[+[]]+[+[]])'
}
// get SIMPLE's values
// append +[] to them
// find the key with the smallest index where the character occurs
const VALUE = 1;
const keyIndexFinder = (c) => Object.fromEntries(Object.keys(SIMPLE).filter((k) => k.includes(c)).map((s) => [s.indexOf(c), s])); // returns empty object if not found
const minIndexFinder = (c) => Object.keys(keyIndexFinder(c)).reduce((a,b) => Math.min(a,b)); 
const keyFinder = (c) => keyIndexFinder(c)[minIndexFinder(c)];
const mapping = (c) => `(${SIMPLE[keyFinder(c)]}+[])[${fuckedNumbers[minIndexFinder(c)]}]`;

// return a string format where the key is indexed accordingly
// if only there was a better way to do this...
const MAPPING = {
    'a': `(${SIMPLE.false}+[])[${number(1)}]`,
    'd': `(${SIMPLE.undefined}+[])[${number(2)}]`,
    'e': `(${SIMPLE.true}+[])[${number(3)}]`,
    'f': `(${SIMPLE.false}+[])[${number(0)}]`,
    'i': `(${SIMPLE.Infinity}+[])[${number(3)}]`,
    'I': `(${SIMPLE.Infinity}+[])[${number(0)}]`,
    'l': `(${SIMPLE.false}+[])[${number(2)}]`,
    'n': `(${SIMPLE.undefined}+[])[${number(1)}]`,
    'N': `(${SIMPLE.NaN}+[])[${number(0)}]`,
    'r': `(${SIMPLE.true}+[])[${number(1)}]`,
    's':`(${SIMPLE.false}+[])[${number(3)}]`,
    't':`(${SIMPLE.true}+[])[${number(0)}]`,
    'u': `(${SIMPLE.true}+[])[${number(2)}]`,
    'y': `(${SIMPLE.Infinity}+[])[${number("Infinity".length - 1)}]`
}

function test() {
    const MAPPING_VALUES = Object.values(MAPPING).map(element => Function(`return ${element}`)());
    const function_outputs = Object.keys(MAPPING).map((key) => mapping(key)).map(element => Function(`return ${element}`)());
    console.log(`evals from dict: ${MAPPING_VALUES}`);
    console.log(`evals from function: ${function_outputs}`);
    console.log(`dict values that did not match function outputs: ${MAPPING_VALUES.filter((element) => !function_outputs.includes(element))}`);
}

test()