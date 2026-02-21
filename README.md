# 📸 Mini Instagram Clone

A mini Instagram-style web application built using **Node.js, Express, MongoDB, JWT, Multer, and EJS**.

This project demonstrates authentication, image uploads, pagination, likes system, and secure owner-based authorization.

## 🚀 Features

- 🔐 JWT Authentication (Register / Login / Logout)
- 🍪 HTTP-only Cookie Storage
- 📸 Image Upload using Multer
- 📝 Create Post
- ✏️ Edit Post (Owner Only)
- ❌ Delete Post (Owner Only)
- ❤️ Like / Unlike System
- 📄 Pagination (4 posts per page)
- 🛡️ Route Protection Middleware
- 🎨 Clean Inline EJS UI

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JSON Web Token (JWT)  
- **Templating Engine:** EJS  
- **File Upload:** Multer  
- **Development Tool:** Nodemon  

---

## 🔐 Authentication Flow

1. User registers (password hashed using bcrypt)
2. User logs in
3. JWT token generated
4. Token stored in HTTP-only cookie
5. Protected routes use `protect` middleware
6. `checkUser` middleware makes user globally available

---

## ❤️ Like System Logic

- Each post stores an array of user IDs in `likes`
- One user can like only once
- Clicking again unlikes the post
- Like count updates dynamically
- Only logged-in users can like

---

## 🛡 Security Features

- JWT verification middleware
- Owner-based edit/delete restriction
- Secure cookie storage
- Old image auto-deleted on update/delete
- Route-level protection

---

## 📄 Pagination

- 4 posts per page
- Uses query parameter: `/?page=1`
- Sorted by newest first

---

## 🧪 Testing Flow

1. Register new user
2. Login
3. Create multiple posts
4. Check pagination (4 per page)
5. Like and Unlike posts
6. Edit your own post
7. Try editing another user's post (should fail)
8. Delete your own post
9. Logout

---
