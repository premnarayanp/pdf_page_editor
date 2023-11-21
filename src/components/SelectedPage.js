import  '../styles/selectedPage.css';
import {deletePageNumInPdfVersion} from '../actions/pdfVersionActionCreator'

const SelectedPage = (props) => {

  async function  handleRemovePage(){
    const inputCheckBoxRef=props.inputCheckBoxRef;
    const pageNumber=props.pageNumber;
    inputCheckBoxRef.current[pageNumber-1].checked=false;
     props.dispatch(deletePageNumInPdfVersion(pageNumber));

    //  //console.log("===========inputCheckBoxRef================",inputCheckBoxRef.current[pageNumber-1]);
    //  //console.log("===inputCheckBoxRef[pageNumber].checked====", inputCheckBoxRef.current[pageNumber].checked);
    
    //  // When checkbox value unchecked,then after i delete the page, Otherwise page deleted but checkbox not unchecked,Because 
    //  props.store.dispatch(deletePageNumInPdfVersion(pageNumber));
    //   setTimeout(()=>{
    //     inputCheckBoxRef.current[pageNumber-1].checked=false;
    //   },100);
     }



  return (
    <div className="SelectedPage">
        <div className='pdfOrPageOfPdf'>
        <img src={require('../assets/pdf_thumbnail_2.png')} alt="PDF_Image"/>
      </div>
      <div className='pageAction'>
        <span> Page Number:{props.pageNumber}</span>
        <button className='removePageBtn' onClick={handleRemovePage}>
          <img src={require('../assets/crossbtn.png')} alt='cut'/>
        </button>
      </div>
      {
        console.log("===================SelectedPage Rendered=====================")
      }
    </div>
  );
};

export default SelectedPage;