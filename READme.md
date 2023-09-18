## Ayeti Adorn
![Ayeti Adorn](Ayeti.png "Ayeti Adorn")
### Description:  E-commerce web application built with the MERN Stack, with 3 mode of payment using Flutterwave, Paystack or Stripe. 
___

### Link to the live website: [Ayeti-Adorn](https://ayeti-adorn-n9i6.onrender.com/ "Ayeti Adorn live site")
___

#### Frontend Design: Freestyled : )
___

### Tech Used:
1. React
2. NodeJS
3. ExpressJS
4. Git
5. Github
6. MongoDB
7. JWT
8. Bcrypt
9. Express Rate limiter
10. Render
11. React-router
12. Tailwind
13. swr
___

### Client Side



### Server Side / API
#### NB:
1. "*" -- compulsory field
2. "?" -- optional field
3. Authorization roles - Admin, Seller, User
#### Authentication
Authentication is enabled in this app using JWT and cookies.
Access Token and Refresh Token is sent with each request and is verified on the server.

1. Endpoint to register user
```JSON
POST: {{DOMAIN}}/api/v1/auth/register
{
    "name" *: "your name",
    "email" *: "youremail@something.com",
    "password" *: "yourpassword"
}
```

2. Endpoint to verify email
```JSON
POST: {{DOMAIN}}/api/v1/auth/verify-email
{
   "verificationToken" *: "verification token sent with mail", 
   "email" *: "your email"
}
```
3. Endpoint to logout
```JSON
GET:{{DOMAIN}} /api/v1/auth/logout
{}
```
4. Endpoint for forgot password
```JSON
POST: {{DOMAIN}}/api/v1/auth/forgot-password
{
   "email" *: "your email"
}
```
6. Endpoint for reset password 
```JSON
POST: {{DOMAIN}}/api/v1/auth/reset-password
{
   "email" *: "your email"
}
```

#### Users
1. Endpoint to get all user (Admin)
```JSON
GET: {{DOMAIN}}/api/v1/user
{}
```
2. Endpoint to get single user 
```JSON
GET: {{DOMAIN}}/api/v1/user/user-id
{}
```
3. Endpoint to show current user
```JSON
GET: {{DOMAIN}}/api/v1/users/show
{}
```
4. Endpoint to update user
```JSON
PATCH: {{DOMAIN}}/api/v1/user/update
{
    "name" ?: "new name",
    "email" ?: "new email",
    "avatar" ?: "new profile pic"
}
```
5. Endpoint to update user password
```JSON
PATCH: {{DOMAIN}}/api/v1/user/updatePwd
{
    "oldPassword" *: "yourpassword",
    "newPassword" *: "yournewpassword",
}
```
#### Products
1. Endpoint to get create product (Admin, Seller) 
```JSON
POST: {{DOMAIN}}/api/v1/products
{   
    "name" *: "Product Name",    
    "category" *: "kids/women/men/unisex",   
    "desc" *: "Description of product"
}
```
1. Endpoint to get all products (Admin)
```JSON
GET: {{DOMAIN}}/api/v1/products
{}
```
2. Endpoint to get single product
```JSON
// For users
GET: {{DOMAIN}}/api/v1/products/auth/product-id
{}
```
```JSON
// For visitors
GET: {{DOMAIN}}/api/v1/products/product-id
{}
```
3. Endpoint to delete product (Admin, Seller)
```JSON
DELETE: {{DOMAIN}}/api/v1/products/product-id
{}
```
4. Endpoint to update product (Admin, Seller)
```JSON
PATCH: {{DOMAIN}}/api/v1/products/product-id
{
    "name" ?: "Product Name",    
    "category" ?: "kids/women/men/unisex",   
    "desc" ?: "Description of product"
}
```
5. Endpoint to like/unlike product
```JSON
PATCH: {{DOMAIN}}/api/v1/products/product-id
{}
```
6. Endpoint to get current user products (Admin, Seller)
```JSON
GET: {{DOMAIN}}/api/v1/products/my-products
{}
```

#### Stores
  createStore,
  getAllStores,
  getStore,
  getMyStore,
  updateStore,
  deleteStore,
