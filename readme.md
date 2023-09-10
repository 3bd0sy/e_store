# Website Store Project README

Welcome to the E Store project! This web application is built using Laravel and React.js, allowing users to shop for products, create accounts, and manage their shopping experience. This README file provides essential information about the project, including installation instructions, features, and API endpoints.

## Project Features

The Website Store project offers the following features:

1. **User Authentication**:
   - Users can create accounts and log in securely using tokens.

2. **Product Browsing**:
   - Users can view a list of available products.

3. **Shopping Cart**:
   - Users can add products to their shopping cart.
   - Users can update the quantity of items in their cart.
   - Users can remove products from their cart.

4. **Profile Management**:
   - Users can view their profile information.

5. **Order Placement**:
   - Authenticated users can place orders for the items in their cart.

6. **Order History**:
   - Authenticated users can view their order history.

7. **Category Filtering**:
   - Users can filter products by category.

## Installation

To set up and run the Website Store project locally, follow these steps:

1. **Clone the Repository**:
-
  ```
  git clone https://github.com/3bd0sy/e_store
  ```
1. **Install Dependencies**:
- Install PHP dependencies:
  ```
  composer install
  ```
- Install JavaScript dependencies:
  ```
  npm install
  ```

1. **Database Configuration**:
- Create a new database and configure the `.env` file with your database connection settings.

1. **Migrate and Seed the Database**:
- Run the following commands to create and seed the database tables:
  ```
  php artisan migrate
  php artisan db:seed
  ```

1. **Generate Application Key**:
- Generate a unique application key:
  ```
  php artisan key:generate
  ```

1. **Start the Development Server**:
- Run the development server:
  ```
  php artisan serve
  ```
- Additionally, start the frontend development server :
  ```
  npm start
  ```

1. **Access the Website**:

- Open your web browser and navigate to `http://localhost:8000`  

## API Endpoints

Here are the API endpoints used in this project:

- **User Authentication**:  
 `/register` - User registration  
 `/login` - User login  

- **Product Management**:  
 `/products` - Get a list of products  

- **Shopping Cart**:    
 `/orders` - Create an order (requires authentication)   
 `/updateorder/{order_id}/product/{product_id}` - Update product quantity in the order (requires authentication)   
 `/deletefromorder/{order_id}/product/{product_id}` - Delete a product from the order (requires authentication)   

- **Profile Management**:  
 `/user` - Get user profile information (requires authentication)  

- **Order History**:  
 `/orders` - Get user order history (requires authentication)  

- **Category Management**:  
 `/categories` - Get a list of all product categories  
 `/products/category/{categoryId}` - Get products by category  
 `/products/search` - Search for products

- **User Logout**:  
 `/logout` - User logout (requires authentication)

## Contact

For any inquiries or feedback, please feel free to reach out to the project owner:

LinkedIn Profile: [Abdulbasit Abdulgani](https://www.linkedin.com/in/abdulbasit-abdulgani/)

Thank you for using the Website Store project! Happy shopping!
