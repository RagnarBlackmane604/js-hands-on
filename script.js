/* JS Dates */

/* Create a function calculateDateDifference that takes two date strings in the format YYYY-MM-DD HH:MM:SS and returns the difference between them in days, hours, and minutes.
Use the Date object to parse the dates and calculate the difference.
Log the result to the console in the format: X days, Y hours, Z minutes. */

/* Example:
console.log(calculateDateDifference("2023-10-05 14:30:45", "2023-10-10 10:15:30")); */
// Example output: "4 days, 19 hours, 44 minutes"

function calculateDateDifference(date1, date2) {
    // Convert date strings into Date objects by replacing the space with 'T' for ISO 8601 format
    const d1 = new Date(date1.replace(" ", "T"));
    const d2 = new Date(date2.replace(" ", "T"));

    // Get the difference in milliseconds
    const diffInMs = Math.abs(d2 - d1); // Absolute value in case date1 is later than date2

    // Constants for time conversion
    const MS_IN_DAY = 86400000; // 24 hours in milliseconds
    const MS_IN_HOUR = 3600000; // 1 hour in milliseconds
    const MS_IN_MINUTE = 60000; // 1 minute in milliseconds

    // Calculate days, hours, minutes
    const days = Math.floor(diffInMs / MS_IN_DAY);
    const hours = Math.floor((diffInMs % MS_IN_DAY) / MS_IN_HOUR);
    const minutes = Math.floor((diffInMs % MS_IN_HOUR) / MS_IN_MINUTE);

    // Return the formatted result
    return `${days} days, ${hours} hours, ${minutes} minutes`;
}

// Example:
console.log(calculateDateDifference("2023-10-05 14:30:45", "2023-10-10 10:15:30"));
// Expected output: "4 days, 19 hours, 44 minutes"

/* Part 2: JS Regular Expressions

Create a function validateProductSKU that checks if a product SKU is valid.
A valid SKU should:
Start with 3 uppercase letters (representing the product category).
Followed by a hyphen.
End with 6 digits (representing the product ID).
Use a regular expression to validate the SKU.
Log the result to the console.

Example:
console.log(validateProductSKU("ABC-123456")); // true  
console.log(validateProductSKU("123-ABCDEF")); // false */

function validateProductSKU(sku) {
    // Regular expression to match the SKU format: 3 uppercase letter, hyphen, 6digits
    const regex = /^[A-Z]{3}-\d{6}$/;

    // Test the SKU string againts the regular expression

    return regex.test(sku);
}

// Example:

console.log(validateProductSKU("ABC-123456")); // true  
console.log(validateProductSKU("123-ABCDEF")); // false


// Part 3: JS Callbacks

/* Create a function processOrder that takes three arguments:
orderId (string): The ID of the order.
callback (function): A callback function to execute after processing the order.
delay (number): The delay in milliseconds before executing the callback.
Inside the function, simulate processing the order by logging the order ID and the current date and time.
Use setTimeout to execute the callback after the specified delay.
The callback should simulate additional steps like payment confirmation and shipping notification.

Example:
processOrder("ORDER123", (order) => {
  console.log(`Payment confirmed for order: ${order}`);
  setTimeout(() => {
    console.log(`Order shipped: ${order}`);
  }, 2000);
}, 3000); */

function processOrder(orderId, callback, delay) {
    // Simulate order processing by logging the order ID and the current date/time
    console.log(`Processing order: ${orderId} at ${new Date().toLocaleString()}`);
    
    // Use setTimeout to execute the callback after the specified delay
    setTimeout(() => {
        callback(orderId); // Execute the callback with orderId as an argument
    }, delay);    
}

// Example:
    processOrder("ORDER123", (order) => {
    // Simulate payment confirmation
    console.log(`Payment confirmed for order: ${order}`);
    

 // Simulate a delay for shipping notification
 setTimeout(() => {
    console.log(`Order shipped: ${order}`);
}, 2000); // Shipping notification after 2 seconds
}, 3000); // Process the order with a 3-second delay

/* Part 4: JS Intervals

Create a function monitorInventory that takes three arguments:
productId (string): The ID of the product.
callback (function): A callback function to execute repeatedly.
interval (number): The interval in milliseconds between executions.
Use setInterval to execute the callback repeatedly at the specified interval.
Log the product ID and the current date and time each time the callback runs.
Simulate random stock level changes (e.g., increase or decrease by 1-5 units) 
and pass the updated stock level to the callback.

Example:
monitorInventory("PROD123", (stock) => console.log(stock), 5000);
// Output every 5 seconds: { productId: "PROD123", stock: 15 } */

