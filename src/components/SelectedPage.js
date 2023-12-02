import  '../styles/selectedPage.css';
import {deletePageNumInPdfVersion} from '../actions/pdfVersionActionCreator'

const SelectedPage = (props) => {
  const {inputCheckBoxRef,pageNumber,dispatch}=props;

  async function  handleRemovePage(){
    inputCheckBoxRef.current[pageNumber-1].checked=false;
    dispatch(deletePageNumInPdfVersion(pageNumber));
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
    </div>
  );
};

export default SelectedPage;