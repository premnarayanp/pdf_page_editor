import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import {createStore,applyMiddleware} from 'redux'; 
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import './styles/index.css';
import { App } from './components';
import {setUserFromToken} from'./actions/authActionCreator';

//logger function 
const logger=({dispatch,getState})=>(next)=>(action)=>{
      //middleware code
      //console.log("ACTION_TYPE=",action.type);
      next(action);
    }

const store=createStore(rootReducer,applyMiddleware(logger,thunk));
console.log("STORE=",store);


export const StoreContext = createContext();
class Provider extends React.Component {
  render() {
    const { store} = this.props;
    setUserFromToken(store.dispatch);
    return (
      <StoreContext.Provider value={store}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
        <Router> 
          <Provider store={store}>
            <App  store={store}/>
          </Provider>,
        </Router>
    </ToastProvider>
  </React.StrictMode>
);

