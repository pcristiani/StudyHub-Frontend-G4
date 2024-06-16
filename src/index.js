import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { MainPage } from './MainPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style-navbar.css';
import './css/style.css';

///
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MainPage />
);

reportWebVitals();

/*
 <header>
        <SearchBar onSearch={handleSearch} />
      </header>
      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          {/* Define rutas para otras páginas según tu aplicación 
        </Switch >
*/