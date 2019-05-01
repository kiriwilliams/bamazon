# bamazon
Node.js application to simulate a store.

## Install
Dependencies can be installed by running ```npm install``` after downloading package.json.

## Usage
Bamazon is a node application that runs in the terminal. 

### Bamazon Customer
The customer experience is run with 
```
node bamazonCustomer.js
```
Bamazon customer has two functionalities.
 
1. Display all products available for purchase.  
![](https://im.ezgif.com/tmp/ezgif-1-fd68b4ed2a8f.gif)  

2. Allow the user to make a purchase by specifying the product ID and quantity. The user is then told how much the total cost is.  
![](https://im.ezgif.com/tmp/ezgif-1-451ea75ed890.gif)  
If there is not enough stock remaining to fill the order, the customer is notified.  
![](https://im.ezgif.com/tmp/ezgif-1-3b9aba0b602b.gif)  

### Bamazon Manager
The manager experience is run with 
```
node bamazonManager.js
```

Bamazon Manager has four functionalities.

1. Display all products available for purchase, including stock quantities.  
![](https://im.ezgif.com/tmp/ezgif-1-a9ace6624898.gif)

2. Check which products have low inventory (below 5 remaining).  
![](https://im.ezgif.com/tmp/ezgif-1-274563a4646f.gif)

3. Add inventory to existing products.  
![](https://im.ezgif.com/tmp/ezgif-1-cd6bbc1d0a72.gif)

4. Add new products.  
![](https://im.ezgif.com/tmp/ezgif-1-f7063b48387b.gif)  
I meant to type cat food, but if a rabbit foot is lucky maybe a cat foot is too.

### Bamazon Supervisor
The supervisor experience is run with 
```
node bamazonSupervisor.js
```

Bamazon Supervisor has one working functionality.
 
1. Add new departments.  
![](https://im.ezgif.com/tmp/ezgif-1-f762fafb17b4.gif)
