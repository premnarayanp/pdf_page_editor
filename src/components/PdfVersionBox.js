import {loadPdf} from '../api/axios';
import {createNewPdf,editPdfVersion} from '../api/index';
import {PdfVersionList,PdfVersionEditor} from './index'

import {addPdfVersionToList,showPdfVersionEditor,addPdfVersion,addPdfPageList,add_UpdateEditMode,updatePdfVersionListItem} from '../actions/pdfVersionActionCreator'
import '../styles/pdfVersionBox.css';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import * as PDFJS from 'pdfjs-dist';
import * as PDFJSWorker from "pdfjs-dist/build/pdf.worker";
//import { getDocument } from 'pdfjs-dist';


//Right Side Bar
function PdfVersionBox(props){

  const {dispatch,isShowPdfVersionEditor,currentPdfVersion,pdfDetail,pdfVersionList,isPdfPageListLoaded,isEditModeOn}=props;
  const {addToast}=useToasts();

  //convert pdf page to image for custom pdf rendering
  const convertPdfToImagesAndRender = async (data) => {
    PDFJS.GlobalWorkerOptions.workerSrc = PDFJSWorker;
   
    // const pdfPageList = [];
    // const pdf = await PDFJS.getDocument(data).promise;
    // const canvas = document.createElement("canvas");
    // for (let i = 0; i < pdf.numPages; i++) {
    //   const page = await pdf.getPage(i + 1);
    //   const viewport = page.getViewport({ scale: 1 });
    //   const context = canvas.getContext("2d");
    //   canvas.height = viewport.height;
    //   canvas.width = viewport.width;
    //   await page.render({ canvasContext: context, viewport: viewport }).promise;
    //   pdfPageList.push(canvas.toDataURL());
    //-------------------------------------------------------

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
    console.log("===========imagesList============",imagesList);
    dispatch(addPdfPageList(imagesList));
    dispatch(addPdfVersion({pageList:[],pdf_id:pdfDetail._id}));
    dispatch(showPdfVersionEditor(true));
  }



  const handleCreateNewPdfVersion=async ()=>{
    //same pdf load  from server only one time
    //if pdfPageList already then don,t  need to load again and ain for same pdf
    //But When i want to work on another pdf so when i click version (in Pdf component) to show all version of my current pdf on that time i set pdf pdfPageList=[] so length will we 0 so i load it, 
    //pdfPageList=[] represent you need to load pdf because you are working on new pdf which not loaded, but length>0 mens i want create new version of same pdf which already loaded
    
    if(!currentPdfVersion){
      const response= await loadPdf(pdfDetail._id);
      if(response.success){

        convertPdfToImagesAndRender(response.data);
        //  const pdfPageList= convertPdfToImages(response.data);
        //  dispatch(addPdfPageList(pdfPageList));
        //  dispatch(addPdfVersion({pageList:[],pdf_id:pdfDetail._id}));
        //  dispatch(showPdfVersionEditor(true));
      }
    }else{
      //if already  pdfPageList then just open editor and update pdfVersion pageList=[],
         dispatch(addPdfVersion({pageList:[],pdf_id:pdfDetail._id}));
         dispatch(showPdfVersionEditor(true));
    }
  }

  const closeEditor=()=>{
    dispatch(showPdfVersionEditor(false));
    dispatch(add_UpdateEditMode(false));
  }

//create new pdf version on server /create new pdf
  const  finalCreateNewPdfVersion =async()=>{
    const response= await createNewPdf({pageList:currentPdfVersion.pageList},currentPdfVersion.pdf_id);
    if(response.success){
     // console.log("===================pdfVersion==============",response.data)
      dispatch(addPdfVersionToList(response.data));
      dispatch(showPdfVersionEditor(false));

      addToast('PdfVersion Successfully Uploaded', {
        appearance: 'success',
      });
    }else{
      addToast(response.message, {
      appearance: 'error',
      });
    }
  }


  //update pdf version on server 
  const updatePdfVersion =async()=>{
    const response= await editPdfVersion({pageList:currentPdfVersion.pageList,pdfVersion_id:currentPdfVersion._id});
    if(response.success){
      dispatch(add_UpdateEditMode(false));
      dispatch(showPdfVersionEditor(false));
      dispatch(updatePdfVersionListItem(response.data));

      addToast('PdfVersion Successfully Updated', {
        appearance: 'success',
      });
    }else{
      addToast(response.message, {
      appearance: 'error',
      });
    }
  }

    return(
          <div className="PdfVersionBox">
            {
              pdfDetail &&
              <header className="pdfVersionBoxHeader">
              <div className='roundedImageContainer'>
              <img src={require('../assets/pdf_thumbnail_2.png')} alt="pdf-pic" />
              </div>

              <span className="pdfName">Name:- {pdfDetail && pdfDetail.originalname}</span>
              <span className="pdfName">Total Version:- {pdfVersionList && pdfVersionList.length}</span>
              {
                isShowPdfVersionEditor? 
                <div>
                   <button className="closeBtn" onClick={()=>closeEditor()}>Cancel</button>
                   {
                    isEditModeOn?<button className="update_btn" onClick={()=>updatePdfVersion()} >Update</button>
                    :<button className="final_doneBtn" onClick={()=>finalCreateNewPdfVersion()} >Upload</button>
                   }
                </div>
                :<button className="createNewBtn" onClick={()=>handleCreateNewPdfVersion()}>Create New</button>
              }
            </header>
            }

            {isShowPdfVersionEditor?
                     <PdfVersionEditor/>
                    :<PdfVersionList isPdfPageListLoaded={isPdfPageListLoaded} dispatch={dispatch} pdfVersionList={pdfVersionList} />
              }
            
          </div>

    ) 
}

function mapStateToProps(state){
  const pdfVersion=state.pdfVersion;
  return{
    currentPdfVersion:pdfVersion.currentPdfVersion,
    pdfDetail:pdfVersion.pdfDetail,
    isShowPdfVersionEditor:pdfVersion.isShowPdfVersionEditor,
    pdfVersionList:pdfVersion.pdfVersionList,
    isPdfPageListLoaded:pdfVersion.isPdfPageListLoaded,
    isEditModeOn:pdfVersion.isEditModeOn,
  }
}
const connectedPdfVersionBoxComponent=connect(mapStateToProps)(PdfVersionBox);
export default connectedPdfVersionBoxComponent;