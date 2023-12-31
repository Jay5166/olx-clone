import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';

function Header(props) {
  const [loc, setLoc] = useState('');
  useEffect(() => {
    // Update the 'userLoc' value in localStorage whenever 'loc' changes
    localStorage.setItem('userLoc', loc);
  }, [loc]);

  const [showOver, setshowOver] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');

    navigate('/login');
  };

  let locations = [
    {
      latitude: 28.6139,
      longitude: 77.2090,
      placeName: 'New Delhi, Delhi',
    },
    {
      latitude: 19.0760,
      longitude: 72.8777,
      placeName: 'Mumbai, Maharashtra',
    },
    {
      latitude: 22.518,
      longitude: 88.3832,
      placeName: 'Kolkata, West Bengal',
    },
  ];

  return (
    <div className="header-container d-flex justify-content-between">
      <div className="header">
        <Link className="links" to="/">
          HOME
        </Link>
        <select
          value={loc}
          onChange={(e) => {
            setLoc(e.target.value);
          }}
        >
          {locations.map((item, index) => (
            <option value={`${item.latitude},${item.longitude}`} key={index}>
              {item.placeName}
            </option>
          ))}
        </select>
        <input
          className="search"
          type="text"
          value={props && props.search}
          onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)}
        />
        <button className="search-btn" onClick={() => props.handleClick && props.handleClick()}>
          <FaSearch />
        </button>
      </div>

      <div>
        <div
          onClick={() => {
            setshowOver(!showOver);
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#002f34',
            width: '40px',
            height: '40px',
            color: '#fff',
            fontSize: '14px',
            borderRadius: '50%',
          }}
        >
          {localStorage.getItem('userName') ? localStorage.getItem('userName').charAt(0).toUpperCase() : 'Hii'}
        </div>

        {showOver && (
          <div
            style={{
              minHeight: '100px',
              width: '200px',
              background: '#eee',
              position: 'absolute',
              top: '0',
              right: '0',
              zIndex: 1,
              marginTop: '50px',
              marginRight: '50px',
              color: 'red',
              fontSize: '14px',
              background: '#002f34',
              borderRadius: '7px',
            }}
          >
            {localStorage.getItem('userRole') === 'user' ? (
              <>
                <div>
                  {!!localStorage.getItem('token') && (
                    <Link to="/add-product">
                      <button className="logout-btn">ADD PRODUCT</button>
                    </Link>
                  )}
                </div>
                <div>
                  {!!localStorage.getItem('token') && (
                    <Link to="/liked-products">
                      <button className="logout-btn">FAVOURITES</button>
                    </Link>
                  )}
                </div>
                <div>
                  {!!localStorage.getItem('token') && (
                    <Link to="/my-products">
                      <button className="logout-btn">MY ADS</button>
                    </Link>
                  )}
                </div>
                <div>
                  {!localStorage.getItem('token') ? (
                    <Link to="/login">LOGIN</Link>
                  ) : (
                    <button className="logout-btn" onClick={handleLogout}>
                      LOGOUT
                    </button>
                  )}
                </div>
              </>
            ) : localStorage.getItem('userRole') === 'Admin' ? (
              <>
                <div>
                  <Link to="/allusers">
                    <button className="logout-btn">All Users</button>
                  </Link>
                </div>
                <div>
                  {!localStorage.getItem('token') ? (
                    <Link to="/login">LOGIN</Link>
                  ) : (
                    <button className="logout-btn" onClick={handleLogout}>
                      LOGOUT
                    </button>
                  )}
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
