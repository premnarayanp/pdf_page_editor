import {Routes, Route} from 'react-router-dom';
import React from 'react';
import {  Home ,Login,Signup } from '../pages/index';
import  Navbar  from './Navbar';
//import {setUserFromToken} from'../actions/authActionCreator';
import '../styles/app.css'
import { Navigate } from 'react-router-dom';

class App extends React.Component{

   componentDidMount(){
    const {store}=this.props;
    store.subscribe(()=>{
      console.log("Updated");
      this.forceUpdate();
    });
    // setUserFromToken(store.dispatch);
  }

    render(){
    const {store}=this.props;
    const {auth}=this.props.store.getState();
   
    const Page404=()=>{
      return <h1>404</h1>
    };


    return (
      <div className="App">
          <Navbar store={store} auth={auth}/>
          
          <Routes>
             {/* <Route path="/" element={<Home store={store}/>} /> */}
             <Route path="/" element={ auth.user?<Home store={store}/>:<Navigate to="/users/login" />}/>
             <Route exact path="/users/login" element={<Login store={store} />} />
             <Route exact path="/users/signup" element={<Signup store={store}/>} />
             <Route path="*" element={<Page404/>} />
        </Routes>
        
      </div>
    );
  }

}
export default App;


// const PrivateRoute = ({ children}) => {
//   const {auth}=this.props.store.getState();
//   if (auth.user) {
//       return children;
//     }
    
//   return <Navigate to="/users/login" />
// }

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