import { useState } from 'react';
//import { useToasts } from 'react-toast-notifications';
import  '../styles/selectorPage.css';
import {addPdfVersion,addPageNumInPdfVersion,deletePageNumInPdfVersion} from '../actions/pdfVersionActionCreator'

const SelectorPage = (props) => {
  const[checked,setChecked]=useState(false);

  function handleInputChecked(e){
    //  console.log("=======e.target.checked=======",e);
     setChecked(e.target.checked);
    if(e.target.checked){
       props.store.dispatch(addPageNumInPdfVersion(props.pageNumber));
    }else{
      props.store.dispatch(deletePageNumInPdfVersion(props.pageNumber));
    }
  } 

  return (
    <div className="SelectorPage">
      <div className='pdfOrPageOfPdf'>
        <img src={require('../assets/pdf_thumbnail_2.png')} alt="PDF_Image"/>
      </div>
      <div className='pageAction'>
        <span> Page Number:{props.pageNumber}</span>
        <input className="pageToggle" type="checkbox" checked={checked} onChange={handleInputChecked} />
      </div>
    </div>
  );
};

export default SelectorPage;
