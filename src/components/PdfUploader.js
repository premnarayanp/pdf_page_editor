import '../styles/pdfUploader.css';
import  {showSelectedPdf,addPdfToList} from '../actions/pdfActionCreator'
import {uploadPdf} from '../api/axios';
import { useToasts } from 'react-toast-notifications';
 
function PdfUploader(props){
  const {dispatch, selectedPdfFile}=props;
  const { addToast } = useToasts();

  const closePdfPost=()=>{
     dispatch(showSelectedPdf(false));
  }

 const  uploadPdfPost=async()=>{
    const response= await uploadPdf(selectedPdfFile);
    //console.log("pdf-response",response);
    if(response.success){
       dispatch(showSelectedPdf(false));
       dispatch(addPdfToList(response.data));
       
       addToast('Pdf Successfully Uploaded', {
         appearance: 'success',
       });
     }else{
       addToast(response.message, {
       appearance: 'error',
       });
     }
  }
    return(
        <div className="PdfUploader">
             <img src={require('../assets/pdf_thumbnail_2.png')} alt="PDF_Image"/>
             <div className="pdfTitle">
               <span>{selectedPdfFile.name}</span>
             </div>
             <button className="closeUploaderBtn" onClick={()=>closePdfPost()}> close</button>
             <button className="sendPdfBtn" onClick={()=>uploadPdfPost()}> send</button>
            
        </div>
    )
}
export default PdfUploader;