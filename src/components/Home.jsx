
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RegistrationForm from './Form';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://reactnd-books-api.udacity.com/books",
          {
            headers: {
              'Authorization': 'whatever-you-want'
            }
          }
        );
        setBooks(response.data.books);
        setLoading(false);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching books.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
    <hr /><hr /><hr /><hr />
      <div className='header'>
        <h1>KALVIUM BOOKS📚</h1>
        <div className='search'>
          <input
            type="search"
            className='input-search'
            onChange={handleSearchInput}
            placeholder='Search Book'
          />
        </div>
        <Link to="/registration">
          <button className='register-button'>Register</button>
        </Link> 
      </div>
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <div className='details'>
        {books.length === 0 ? (
          <p>No books found.</p>
        ) : (
          books
            .filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((book) => (
              <div key={book.id} className='books'>
                <img src={book.imageLinks.thumbnail} alt="Book cover" />
                <div className='book-info'>
                  <p className='title'><b>{book.title}</b></p>
                  <p className='rating'>{book.averageRating}🌟 <span className='free'>🆓</span></p>
                </div>
              </div>
            ))
        )}
        <center className='thank'> <hr />THANK YOU FOR YOUR TIME ❤️</center>
      </div>
      
    </>
  );
};

export default Home;
