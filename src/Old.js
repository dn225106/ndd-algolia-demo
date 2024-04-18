import logo from './logo.svg';
import './App.css';
import React, {} from "react";
import {RangeSlider} from './RangeSlider';

import {FiHeart} from 'react-icons/fi'
import {AiOutlineShoppingCart, AiOutlineUserAdd} from 'react-icons/ai';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Highlight, Configure,Stats, SortBy, Pagination, RefinementList } from 'react-instantsearch';
import Navigation from './Navigation/Nav';

import 'instantsearch.css/themes/satellite.css';

const searchClient = algoliasearch('WQ2TRBB6QR', '8f8237e02a64b0f28b86d2a1116a3c74');

function Hit({ hit }) {
  return (
    <article>
      <img src={hit.image} width="100" height="100"/>
      <h1>
        <Highlight attribute="name" hit={hit}/>
      </h1>
      <p>{hit.salePrice}</p>
    <p>{hit.shortDescription}</p>
      
      {/*}
      <img src={hit.image} alt={hit.name} />
      <p>{hit.categories[0]}</p>
      <h1>{hit.name}</h1>
      <p>${hit.price}</p>
  */}
    </article>
  );
}




function App() {
  return (

    <div className="content">
    <InstantSearch searchClient={searchClient} indexName="ecommerce_data">
        <div className='additional-buttons'>
    <a href="#">
      <FiHeart className="nav-icons" />
    </a>
    <a href="">
      <AiOutlineShoppingCart className="nav-icons" />
    </a>
    <a href="">
      <AiOutlineUserAdd className="nav-icons" />
    </a>
    </div>
    <header class="header" id="header">
      
    <p class="header-title"> Get the best deals</p>

    <div data-widget="searchbox">
    <SearchBox />
        
    </div>



</header>

<section class="container-results">
    <header class="container-options">
    <Stats/>
      <SortBy
        items={[
          {label: 'Relevant', value: 'ecommerce_data'},
          {label: 'Best Seller', value: 'ecommerce_data_best_seller'},
          {label: 'Price (asc)', value: 'ecommerce_data_price_asc'},
          {label: 'Price (desc)', value: 'ecommerce_data_price_desc'}
        ]}
      />
    
    
    </header>

    <div data-widget="hits"></div>
    <div class="hits-empty-state"></div>
    <footer class="container-footer"></footer>
</section>


    <Configure 
        analytics={false} 
        hitsPerPage={40}
      />
      <>
      <section className="sidebar">
        <div className="logo-container">
          <h1>🛒</h1>
        </div>
        <RefinementList attribute="type"/>
      <RangeSlider attribute="salePrice"/>
      </section>
    </>
    <nav>
  <div className="nav-container">
  </div>
  <div className="profile-container">

  </div>
</nav>

        <div className='items'>
      <Hits hitComponent={Hit} />
      </div>
      <div className='pagination'>
        <Pagination 
        />
      </div>
    </InstantSearch>
    </div>
  );
}


export default App;

