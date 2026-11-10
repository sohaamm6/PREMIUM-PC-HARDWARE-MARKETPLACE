# Rigora — PC Hardware Marketplace

Rigora is a PC hardware marketplace frontend with its original dark violet/cyan design preserved. This version adds a Node.js/Express backend, MongoDB-backed customer accounts and orders, guest browsing, separate sign-in/sign-up/delivery/payment routes, and a Razorpay checkout flow intended for **test mode**.

> Important: this is a learning/demo project, not a production-ready marketplace. Product prices are sample data. Before accepting real money, add payment webhooks, stock reservation, refunds, seller workflows, delivery/tax rules, monitoring, legal pages, and a security review.

## Project structure

```text
rigora-marketplace/
├── public/
│   ├── index.html          # Existing page shell and navigation
│   ├── styles.css          # Existing design, formatted for readability
│   └── app.js              # Frontend routes and interactions
├── src/
│   ├── data/products.js    # Server-authoritative demo prices
│   ├── middleware/
│   │   └── requireAuth.js  # Checkout API authentication guard
│   ├── models/
│   │   ├── User.js         # MongoDB customer model
│   │   └── Order.js        # MongoDB order/payment model
│   └── routes/
│       ├── auth.js         # Register, sign in, sign out, current user
│       └── payments.js     # Create Razorpay order and verify payment
├── .env.example            # Configuration template; copy to .env
├── .gitignore
├── package.json
└── server.js               # Express app and MongoDB/session setup
```

## What is connected

- **Guest browsing:** Home, product pages, catalog filters, search, PC builder, wishlist, and cart can be explored without signing in.
- **Customer registration/sign-in:** Required when a guest starts checkout. Passwords are hashed with bcrypt; sessions use an HTTP-only cookie.
- **MongoDB:** Customer records and payment/order records are stored in MongoDB.
- **Separate routes:** `#cart`, `#signin`, `#signup`, `#checkout` (delivery), and `#payment` are separate pages in the existing single-page frontend.
- **Payment flow:** Server calculates the amount from its own product catalogue, creates a Razorpay order, and verifies Razorpay's payment signature before marking the order as paid.
- **Still browser-local:** Wishlist, cart, and seller listing drafts currently use localStorage. Cart contents are sent to the server for price validation at payment time. Seller listings are not yet published to MongoDB.

## Beginner setup — Windows

### 1. Install Node.js

1. Install the current **Node.js LTS** release from <https://nodejs.org/>.
2. Open VS Code and choose **File → Open Folder**.
3. Select the extracted `rigora-marketplace` folder.
4. In VS Code choose **Terminal → New Terminal**.
5. Run these commands to confirm Node and npm are installed:

   ```powershell
   node --version
   npm --version
   ```

   Node.js 20 or newer is recommended.

### 2. Create a MongoDB database

You can use MongoDB Atlas (cloud) or a local MongoDB Community Server installation. Atlas is usually simpler for a first setup.

1. Visit <https://www.mongodb.com/atlas/database> and create a free development cluster.
2. In **Database Access**, create a database username and password. These are separate from your MongoDB website login.
3. In **Network Access**, add your current IP address for development. Avoid allowing access from everywhere unless you understand the security implications.
4. Open **Database → Connect → Drivers**, choose Node.js, and copy the connection string.
5. Replace the `<password>` placeholder with the database user's password. If the password contains special URL characters, URL-encode it.
6. Keep the connection string private. Do not paste it into frontend JavaScript or commit it to Git.

Example shape only:

```text
mongodb+srv://DB_USERNAME:DB_PASSWORD@your-cluster.example.mongodb.net/rigora?retryWrites=true&w=majority
```

### 3. Create your `.env` file

From the project root, run:

```powershell
Copy-Item .env.example .env
```

Open `.env` and set `MONGODB_URI` to the connection string from step 2. Set `SESSION_SECRET` to a long random value. You can generate one with:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Copy the generated value into `SESSION_SECRET`. Keep `.env` private; it is ignored by Git.

### 4. Install the project packages

In the same terminal, at the folder containing `package.json`, run:

```powershell
npm install
```

Wait until npm finishes. If npm reports a network or certificate error, resolve that first; the server cannot run until dependencies have installed.

### 5. Start the website

Run:

```powershell
npm run dev
```

Open <http://localhost:3000> in your browser. Do **not** double-click `index.html` or use a static Live Server for the backend version; the website needs to be served by Express for `/api/...` endpoints and sessions to work.

You can check the server status at <http://localhost:3000/api/health>. It should report `database: "connected"` after MongoDB connects.

## Configure Razorpay test payments

1. Create or sign in to a Razorpay account at <https://dashboard.razorpay.com/>.
2. Switch to **Test Mode** in the Razorpay dashboard.
3. Find the **Test API Keys** section and generate/copy the test Key ID and Key Secret.
4. Add them to `.env`:

   ```text
   RAZORPAY_KEY_ID=your_test_key_id
   RAZORPAY_KEY_SECRET=your_test_key_secret
   ```

5. Stop the server with `Ctrl+C`, then start it again with `npm run dev` so it reloads `.env`.
6. Check `/api/health`; `paymentConfigured` should be `true`.
7. Create a test customer account, add an item to the cart, continue through delivery, and choose **Pay securely**. Use only the test payment methods/details documented in your Razorpay test dashboard.

Do not use live keys for this college/demo project. The Razorpay secret belongs only in `.env` on the server. Never put it in `public/app.js`, `index.html`, or `styles.css`.

## How to test the main flows

1. Open the home page without signing in. Browse new and pre-owned parts and use search and filters.
2. Add a product to the cart. You should not be forced to register just to browse or add items.
3. Select **Continue to checkout**. A guest should be taken to the separate Sign in page.
4. Choose **Create an account**, register with a valid email and a password of at least 8 characters, then return to checkout.
5. Enter delivery details and continue to the separate Payment page.
6. With MongoDB and Razorpay test keys configured, complete a test payment. The backend must verify the payment signature before showing a confirmed order.
7. Open Account → My orders to view MongoDB-backed order records.

## Common beginner errors

- **`MONGODB_URI is missing`:** Check that the file is named `.env` (not `.env.txt`) and that it is in the project root next to `server.js`.
- **MongoDB server selection / timeout:** Check the Atlas IP allowlist, database username/password, and connection string.
- **`Payment is not configured yet`:** Add Razorpay test keys to `.env`, save, and restart the server.
- **`Cannot find module ...`:** Run `npm install` from the project root.
- **The site opens but API requests fail:** Make sure you opened `http://localhost:3000`, not `file:///.../index.html` or a different Live Server port.
- **Port 3000 is busy:** Set a different `PORT` in `.env`, then open the matching local URL.

## Important implementation notes

- The server catalogue in `src/data/products.js` is the trusted price source for checkout. Update it whenever the visible product catalogue prices change. The next improvement should move products into MongoDB and provide an admin workflow.
- Cart and wishlist data are browser-local; they are not shared between devices. Server validation prevents the browser from choosing arbitrary product prices, but a production cart should be stored server-side.
- Seller listing submissions are still local demo records. Do not treat them as published listings.
- Payment verification currently happens through the Razorpay checkout callback. A production deployment must also configure and verify Razorpay webhooks so a payment can be reconciled if the customer closes the browser before the callback completes.
- The legal/support pages contain demo copy. Review privacy, terms, returns, and support details before inviting real customers.
- Use HTTPS and secure production environment variables before deployment. Never store card numbers or CVVs in MongoDB.
