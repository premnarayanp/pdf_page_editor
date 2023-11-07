import {Routes, Route} from 'react-router-dom';
import React from 'react';
import {  Home } from '../pages/index';
import  Navbar  from './Navbar';
import '../styles/app.css'

class App extends React.Component{

    render(){
    const Page404=()=>{
      return <h1>404</h1>
    };

    return (
      <div className="App">
          <Navbar />
  
          <Routes>
             <Route path="/" element={<Home />} />
             <Route path="*" element={<Page404/>} />
        </Routes>
        
      </div>
    );
  }

}
export default App;
