import './App.css';
import React, { useState } from "react";
import { RangeSlider } from './RangeSlider';
import InsightsMiddleware from './InsightsMiddleware';
import { FiHeart } from 'react-icons/fi';
import { AiOutlineShoppingCart, AiOutlineUserAdd } from 'react-icons/ai';
import { InstantSearch, SearchBox, Hits, Highlight, Stats, SortBy, Pagination, RefinementList, useInstantSearch, HierarchicalMenu, HitsPerPage, Configure } from 'react-instantsearch';
import { RatingMenu } from './RatingMenu';
import { NoResultsBoundary, NoResults } from './NoResults';

import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/satellite.css';

const searchClient = algoliasearch('WQ2TRBB6QR', '8f8237e02a64b0f28b86d2a1116a3c74');

function Hit({ hit, addToCart }) {
  const [showFavoritesMessage, setShowFavoritesMessage] = useState(false);
  const handleAddToCart = () => {
    addToCart(hit);
  };

  const addToFavorites = () => {
    setShowFavoritesMessage(true);
    setTimeout(() => setShowFavoritesMessage(false), 2000);
    console.log("Product added to favorites:", hit.name);
  };

  const priceToDisplay = hit.salePrice > 0 ? hit.salePrice : hit.price;

  return (
    <article className="product">
      <div className="product-image">
        <img src={hit.image} alt={hit.name} />
      </div>
      <div className="product-details">
        <div className="product-buttons">
          <button onClick={handleAddToCart} className="add-to-cart-button">
            Add to Cart
          </button>
          <button onClick={addToFavorites} className="add-to-favorites-button">
            ❤️
          </button>
          {showFavoritesMessage && <div className="favorites-message">Added to Favorites</div>}
        </div>
        <h2 className="product-title">
          <Highlight attribute="name" hit={hit} />
        </h2>
        <p className="product-price">${priceToDisplay}</p>
        <p className="product-description">{hit.shortDescription}</p>
      </div>
    </article>
  );
}

function Cart({ cartItems }) {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimized = () => {
    setIsMinimized(prevState => !prevState);
  };

  return (
    <div className={`cart ${isMinimized ? 'minimized' : ''}`}>
      <div className="cart-header" onClick={toggleMinimized}>
        <h2>Shopping Cart</h2>
        <span className={`toggle-icon ${isMinimized ? 'expanded' : ''}`}>&#9660;</span>
      </div>
      {!isMinimized && (
        <div className="cart-content" style={{ maxHeight: '800px', overflowY: 'auto' }}>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.salePrice}
              </li>
            ))}
          </ul>
          {cartItems.length > 0 && (
            <button className="checkout-button">
              Checkout
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [viewMode, setViewMode] = useState('list');
  const [freeShipping, setFreeShipping] = useState(false);

  const toggleFreeShipping = () => {
    setFreeShipping(prevFreeShipping => !prevFreeShipping);
  };

  const toggleViewMode = () => {
    setViewMode(prevMode => (prevMode === 'list' ? 'grid' : 'list'));
  };

  const addToCart = (hit) => {
    setCartItems(prevCartItems => [...prevCartItems, hit]);
  };

  return (
    <div className="content">
      <InstantSearch searchClient={searchClient} indexName="ecommerce_data" insights={true}>
        <InsightsMiddleware />

        <header className="header" id="header">
          <div className="navbar">
            <div className="logo">
              <a href='#'><img src={require ("./commerce-logo.png")} alt="Logo" /></a>
            </div>
            <div className='searchbar'>
              <SearchBox placeholder="Search for products"/>
            </div>
            <ul className='additional-buttons'>
              <a href="#">
                <FiHeart className="nav-icons" />
              </a>
              <a href="">
                <AiOutlineShoppingCart className="nav-icons" />
              </a>
              <a href="">
                <AiOutlineUserAdd className="nav-icons" />
              </a>
            </ul>
          </div>
        </header>

        <main className="container">
          <div className="container-wrapper">
            <section className="container-filters">
              <div className="container-header"></div>
              <div className="container-body">
                <div className="container-list">
                  <h2>&nbsp;&nbsp;Categories to &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Include</h2>
                  <RefinementList attribute="type"
                  />
                </div>
                <div className="container-price">
                  <RangeSlider attribute="salePrice"/>
                </div>
                <div className='container-menu'>
                <HierarchicalMenu
                  attributes={[
                    'hierarchicalCategories.lvl0',
                    'hierarchicalCategories.lvl1',
                    'hierarchicalCategories.lvl2',
                    'hierarchicalCategories.lvl3',
                  ]}
                />
                </div>
                <div className="container-rating">
                <RatingMenu attribute="rating" />
                </div>

                <section className="container-free-shipping-filter">
                  <label className="free-shipping-label">
                    <input
                      type="checkbox"
                      checked={freeShipping}
                      onChange={toggleFreeShipping}
                    />
                    <span className="checkmark"></span>
                        &#160;Free Shipping Only
                  </label>
                </section>

            <Configure
              filters={freeShipping ? 'free_shipping:true' : ''}
            />
                
              </div>
            </section>
          </div>

          <section className="container-results">
            <header className="container-options">
              <select
                className="switch-view-dropdown"
                onChange={(e) => toggleViewMode(e.target.value)}
              >
                <option value="list">List View</option>
                <option value="grid">Grid View</option>
              </select>
        
              <HitsPerPage
                defaultRefinement={10}
                items={[
                  { value: 8, label: '8 per page' },
                  { value: 16, label: '16 per page', default: true},
                  { value: 24, label: '24 per page' },
                  { value: 36, label: '36 per page' },
                ]}
              />
              
              <SortBy
                items={[
                  {label: 'Relevant', value: 'ecommerce_data'},
                  {label: 'Best Seller', value: 'ecommerce_data_best_seller'},
                  {label: 'Price (asc)', value: 'ecommerce_data_price_asc'},
                  {label: 'Price (desc)', value: 'ecommerce_data_price_desc'}
                ]}
              />
          
            </header>
            <div className="stats-container">
              <Stats />
            </div>
            <div className="hits-cart-container">
              <div className="hits-container">
                <NoResultsBoundary fallback={<NoResults />}>
                  {viewMode === 'list' ? (
                    <div className="list-view">
                    <Hits hitComponent={props => <Hit {...props} addToCart={addToCart} />} />
                    </div>
                  ) : (
                    <div className="grid-view">
                      <Hits hitComponent={props => <Hit {...props} addToCart={addToCart} />} />
                    </div>
                  )}
                </NoResultsBoundary>
              </div>
              <div className="cart-container">
                <Cart cartItems={cartItems} />
              </div>
            </div>
            <div className="hits-empty-state"></div>
            <footer className="container-footer">
              <Pagination />
            </footer>
          </section>
        </main>
      </InstantSearch>
    </div>
  );
}

export default App;
