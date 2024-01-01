import{ useState} from "react";
import { PdfUploader,Pdf } from "./index";
import '../styles/pdfBox.css'
import  {showSelectedPdf} from '../actions/pdfActionCreator'
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

//left sidebar
  function PdfBox(props){
   const[selectedPdfFile ,setSelectedPdfFile]=useState("");
   const {dispatch,pdf}=props;
   const {isShowSelectedPdf,pdfList}=pdf;
   const { addToast } = useToasts();

 const  handlePdfSelect =(e)=>{
    if(e.target.files[0].type==="application/pdf"){
       setSelectedPdfFile(e.target.files[0]);
       dispatch(showSelectedPdf(true));
   }else{
      addToast('Please select only pdf file, You could not upload non-pdf file', {
      appearance: 'error',
      });
    }
  }
     
    return(
        <div className="PdfBox">
             <div className="pdfBoxHeader">
               <span>My Pdf </span>

               <div className="pdfInputSelector">
                 <label htmlFor="selectMediaInput">
                   <div><span>+</span></div>
                 </label>
                 <input id="selectMediaInput" className="mediaBtn" type="file"   
                    onChange={(e)=>handlePdfSelect(e)}
                 />
                </div>
            </div>

            <div className="pdfBoxMain">
              {pdfList.map((pdfFile,index) => (
                   <Pdf 
                     pdfFile={pdfFile} dispatch={dispatch}
                     key={`pdfFile-${index}`}
                   />
              ))}

              {pdfList.length===0 &&
                    <h1>Nothing PDF Please upload..</h1> 
              }

              {isShowSelectedPdf &&
                     <PdfUploader  dispatch={dispatch} selectedPdfFile={selectedPdfFile}/>
              }
            </div>
           
        </div>
    )
}

//====================way-1 connect() to get/subscribe store/state================
function mapStateToProps(state){
  return{
   pdf:state.pdf
  }
}
const connectedPdfBoxComponent=connect(mapStateToProps)(PdfBox);
export default connectedPdfBoxComponent;


//===============way-2 PdfBoxWrapper to get store/state===================
// class PdfBoxWrapper extends Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <PdfBox store={store} pdf={this.props.pdf} />}
//       </StoreContext.Consumer>
//     );
//   }
// }
//export default PdfBoxWrapper;