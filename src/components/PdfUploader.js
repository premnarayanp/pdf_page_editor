import{Component} from "react"
import '../styles/pdfUploader.css';
import  {showSelectedPdf,addPdfToList} from '../actions/pdfActionCreator'
import {uploadPdf} from '../api/axios';
//import { StoreContext } from '../index';

 class PdfUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      };
  }

  closePdfPost=()=>{
    this.props.dispatch(showSelectedPdf(false));
  }

  uploadPdfPost=async()=>{
    const response= await uploadPdf(this.props.selectedPdfFile);
    //console.log("pdf-response",response);
    if(response.success){
       this.props.dispatch(showSelectedPdf(false));
       this.props.dispatch(addPdfToList(response.data));
       
    }
  }

  render(){
   const {selectedPdfFile}=this.props;
    return(
        <div className="PdfUploader">
             <img src={require('../assets/pdf_thumbnail_2.png')} alt="PDF_Image"/>
             <div className="pdfTitle">
               <span>{selectedPdfFile.name}</span>
             </div>
             <button className="closeUploaderBtn" onClick={()=>this.closePdfPost()}> close</button>
             <button className="sendPdfBtn" onClick={()=>this.uploadPdfPost()}> send</button>
            
        </div>
    )
  }
}
export default PdfUploader;

// export default class PdfUploaderWrapper extends Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//            {(store) => <PdfUploader store={store} selectedPdfFile={this.props.selectedPdfFile}/>}
//       </StoreContext.Consumer>
//     );
//   }
// }