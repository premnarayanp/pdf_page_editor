import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router ,HashRouter} from 'react-router-dom';

import { ToastProvider } from 'react-toast-notifications';
//import React, { createContext } from 'react';

import {createStore,applyMiddleware} from 'redux'; 
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import {setUserFromToken} from'./actions/authActionCreator';
import { App } from './components';
import './styles/index.css';

//=====================logger function==============================
const logger=({dispatch,getState})=>(next)=>(action)=>{
      //middleware code
      //console.log("ACTION_TYPE=",action.type);
      next(action);
    }

const store=createStore(rootReducer,applyMiddleware(logger,thunk));
setUserFromToken(store.dispatch);

//export const StoreContext = createContext();
//======================Customs Provider============================
//Customs Provider for redux store and state for child components
// class Provider extends React.Component {
//   render() {
//     const { store} = this.props;
//     setUserFromToken(store.dispatch);
//     return (
//       <StoreContext.Provider value={store}>
//         {this.props.children}
//       </StoreContext.Provider>
//     );
//   }
// }

//======================custom's connect function==========================
//Create custom's connect function to provide and subscribe store and state for each separate components
//So All app would not rerender, only Particular components rerender that used connect
//Calling - const ConnectedComponent=connect(callback)(Component);
//For App - const ConnectedAppComponent=connect(callback)(App);
// export function connect(callback){
//   return function(Component){
//     class ConnectedComponent extends React.Component{
//       constructor(props){
//         super(props);
//         this.props.store.unsubscribe=this.props.store.subscribe(()=>this.forceUpdate());
//       }
//       render(){
//         const {store}=this.props;
//         const state=store.getState();
//         const dataToBePassedAsProps=callback(state);
//         return(
//           <Component
//             {...dataToBePassedAsProps}
//             dispatch={store.dispatch}
//             />
//         );
//       }
//     } 

//     class ConnectedComponentWrapper extends React.Component {
//       render() {
//         return (
//           <StoreContext.Consumer>
//             {(store) => <ConnectedComponent store={store} />}
//           </StoreContext.Consumer>
//         );
//       }
//     }
//     return ConnectedComponentWrapper;
//   }
// }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
     <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
        <HashRouter basename='/'> 
          <Provider store={store}>
            <App/>
          </Provider>,
        </HashRouter>
    </ToastProvider>
  </>
);

