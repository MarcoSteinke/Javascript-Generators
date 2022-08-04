const BUTTON = document.querySelector("#trigger")
const DISPLAY = document.querySelector("#display")

// Most basic implementation, to check if a number is prime.
// This is not performant. Common performant prime number tests can be found on wikipedia.
function isPrime(n) {

    for(let i = 2; i < Math.floor(Math.sqrt(n)+1); i++) {
        if(n % i == 0) return false
    }

    return true
}

// Generates a maximum of 10 prime numbers using the provided function (isPrime)
// Generators are implemented using the function* type
function* primeNumberGenerator(starting = 1, numberOfPrimes = 10) {

    // sets the starting point of the prime number generator
    let lastPrime = starting
    
    while(numberOfPrimes > 0) {
        let tmpNumber = lastPrime
        // Iterate to find the next prime number
        while(!isPrime(tmpNumber + 1)) {
            tmpNumber++
        }
        lastPrime = tmpNumber + 1
        numberOfPrimes--
        // return the prime number
        yield tmpNumber + 1
    }
    // close the prime number generator by returning the last prime number again
    return lastPrime
}

// Instantiate the generator
const GENERATOR = primeNumberGenerator()
let warned = false;

// It can now be accessed using GENERATOR.next()

// Simply configuring the button to display the next prime number in the bottom box.
BUTTON.addEventListener("click", function(event) {
    event.preventDefault()
    let generatedPrime = GENERATOR.next()
    if(!generatedPrime.done) {
        DISPLAY.insertAdjacentHTML("beforeend", `<p>${generatedPrime.value}</p>`)
    } else if(!warned) {
        DISPLAY.insertAdjacentHTML("beforeend", `<p>The generator has ended.</p>`)
        warned = !warned
    }
})