function monitorInventory(productId, callback, interval) {
    // Initialize stock level
    let stockLevel = 50; // Starting Stock 
    
    // Set up interval to run the callback every `interval` seconds
    let seconds = 0;
    let minutes = 0;

    // Set up interval to update stock level and run callback every `interval` milliseconds
    setInterval(() => {
        if (seconds == 6) {
            seconds = 0;
            minutes++;
        } else {
            seconds++;
        }
        console.log(`Time: ${minutes}:${seconds}`);
    } , 1000);
    // Random increase/decrease
    const change = Math.floor(Math.random()*5)+1; // Random number between 1-5
    const isIncrease = Math.random() > 0.5; // Randomly decide if increase or decrease
    
    // Update stock level
    stockLevel = isIncrease ? stockLevel + change : stockLevel - change;

    // Ensure stock level not < 0
    if (stockLevel < 0) stockLevel = 0;

    // Prepare product info to send to callback
    const productInfo = {
        productId: productId,
        stock: stockLevel
    };

    // Log product info
    console.log(`${new Date().toLocaleString()} - Product: ${productId}, Stock: ${stockLevel}`);

    // Call the callback with the upadted product info
    callback(productInfo);

}

// Example usage:
/* monitorInventory("PROD123", (product) => {
    console.log(product);  // Log the product info
}, 5000);  */ // Monitor every 5 seconds  

/* Part 5: JS Promises

Create a function restockProduct that returns a promise.
The promise resolves if the restocking is successful.
The promise rejects if the restocking fails (e.g., due to supplier issues).
Simulate an asynchronous operation using setTimeout.
Log the result of the promise using both .then/.catch and async/await.

Example:
restockProduct("PROD123")
  .then(() => console.log("Product restocked successfully!"))
  .catch(() => console.log("Failed to restock product..."));

// Using async/await
(async () => {
  try {
    await restockProduct("PROD123");
    console.log("Product restocked successfully!");
  } catch {
    console.log("Failed to restock product...");
  }
})(); */

function restockProduct(product) {
    // Simulating an asynchronous operation
    return new Promise((resolve, reject) => {
 
        setTimeout(() => {
        let success = Math.random() >0.5; // 50% chance of success or failure
        
        if (success) {
            resolve("Product restocked successfully!");
        } else {
            reject("Failed to restock product due to supplier Issues!");  
    }
}, 2000); // Simulate a 2 second dalay for restocking
});
}

// Using .then/.catch

restockProduct("PROD123")
  .then((message) => console.log(message))
  .catch((error) => console.log(error));

// Using async/await
(async () => {
    try {
      const message = await restockProduct("PROD123");
      console.log(message);  // Success
    } catch (error) {
      console.log(error);  // Failure
    }
  })();

/* Part 6: Fetch API

Use the Fetch API to fetch product data from a public API (e.g., FakeStoreAPI).
Fetch a list of products and filter them based on:
Price range (e.g., between 10 and 50).
Category (e.g., "electronics").
Log the filtered product names and prices. */

fetch("https://fakestoreapi.com/products")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    
    // Filter products based on price range and category
  const filteredProducts = data.filter((product) => {
    return product.price >= 10 && product.price <= 50 && product.category === "men's clothing";
});
console.log(filteredProducts);
  
 // Log the filtered product names and prices
 filteredProducts.forEach((product) => {
    console.log(`Product: ${product.title}, Price: $${product.price}`);
  });
})
  
  .catch((error) => {
    console.log(error.message);
  });

/* Part 7: Higher-Order Array Methods

Use the fetched products from Step 6.
Calculate and log the following statistics:
Total number of products.
Average price of products.
Most expensive product.
Cheapest product.
Use higher-order array functions like reduce, map, and sort. */

// Fetch the total number of products
fetch("https://fakestoreapi.com/products")
    .then((response) => response.json()) // Parse the response to JSON
    .then((data) => {
        // Total number of products
        const totalProducts = data.length;

        // Average price of products
        const totalPrice = data.reduce((sum, product) => sum + product.price, 0);
        const averagePrice = totalPrice / totalProducts;
    
        // Finding most expensive product
        const mostExpensiveProduct = data.reduce((max, product) => (product.price > max.price ? product : max), data[0]);

        // Finding most cheapest product
        const cheapestProduct = data.reduce((min, product) => (product.price < min.price ? product : min), data[0]);

        // Logging the results
        console.log(`Total number of products: ${totalProducts}`);
        console.log(`Average price of products: $${averagePrice.toFixed(2)}`);
        console.log(`Most expensive product: ${mostExpensiveProduct.title}, Price: $${mostExpensiveProduct.price}`);
        console.log(`Cheapest product: ${cheapestProduct.title}, Price: $${cheapestProduct.price}`);


    })
    .catch((error) => {
        //Log any errors that occur during fetch
        console.log("Error:", error.message);
    });