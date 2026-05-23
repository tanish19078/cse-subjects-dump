# 📘 Project 1: Library Book Management System
# Problem Statement

# You are asked to design a simple Library Book Management System using Python.
# The system should allow a librarian (user) to manage books in a small library.

# Requirements

# Book Storage

# Store books in a 2D list, where each book has:

# [Book_ID, Title, Author, Availability]


# Example:

# library = [
#     [1, "Harry Potter", "J.K. Rowling", "Available"],
#     [2, "The Alchemist", "Paulo Coelho", "Issued"]
# ]


# Features

# Display all books with their details.

# Search for a book by title or author.

# Issue a book → If available, mark it as "Issued". Otherwise, display "Not Available".

# Return a book → Mark an issued book back to "Available".

# Add a new book to the library.

# Concepts to Use

# 1D Lists → to represent each book’s details.

# 2D List → to represent the entire library.

# Decision Control (if/else) → check if a book is available or not.

# Loops → for searching and displaying books.

# Expected Flow

# Welcome to Library System
# 1. Display Books
# 2. Search Book
# 3. Issue Book
# 4. Return Book
# 5. Add Book
# 6. Exit
# Enter your choice: 

library = [
    [1, "Harry Potter", "J.K. Rowling", "Available"],
    [2, "The Alchemist", "Paulo Coelho", "Issued"],
    [3, "1984", "George Orwell", "Available"],
    [4, "To Kill a Mockingbird", "Harper Lee", "Available"],
    [5, "The Great Gatsby", "F. Scott Fitzgerald", "Issued"]
]

# def display_books():