import React, { Component } from 'react';

import {Provider} from 'react-redux';//glue for react and redux
import {createStore,applyMiddleware} from 'redux';
import store from './store';
import Posts from './components/posts';
import PostForm from './components/postForm';
import './App.css';

// const store =createStore(()=>[],{},applyMiddleware());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
       <PostForm/>
        <Posts/>
       
      </div>
      </Provider>
    );
  }
}

export default App;
