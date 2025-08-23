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
const inSimple = (c) => Object.keys(SIMPLE).filter((k) => k.includes(c));
const keyIndexFinder = (c) => Object.fromEntries(Object.keys(SIMPLE).filter((k) => k.includes(c)).map((s) => [s.indexOf(c), s]));
const indexFinder = (c) => Object.keys(keyIndexFinder(c)); // returns empty [] if not found
const keyFinder = (c) => Object.values(keyIndexFinder(c));
const minIndexFinder = (c) => ((indexFinder(c)).length !== 0) ? indexFinder(c).reduce((a,b) => Math.min(a,b)) : []; 
const minKeyFinder= (c) => keyFinder(c)[indexFinder(c).indexOf(`${minIndexFinder(c)}`)] ?? [];

// simple mapping
const mapping = (c) => (isNaN(c)) ? `(${SIMPLE[minKeyFinder(c)]}+[])[${fuckedNumbers[minIndexFinder(c)]}]` : `[${SIMPLE[c]}]`;

const balls = (c) => (!isNaN(c)) ? mapping(c) : (c in SIMPLE) ? SIMPLE[c] : Object.assign(SIMPLE, Object.fromEntries([[c, mapping(c)]]))[c]; // BIG SAUCE: map but with a check - improve for numbers please
const mapLn = (str) => str.split('').map((c) => balls(c)).join('+'); // also the sauce
const set = new Set(Object.keys(SIMPLE).join(''))
// console.log([...set].map(element => balls(element)), SIMPLE);
// if i got rid of the helper functions' implicit dependence on SIMPLE, these could be less repetitive, because the helper functions are really just string searchers
// search the word function
Object.assign(SIMPLE, {'c': `([][${mapLn('at')}]+[])[${balls(3)}]`});
// search '[object Array Iterator]'
Object.assign(SIMPLE, {'A': `([][${mapLn('entries')}]()+[])[${balls(8)}]`}); // might improve by changing to array constructor access
Object.assign(SIMPLE, {'[': `([][${mapLn('entries')}]()+[])[${balls(0)}]`});
Object.assign(SIMPLE, {']': `([][${mapLn('entries')}]()+[])[${mapLn((([]['entries']()+[]).length - 1).toString())}]`});
Object.assign(SIMPLE, {'o': `([][${mapLn('entries')}]()+[])[${balls(1)}]`});
// search 'function Boolean()', 'function Number()', 'function Function()', 'function String()'
Object.assign(SIMPLE, {'B': `((![])[${mapLn('constructor')}]+[])[${balls(9)}]`});
Object.assign(SIMPLE, {'b': `((+[])[${mapLn('constructor')}]+[])[${mapLn('12')}]`});
Object.assign(SIMPLE, {'m': `((+[])[${mapLn('constructor')}]+[])[${mapLn('11')}]`});
Object.assign(SIMPLE, {'F': `([][${mapLn('at')}][${mapLn('constructor')}]+[])[${balls(9)}]`}); // ([]['at']['constructor']+[])[9]
Object.assign(SIMPLE, {'S': `(([]+[])[${mapLn('constructor')}]+[])[${balls(9)}]`}); // (([]+[])['constructor]+[])[9]
Object.assign(SIMPLE, {'g': `(([]+[])[${mapLn('constructor')}]+[])[${mapLn('14')}]`});

// sketchy way of getting v and d from native code - hard to access
Object.assign(SIMPLE, {'v': `([][${mapLn('at')}]+[])[${mapLn('25')}]`});
Object.assign(SIMPLE, {'d': `([][${mapLn('at')}]+[])[${mapLn('30')}]`});

for (let i = 10; i < 36; i++) {
  if (!(i.toString(36) in SIMPLE)) {
    Object.assign(SIMPLE, {[`${i.toString(36)}`]: `${mapLn(i.toString())}[${mapLn('toString')}](${mapLn('36')})`}); 
  }
  
}
console.log(SIMPLE)

