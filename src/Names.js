import React, { useState, useEffect } from 'react'
import * as BooksAPI from './BooksAPI'
import { useHistory } from 'react-router-dom'
import Booksrack from './components/Booksrack'
import './App.css'


const Shelves = [
  { Headline: 'Currently Reading', SName: 'currentlyReading' },
  { Headline: 'Want to Read', SName: 'wantToRead' },
  { Headline: 'Read', SName: 'read' },
]

const Names = () => {
  const [books, BooksSetup] = useState([])
  const history = useHistory()

  useEffect(() => {
    BooksAPI.getAll().then((booksFromApi) => {
      BooksSetup(booksFromApi)
    })
  }, [])

  return (
    <div className="Names">
      <div className="list-books">
        <div className="list-books-content">
          <div>
            {Shelves.map((booksrack, index) => (
              
              <Booksrack

                key={index}
                Headline={booksrack.Headline}
                books={
                  books &&
                  books.filter((book) => book && book.shelf === booksrack.SName)
                }
                BooksSetup={BooksSetup}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => history.push('/SecondPage')}></button>
        </div>
      </div>
   
    </div>
  )
}

export default Names