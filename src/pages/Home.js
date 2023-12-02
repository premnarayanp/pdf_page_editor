import '../styles/home.css';
import React, { useEffect } from 'react';
import { getPdfPosts} from '../api/index';
import {PdfBox ,PdfVersionBox} from '../components/index';
import {addPdfVersionList,addPdfDetail} from '../actions/pdfVersionActionCreator';
import {addPdfList} from '../actions/pdfActionCreator'
import { connect } from 'react-redux';

function Home(props){
  const {dispatch}=props;
  useEffect(()=>{

    async function fetchData(){
      const response=await getPdfPosts();
      if(response.success && response.data.pdfList[0]){
       dispatch(addPdfDetail(response.data.pdfList[0]));
       dispatch(addPdfList(response.data.pdfList));
       dispatch(addPdfVersionList(response.data.pdfList[0].pdfVersionList));
      }
    }
    fetchData();

  },);

    return (
      <div className="Home">
        <PdfBox/>
        <PdfVersionBox/>
      </div>
    );
}
//export default Home

//==============================connect=================================
function mapStateToProps(state){
  return{
  }
}
const connectedHomeComponent=connect(mapStateToProps)(Home);
export default connectedHomeComponent;