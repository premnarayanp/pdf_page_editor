//import { useToasts } from 'react-toast-notifications';
import  '../styles/pdfVersion.css';
import {deletePdfVersion} from '../api/index';
import {loadPdfVersion,downloadPdfVersion} from '../api/axios';
import {deletePdfVersionToList} from '../actions/pdfVersionActionCreator';
import {loadPdf} from '../api/axios';
import { PDFDocument } from "pdf-lib";
import {showPdfVersionEditor,addPdfVersion,addPdfPageList,pdfPageListLoaded,addEditablePageIndexList} from '../actions/pdfVersionActionCreator'

const PdfVersion = (props) => {
const pdfVersion=props.pdfVersion;
const isPdfPageListLoaded=props.isPdfPageListLoaded;


const handleDownloadPdfVersion= async()=>{
  const response= await downloadPdfVersion(pdfVersion._id);
  if(response.success){
      //Build a URL from the file
      var file = new Blob([response.data], {type: 'application/pdf'});
      const fileURL = URL.createObjectURL(file);
      const link=document.createElement('a');
      link.href=fileURL;
      link.download="MyPdf_Versions.pdf"
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
  }
}

const handleOpenPdfVersion=async()=>{
 const response= await loadPdfVersion(pdfVersion._id);
  if(response.success){
       //Build a URL from the file
       console.log(response.data);
       var file = new Blob([response.data], {type: 'application/pdf'});
       const fileURL = URL.createObjectURL(file);
       window.open(fileURL);
  }
}



const handleDeletePdPdfVersion=async(pdfVersion_id)=>{
  const response= await deletePdfVersion(pdfVersion_id);
  if(response.success){
    //console.log("=====pdfVersion==========",response.data)
    props.dispatch(deletePdfVersionToList(response.data.pdfVersion));

  }
}


const editPdfVersion= async()=>{
  
  if(!isPdfPageListLoaded){
    const response= await loadPdf(pdfVersion.pdf);
    if(response.success){
        const pdfDoc= await PDFDocument.load(response.data);
        const pdfPageList= await pdfDoc.getPages();

       props.dispatch(addPdfPageList(pdfPageList));
       props.dispatch(addPdfVersion(pdfVersion));
       props.dispatch(pdfPageListLoaded(true));
       props.dispatch(addEditablePageIndexList(pdfVersion.pageList,true))
       props.dispatch(showPdfVersionEditor(true));
    }
  }else{
      //if already  pdfPageList then just open editor and update pdfVersion pageList=[],
       props.dispatch(addPdfVersion(pdfVersion));
       props.dispatch(addEditablePageIndexList(pdfVersion.pageList,true))
       props.dispatch(showPdfVersionEditor(true));
  }
} 
  return (
    <div className="PdfVersion">
             <img src={require('../assets/pdf_thumbnail_2.png')} alt="PDF_Image"/>
             <div className="pdfTitle">
               <span>{pdfVersion.name}</span>
             </div>

             <div id="pdfAction">
               <button className="downloadBtn" onClick={()=>handleDownloadPdfVersion()}> download</button>
               <button className="openBtn" onClick={()=>handleOpenPdfVersion()}> open</button>
               <button className="deleteBtn" onClick={()=>handleDeletePdPdfVersion(pdfVersion._id)}>delete</button>
               <button className="createNewBtn" onClick={()=>editPdfVersion(pdfVersion._id)}>Edit</button>
             </div>
             {
              console.log("===================PdfVersion Rendered=====================")
             }
        </div>
  );
};

export default PdfVersion;
