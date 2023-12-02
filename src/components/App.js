import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import {  Home ,Login,Signup } from '../pages/index';
import  Navbar  from './Navbar';
import '../styles/app.css'
import { connect } from 'react-redux';

function App(props){
   //const {auth}=this.props.store.getState();
   const {auth,dispatch}=props;
   
   const PrivateRoute = ({ children}) => {
    if (auth.user) {
        return children;
    }
    return <Navigate to="/users/login" />
  }

   const Page404=()=>{
      return <h1>404</h1>
    };
    return (
      <div className="App">
          <Navbar/>
           
          <Routes>
             <Route path="/" element={ <PrivateRoute> <Home /> </PrivateRoute>}/>
             <Route exact path="/users/login" element={<Login auth={auth} dispatch={dispatch} />} />
             <Route exact path="/users/signup" element={<Signup auth={auth} dispatch={dispatch} />} /> 
             <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    );
  }

//====================way-1 connect() to get/subscribe store/state================
function mapStateToProps(state){
  return{
   auth:state.auth
  }
}
const connectedAppComponent=connect(mapStateToProps)(App);
export default connectedAppComponent;

//===============way-2 AppWrapper to get store/state===================
// class AppWrapper extends Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }
// export default AppWrapper;