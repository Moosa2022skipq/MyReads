import React from "react";
import Book from "./Book";

const Booksrack = props => {
  const { books, Headline, BooksSetup } = props;

  return (
    <div className="booksrack">
      <h2 className="booksrack-Headline">{Headline}</h2>
      <div className="booksrack-books">
        <ol className="books-grid">
          {books &&
            books.map((book, index) => (
              <li key={index}>
                <Book
                  Headline={book.Headline}
                  authors={book.authors}
                  imageUrl={book.imageLinks && book.imageLinks.thumbnail}
                  booksrack={book.shelf}
                  book={book}
                  BooksSetup={BooksSetup}
                />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Booksrack;
