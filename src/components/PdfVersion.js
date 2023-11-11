//import { useToasts } from 'react-toast-notifications';
import  '../styles/pdfVersion.css';
import {deletePdfVersion} from '../api/index';
import {deletePdfVersionToList} from '../actions/pdfVersionActionCreator';

const PdfVersion = (props) => {
const pdfVersion=props.pdfVersion;

const handleDeletePdPdfVersion=async(pdfVersion_id)=>{
  const response= await deletePdfVersion(pdfVersion_id);
  if(response.success){
    //console.log("=====pdfVersion==========",response.data)
    props.store.dispatch(deletePdfVersionToList(response.data.pdfVersion));

  }
}

  return (
    <div className="PdfVersion">
             <img src={require('../assets/pdf_thumbnail_2.png')} alt="PDF_Image"/>
             <div className="pdfTitle">
               <span>{pdfVersion.name}</span>
             </div>

             <div id="pdfAction">
               <button className="downloadBtn" onClick={()=>this.downloadPdfVersion()}> download</button>
               <button className="openBtn" onClick={()=>this.openPdfPdfVersion()}> open</button>
               <button className="deleteBtn" onClick={()=>handleDeletePdPdfVersion(pdfVersion._id)}>delete</button>
               <button className="createNewBtn" onClick={()=>this.editPdfVersion(pdfVersion._id)}>Edit</button>
             </div>
        </div>
  );
};

export default PdfVersion;
