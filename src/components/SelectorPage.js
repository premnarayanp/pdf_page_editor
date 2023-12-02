import { useState} from 'react';
//import { useToasts } from 'react-toast-notifications';
import  '../styles/selectorPage.css';
import {addPageNumInPdfVersion,deletePageNumInPdfVersion} from '../actions/pdfVersionActionCreator'

const SelectorPage = (props) => {
  const[checked,setChecked]=useState(false);
  const callbackRef=props.callbackRef;

  function handleInputChecked(e){
   //console.log("=======e.target.checked=======",e);
     setChecked(e.target.checked);
    if(e.target.checked){
       props.dispatch(addPageNumInPdfVersion(props.pageNumber));
    }else{
      props.dispatch(deletePageNumInPdfVersion(props.pageNumber));
    }
  } 

  return (
    <div className="SelectorPage">
      <div className='pdfOrPageOfPdf'>
        <img src={require('../assets/pdf_thumbnail_2.png')} alt="PDF_Image"/>
      </div>
      <div className='pageAction'>
        <span> Page Number:{props.pageNumber}</span>
        <input ref={callbackRef} className="pageToggle" type="checkbox" checked={checked} onChange={handleInputChecked} />
      </div>
    </div>
  );
};

export default SelectorPage;
