import  '../styles/pdfVersion.css';
import {deletePdfVersion} from '../api/index';
import {loadPdfVersion,downloadPdfVersion} from '../api/axios';
import {deletePdfVersionToList} from '../actions/pdfVersionActionCreator';
import {loadPdf} from '../api/axios';
import { PDFDocument } from "pdf-lib";
import {showPdfVersionEditor,addPdfVersion,addPdfPageList,pdfPageListLoaded,addEditablePageIndexList} from '../actions/pdfVersionActionCreator'
import { useToasts } from 'react-toast-notifications';

import * as PDFJS from 'pdfjs-dist';
import * as PDFJSWorker from "pdfjs-dist/build/pdf.worker";

const PdfVersion = (props) => {
const {dispatch,pdfVersion,isPdfPageListLoaded}=props;
const { addToast } = useToasts();

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
      addToast('PdfVersion Successfully Downloaded', {
        appearance: 'success',
    });
  }else{
     addToast(response.message, {
     appearance: 'error',
    });
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
  }else{
    addToast(response.message, {
    appearance: 'error',
   });
 }
}

const handleDeletePdPdfVersion=async(pdfVersion_id)=>{
  const response= await deletePdfVersion(pdfVersion_id);
  if(response.success){
    //console.log("=====pdfVersion==========",response.data)
   dispatch(deletePdfVersionToList(response.data.pdfVersion));

    addToast('PdfVersion Successfully Deleted', {
      appearance: 'success',
    });
  }else{
   addToast(response.message, {
    appearance: 'error',
   });
  }
}

//edit pdf version
const editPdfVersion= async()=>{
  if(!isPdfPageListLoaded){
    const response= await loadPdf(pdfVersion.pdf);
    if(response.success){
      convertPdfToImagesAndRender(response.data);
    }
  }else{
      //if already  pdfPageList then just open editor and update pdfVersion pageList=[],
       dispatch(addPdfVersion(pdfVersion));
       dispatch(addEditablePageIndexList(pdfVersion.pageList,true))
       dispatch(showPdfVersionEditor(true));
  }
} 


  //convert pdf page to image for custom pdf rendering
  const convertPdfToImagesAndRender = async (data) => {
    PDFJS.GlobalWorkerOptions.workerSrc = PDFJSWorker;
   
   
    const imagesList = [];
    const canvas = document.createElement("canvas");
    canvas.setAttribute("className", "canv");
    const pdf = await PDFJS.getDocument({ data }).promise;
    for (let i = 1; i <= pdf.numPages; i++) {
      var page = await pdf.getPage(i);
      var viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      var render_context = {
      canvasContext: canvas.getContext("2d"),
      viewport: viewport,
    };
    await page.render(render_context).promise;
    let img = canvas.toDataURL("image/png");
    imagesList.push(img);
  

    }
    canvas.remove();
    //console.log("===========imagesList============",imagesList);
       dispatch(addPdfPageList(imagesList));
       dispatch(addPdfVersion(pdfVersion));
       dispatch(pdfPageListLoaded(true));
       dispatch(addEditablePageIndexList(pdfVersion.pageList,true))
       dispatch(showPdfVersionEditor(true));
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
        </div>
  );
};

export default PdfVersion;
