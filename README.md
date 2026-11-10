Rigora – PC Hardware Marketplace Project
Rigora is a full-stack e-commerce marketplace developed for buying and selling PC hardware components. The platform allows users to explore, compare, and purchase computer components, including graphics cards, processors, RAM, SSDs, motherboards, and monitors. It supports both new and pre-owned hardware products and provides a convenient shopping experience for PC enthusiasts and gamers.

The main objective of this project is to create an online marketplace where customers can discover PC hardware, manage their shopping carts, create accounts, and purchase products through an online payment gateway.

1. Project Features

The project includes several important features:

Product Marketplace: Users can browse different PC hardware components, including graphics cards, processors, RAM, SSDs, motherboards, and monitors. They can explore product details, prices, specifications, ratings, and new or pre-owned products.

Shopping Cart: Users can add products to their shopping cart, remove products, and manage product quantities before proceeding to checkout.

Wishlist: Users can save their favourite products for future reference. The shopping cart and wishlist information are stored using browser localStorage.

User Authentication: The platform provides user registration and login functionality. Passwords are hashed using bcryptjs, and sessions are managed using express-session.

Payment Integration: The project integrates the Razorpay payment gateway to process online payments. It supports payment order creation and payment signature verification.

PC Builder: The project includes a PC Builder interface that helps users explore and select different computer hardware components.

Product Search and Filtering: Users can search for products and filter them according to different hardware categories.

Seller Functionality: The platform includes a seller listing interface where users can submit information about hardware products they want to sell. Currently, seller submissions are handled as demo records.

2. Technologies Used

The project uses the following technologies:
- HTML5 – Used to create the structure of the website.
- CSS3 – Used for website styling, layouts, and responsive design.
- JavaScript – Used to implement frontend functionality and user interactions.
- Node.js – Used as the backend JavaScript runtime environment.
- Express.js – Used to develop the backend server and REST APIs.
- MongoDB – Used as the database to store user and order information.
- Mongoose – Used to define database schemas and interact with MongoDB.
- Razorpay – Used for online payment gateway integration.
- bcryptjs – Used for password hashing and security.
- express-session – Used to manage user sessions.
- Helmet – Used to improve application security through HTTP security headers.
- Git and GitHub – Used for source code management and project hosting.
3. Project Architecture

The project follows a frontend-backend architecture.

The frontend is developed using HTML, CSS, and JavaScript. It handles the user interface, product browsing, shopping cart, wishlist, login, registration, and checkout pages.

The backend is developed using Node.js and Express.js. It handles server-side operations such as user authentication, session management, API requests, order processing, and payment verification.

MongoDB is used as the database, while Mongoose provides an interface for managing database operations.

Razorpay is integrated to handle online payment processing.

4. Working of the Project

First, users visit the Rigora website and explore the available PC hardware products. They can search for components, view product information, and add their preferred products to the shopping cart.

Users can create an account or log in to access the authentication features. After selecting their products, they proceed to the checkout page and enter their delivery information.

The backend handles order-related operations and creates a payment order through Razorpay. Once the payment is completed, the backend verifies the payment signature to validate the transaction.

Finally, the order information, including product details, quantities, customer information, and payment status, is stored in MongoDB.

5. Database Models

The project currently includes two main MongoDB models:

User Model: Stores customer information such as name, email address, and hashed password. It is used for user registration and authentication.

Order Model: Stores order-related information such as order number, customer reference, purchased products, quantities, prices, delivery details, and payment status.

6. Project Limitations and Future Improvements

Although Rigora provides several e-commerce functionalities, some features are currently implemented as demonstrations.

Product information is maintained in JavaScript files instead of being dynamically stored in MongoDB. Shopping cart and wishlist information are stored in browser localStorage. Seller listing submissions are not yet connected to a permanent database system.

The payment integration is intended for testing purposes, and additional production-level features such as payment webhooks, advanced order management, and seller management can be implemented in the future.

Future improvements could include an admin dashboard, seller authentication, real-time product inventory management, product reviews, order tracking, and advanced product recommendations.

7. Project Conclusion

Rigora is a full-stack PC hardware marketplace that demonstrates the implementation of modern web development technologies. It combines frontend development, backend programming, database management, user authentication, REST API development, and payment gateway integration.

This project provides practical experience in developing an e-commerce application and understanding how different technologies work together to build a functional web-based marketplace.

8. Resume Project Description

Rigora – PC Hardware Marketplace

Developed a full-stack e-commerce marketplace for buying and selling new and pre-owned PC hardware components. Implemented product browsing, search, filtering, shopping cart, wishlist, user authentication, and checkout functionality. Developed backend REST APIs using Node.js and Express.js, integrated MongoDB for user and order management, and implemented Razorpay payment gateway integration with server-side payment verification.

Technologies Used: HTML5, CSS3, JavaScript, Node.js, Express.js, MongoDB, Mongoose, Razorpay, bcryptjs, Git and GitHub.
