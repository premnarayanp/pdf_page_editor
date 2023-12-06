import '../styles/pdfUploader.css';
import  {showSelectedPdf,addPdfToList} from '../actions/pdfActionCreator'
import {uploadPdf} from '../api/axios';
import { useToasts } from 'react-toast-notifications';
import * as PDFJS from 'pdfjs-dist';
import * as PDFJSWorker from "pdfjs-dist/build/pdf.worker";
import { useEffect, useState } from 'react';

function PdfUploader(props){
  const {dispatch, selectedPdfFile}=props;
  const { addToast } = useToasts();
  const [pdfThumb,setPdfThumb]=useState("'../assets/pdf_thumbnail_2.png'");
  const [imageFile,setImageFile]=useState("'../assets/pdf_thumbnail_2.png'");

  useEffect(()=>{
    let reader = new FileReader();
      reader.onload = (e) => {
        const data = atob(e.target.result.replace(/.*base64,/, ""));
        getPdfThumbnail(data);
      };
      reader.readAsDataURL(selectedPdfFile);

  });

  const closePdfPost=()=>{
     dispatch(showSelectedPdf(false));
  }

 const  uploadPdfPost=async()=>{
    // const response= await uploadPdf(selectedPdfFile);
    
    const response= await uploadPdf({pdf:selectedPdfFile,imageFile:imageFile});
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


   //convert pdf page to image for custom pdf rendering
   const getPdfThumbnail = async (data) => {
    PDFJS.GlobalWorkerOptions.workerSrc = PDFJSWorker;
   
    const canvas = document.createElement("canvas");
    canvas.setAttribute("className", "canv");
    const pdf = await PDFJS.getDocument({ data }).promise;
    
      var page = await pdf.getPage(1);
      var viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      var render_context = {
      canvasContext: canvas.getContext("2d"),
      viewport: viewport,
    };
    await page.render(render_context).promise;
    let img = canvas.toDataURL("image/png");
    setPdfThumb(img);

    canvas.toBlob((blob)=>{
     const newImageFile = new File([blob], "pdfThumbnail.png", { type: 'image/png',});
       setImageFile(newImageFile)
       canvas.remove();
    });

    // console.log("============type=======",typeof(img));
    // console.log("============img==========",img);
    // setPdfThumb(img);
    //canvas.remove();
  
  }
    return(
        <div className="PdfUploader">
             <div className='pdfThumb'>
               <img src={pdfThumb} alt="PDF_Image"/>
             </div>
             <div className="pdfTitle">
               <span>{selectedPdfFile.name}</span>
             </div>
             <button className="closeUploaderBtn" onClick={()=>closePdfPost()}> close</button>
             <button className="sendPdfBtn" onClick={()=>uploadPdfPost()}> send</button>
            
        </div>
    )
}
export default PdfUploader;