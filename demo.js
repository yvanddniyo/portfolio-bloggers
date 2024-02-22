function isPrime(num) {
    if (num < 2) {
      return false;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
  
  function filterPrimes(inputArray) {
    let primeArray = [];
  
    for (let i = 0; i < inputArray.length; i++) {
      if (isPrime(inputArray[i])) {
        primeArray.push(inputArray[i]);
      }
    }
  
    return primeArray;
  }
  
  // Example usage:
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let primes = filterPrimes(numbers);
  console.log(primes); // Output: [2, 3, 5, 7]
  