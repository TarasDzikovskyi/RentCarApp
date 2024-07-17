const array1 = [1, 2, 3];
const array2 = [3, 4, 5];

const combinedArray = [...new Set([...array1, ...array2])];

console.log(combinedArray);
