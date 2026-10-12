# Library Management System - Report

**Name:** Thato  
**Module:** Web Development / React  
**Date:** October 2026

## Introduction
I built a simple library management system using React. It uses localStorage to save data. Librarians can manage books, stock and users.

## What I used
- React hooks (useState, useEffect)
- React Router for pages
- Controlled forms
- Local Storage
- Components for Navbar and pages

## Features
1. Login page with membership ID and password
2. Dashboard shows total books, stock and low stock books
3. Books page - add, update and delete books
4. Transactions page - add stock or deduct stock when books are borrowed
5. Users page - only admin can add, update or delete users

## How data is saved
I used localStorage. When the page loads I read the data with useEffect. When something changes I save it again.

## Problems I had
At first the low stock highlight was not working. I fixed it by checking if quantity is less than 2.

I also had to make sure only admin can see the Users page.

## Conclusion
The system has all the required features: book management, availability tracking, user management, forms, routing and local storage.