1. Endpoint to create store
```JSON
POST: {{DOMAIN}}/api/v1/store
{   
    "name" *: "Store Name",      
    "desc" *: "Description of store"
}
```
2. Endpoint to get all stores
```JSON
GET: {{DOMAIN}}/api/v1/store
{}
```
3. Endpoint to get single store
```JSON
GET: {{DOMAIN}}/api/v1/store/store-id
{}
```
4. Endpoint to add get seller store (Admin, seller)
```JSON
GET: {{DOMAIN}}/api/v1/store
{}
```
5. Endpoint to update store (Admin, Seller)
```JSON
PATCH: {{DOMAIN}}/api/v1/store/store-id
{
     "name" ?: "store new name", 
     "desc" ?: "store new description", 
     "insta" ?: "link to store instagram page", 
     "fb" ?: "link to store facebook page", 
     "tiktok" ?: "link to store tiktok page", 
     "open": "Boolean(true/ false)" 
}
```
6. Endpoint to delete store (Admin, Seller)
```JSON
DELETE: {{DOMAIN}}/api/v1/store/store-id
{}
```

#### Reviews
1. Endpoint to get create review 
```JSON
POST: {{DOMAIN}}/api/v1/reviews
{ 
    "title" *: "Review title",
    "comment" *: "Review Comment",
    "rating" *: 5,(Number 1-5 )    
    "product" *: "product ID"
}
```
1. Endpoint to get all reviews
```JSON
GET: {{DOMAIN}}/api/v1/reviews
{}
```
1. Endpoint to get single review
```JSON
GET: {{DOMAIN}}/api/v1/reviews/review-id
{}
```
1. Endpoint to update review
```JSON
PATCH: {{DOMAIN}}/api/v1/reviews/review-id
{
    "title" ?: "New Review title",
    "comment" ?: "New Review Comment",
    "rating" ?: 1,(Number 1-5 )   
}
```
1. Endpoint to delete review
```JSON
DELETE: {{DOMAIN}}/api/v1/reviews/review-id
{}
```

#### Orders
1. Endpoint to get all orders 
```JSON
GET: {{DOMAIN}}/api/v1/orders
{}
```
2. Endpoint to single order
```JSON
GET: {{DOMAIN}}/api/v1/orders/order-id
{}
```
3. Endpoint to current user order history
```JSON
GET: {{DOMAIN}}/api/v1/orders/showCurrentUserOrder
{}
```
4. Endpoint to get current vendor sales (Admin, Seller)
```JSON
GET: {{DOMAIN}}/api/v1/orders/showCurrentUserSales
{}
```
5. Endpoint to create order
```JSON
POST: {{DOMAIN}}/api/v1/orders
{
    "email" ?: "your name",
    "name" ?: "your email",
    "address" *: "your address",
    "city" *: "your city",
    "country" *: "your country",
    "cartItems" *: [
        {
            "product": "product ID","name": "Product 1", "amount": 2, "image": "/uploads/example.jpeg", "price":200 
        },
        {
            "product": "product ID","name": "Product 2", "amount": 1, "image": "/uploads/example.jpeg", "price": 400
        }
    ],
    "shippingFee": 20
},
```
6. Endpoint to update order (Admin)
```JSON
PATCH: {{DOMAIN}}/api/v1/orders/order-id
{
    "status" *: "paid" 
    ["pending", "failed", "paid", "delivered", "canceled"],
    "payStackAccessCode" ?: "paystack access code",
    "stripeClientSecret" ?: " stripe client secret",
    "flutterTrxId" ?: "flutter wave transaction id"
},
```
   
#### Payment
1. Paystack 
```JSON
1. Accept Payment: 
PATCH: {{DOMAIN}}/api/v1/payment/paystack/acceptPayment
{
  "email" *: "youremail", 
  "amount" *: "amount to be paid in (Naira)", 
  "ref" ?: "unique reference code" 
},

2. Verify
```
2. Stripe
3. Flutterwave

#### Future Feature
1. Paginate the product page
2. Send email when payment is successful