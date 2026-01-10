# Grocery Shop API

This is the backend API for the Grocery Shop application built with:

- **Node.js**
- **Express**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**

This API handles Users, Categories, Products, and Orders.

---

## 🚀 Features

### Users
✔ Register  
✔ Login  
✔ Get all users  
✔ Get user by ID  
✔ Update user  
✔ Delete user  

### Categories
✔ Create category  
✔ Get all categories  
✔ Get category by ID  
✔ Update category  
✔ Delete category  

### Products
✔ Create product  
✔ Get all products  
✔ Get product by ID  
✔ Update product  
✔ Delete product  

### Orders
✔ Create order  
✔ Get all orders  
✔ Get order by ID  
✔ Update order status  

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/ziam8415/grocery-shop.git
```
Install dependencies:

```
npm install
```

Create .env file based on .env.example

Example:

```
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
PORT=5000
```
Run Prisma migrations:

```
npx prisma migrate dev --name init
npx prisma generate
```
Start the server:

```
npm run dev
```
Server will run on http://localhost:5000

📌 API Endpoints
📍 User Routes
Method	Endpoint	Description
POST	/api/users	Create new user
GET	/api/users	Get all users
GET	/api/users/:id	Get user by ID
PUT	/api/users/:id	Update user
DELETE	/api/users/:id	Delete user

📍 Category Routes
Method	Endpoint	Description
POST	/api/categories	Create category
GET	/api/categories	Get all categories
GET	/api/categories/:id	Get category by ID
PUT	/api/categories/:id	Update category
DELETE	/api/categories/:id	Delete category

📍 Product Routes
Method	Endpoint	Description
POST	/api/products	Create product
GET	/api/products	Get all products
GET	/api/products/:id	Get product by ID
PUT	/api/products/:id	Update product
DELETE	/api/products/:id	Delete product

📍 Order Routes
Method	Endpoint	Description
POST	/api/orders	Create order
GET	/api/orders	Get all orders
GET	/api/orders/:id	Get order by ID
PUT	/api/orders/:id/status	Update order status

🧪 Demo Data (PostgreSQL example)
Users

```
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "ADMIN"
}

```
Categories

```
{
  "name": "Grocery Store",
  "slug": "grocery-store"
}

```

Sub Categories

```
{
  "name": "Spice & Herb Shop",
  "slug": "spice-herb-shop",
  "parentId": "PARENT_CATEGORY_ID"
}
```
Products

```
{
  "name": "Turmeric Powder",
  "slug": "turmeric-powder",
  "price": 120,
  "description": "Organic turmeric powder",
  "categoryId": "SUB_CATEGORY_ID"
}

```
Orders

```
{
  "userId": "USER_ID",
  "items": [
    {
      "productId": "PRODUCT_ID_1",
      "quantity": 2,
      "price": 120
    },
    {
      "productId": "PRODUCT_ID_2",
      "quantity": 1,
      "price": 150
    }
  ]
}

```


