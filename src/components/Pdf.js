import '../styles/pdf.css';
import {deletePdfToList} from '../actions/pdfActionCreator'
import {loadPdf,downloadPdf} from '../api/axios';
import {deletePdf,getPdfVersionPosts} from '../api/index';
import {showPdfVersionEditor,addPdfVersionList,addPdfDetail,addPdfVersion,deleteAllPdfVersionData,pdfPageListLoaded,add_UpdateEditMode} from '../actions/pdfVersionActionCreator'
import { useToasts } from 'react-toast-notifications';

function Pdf(props) {
  const {pdfFile,dispatch}=props;
  const { addToast } = useToasts();

  const downloadPdfFile= async()=>{
    const response= await downloadPdf(pdfFile._id);
    if(response.success){
        //Build a URL from the file
        var file = new Blob([response.data], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        const link=document.createElement('a');
        link.href=fileURL;
        link.download="MyPdf.pdf"
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

      addToast('Pdf Successfully Downloaded', {
          appearance: 'success',
      });
    }else{
       addToast(response.message, {
       appearance: 'error',
      });
    }
  }

  const openPdfFile=async()=>{
    const response= await loadPdf(pdfFile._id);
    if(response.success){
         //Build a URL from the file
         var file = new Blob([response.data], {type: 'application/pdf'});
         const fileURL = URL.createObjectURL(file);
         window.open(fileURL);
    }
  }


 const  deletePdfFile=async()=>{
    const response= await deletePdf(pdfFile._id);
    if(response.success){
      dispatch(deletePdfToList(response.data.pdf));
      dispatch(deleteAllPdfVersionData(pdfFile._id));
      addToast('Pdf Successfully Deleted', {
        appearance: 'success',
      });
    }else{
      addToast(response.message, {
      appearance: 'error',
      });
    }
  }

  const openVersionList=async()=>{
    const response = await getPdfVersionPosts(pdfFile._id);
    if(response.success){
      //dispatch(addPdfPageList([]));//erase previous pdfPageList,and after new pdfPageList will we added when i click "create new "  inside pdfVersionBox in header
      dispatch(addPdfDetail(pdfFile));
      dispatch(addPdfVersionList(response.data.pdfVersionList));
      dispatch(showPdfVersionEditor(false));
      dispatch(addPdfVersion(null));
      dispatch(pdfPageListLoaded(false));
      dispatch(add_UpdateEditMode(false));
    }else{

    }
  }

  console.log("===================Pdf Rendered=====================")
    return(
        <div className="Pdf">
             <img src={require('../assets/pdf_thumbnail_2.png')} alt="PDF_Image"  onClick={()=>openVersionList()}/>
             <div className="pdfTitle">
               <span>{pdfFile.originalname}</span>
             </div>

             <div id="pdfAction">
               <button className="downloadBtn" onClick={()=>downloadPdfFile()}> download</button>
               <button className="openBtn" onClick={()=>openPdfFile()}> open</button>
               <button className="deleteBtn" onClick={()=>deletePdfFile(pdfFile._id)}>delete</button>
               <button className="openBtn" onClick={()=>openVersionList()}>Versions</button>
             </div>
        </div>
    )
}
export default Pdf