
class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('Key error');
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    this._slots[index] = {
      key, value
    };
    this.length++;
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i = start; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || (slot.key == key && !slot.deleted)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    this.length = 0;
    this.deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

// Palindrome 
// Write an algorithm to check whether any permutation of a string is a palindrome. Given the string "acecarr", the algorithm should return true, because the letters in "acecarr" can be rearranged to "racecar", which is a palindrome. 
//In contrast, given the word "north", the algorithm should return false, because there's no way to rearrange those letters to be a palindrome.


// The core test of whether a word is a palindrome is:
// 1: The word reversed is the same as the word forwards
// 2: If this is true, then there is at most one letter which has an odd number of occurences. 
// So we will

// Take string in as a parameter. 
// create a new HashMap
// in a for loop, loop through each character in the string
//    each iteration, check to see if the character has already been stored there. if so, increment it's count. If not, store it.
// initialize a counter variable
// loop through the hash map using the string as an index, each time that an odd number of occurences is encountered, increase the counter. 
// if the counter is greater than 1, return false. If equal to or less than one, return true

// Any Permutation a Palindrome 
function uniqueChars(string) {
  const chars = [];
  for (let i = 0; i < string.length; i++) {
    if (!(chars.includes(string[i]))) {
      chars.push(string[i]);
    }
  }
  return chars;
}

function permutationPalindrome(string) {
  const chars = uniqueChars(string);
  const palindrome = new HashMap;
  let count = 0;

  for (let i = 0; i < chars.length; i++) {
    palindrome.set(chars[i], 0);
  }

  for (let i = 0; i < string.length; i++) {
    palindrome.set(string[i], (palindrome.get(string[i]) + 1));
  }

  for (let i = 0; i < chars.length; i++) {
    if (palindrome.get(chars[i]) % 2 !== 0) {
      count++;
    }
  }

  console.log(palindrome);

  return count < 2;
}

// Grouping Anagrams 
function groupAnagrams(array) {
  const groupedAnagrams = new HashMap;
  const uniqueKeys = [];
  let result = [];

  for (let i = 0; i < array.length; i++) {
    const lettersSorted = array[i].split('').sort().join('');
    if (!uniqueKeys.includes(lettersSorted)) {
      uniqueKeys.push(lettersSorted);
    }
    groupedAnagrams.set(lettersSorted, []);
  }

  for (let i = 0; i < array.length; i++) {
    const lettersSorted = array[i].split('').sort().join('');
    groupedAnagrams.get(lettersSorted).push(array[i]);
  }

  for (let i = 0; i < uniqueKeys.length; i++) {
    result.push(groupedAnagrams.get(uniqueKeys[i]));
  }

  return result;
}

function main() {
  const lor = new HashMap;

  lor.set('Hobbit', 'Bilbo');
  lor.set('Hobbit', 'Frodo');
  lor.set('Wizard', 'Gandolf');
  lor.set('Human', 'Aragon');
  lor.set('Elf', 'Legolas');
  lor.set('Maiar', 'The Necromancer');
  lor.set('Maiar', 'Sauron');
  lor.set('RingBearer', 'Gollum');
  lor.set('LadyOfLight', 'Galadriel');
  lor.set('HalfElven', 'Arwen');
  lor.set('Ent', 'Treebeard');

  // console.log(lor);
  // console.log(lor.get('Maiar'));

  // console.log(permutationPalindrome('acecarr'));
  // console.log(permutationPalindrome('racecar'));

  console.log(groupAnagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));
}

main();