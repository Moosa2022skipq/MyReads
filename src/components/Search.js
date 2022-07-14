import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";

const Search = props => {
  const [searchText, setSearchText] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);
  const BooksHistory = useHistory();

  const handleSearchTextChange = event => {
    if (searchText.length !== 0) {
      BooksAPI.search(searchText).then(searchedBooks => {
        if (!searchedBooks.error) {
          BooksAPI.getAll().then(myBooks => {
            setSearchedBooks(setDefaultShelves(searchedBooks, myBooks));
          });
        } else {
          setSearchedBooks([]);
        }
      });
    } else if (searchText.length === 0) {
      setSearchedBooks([]);
    }
  };

  const setDefaultShelves = (searchedBooksLocal, myBooks) => {
    return searchedBooksLocal.map(book => {
      for (let i = 0; i < myBooks.length; i++) {
        if (myBooks[i].id === book.id) {
          return { ...book, shelf: myBooks[i].shelf };
        }
      }
      return { ...book, shelf: "none" };
    });
  };

  useEffect(() => {
    handleSearchTextChange();
  }, [searchText]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => BooksHistory.push("/")}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by Title or author"
            onChange={event => setSearchText(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchedBooks &&
            searchedBooks.map((book, index) => (
              <Book
                key={index}
                Headline={book.Headline}
                authors={book.authors}
                imageUrl={book.imageLinks && book.imageLinks.thumbnail}
                booksrack={book.shelf}
                book={book}
                isSearching
              />
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
