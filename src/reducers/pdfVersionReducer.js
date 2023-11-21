import { 
    ADD_PDF_DETAIL,
    ADD_PDF_VERSION,
    ADD_PDF_VERSION_LIST,
    ADD_PDF_VERSION_TO_LIST,
    DELETE_PDF_VERSION_TO_LIST, 
    SHOW_PDF_VERSION_EDITOR ,
    //ADD_ORIGINAL_PDF_FILE,
    ADD_PDF_PAGE_LIST,
    ADD_PAGE_NUM_IN_VERSION,
    DELETE_PAGE_NUM_IN_VERSION,
    DELETE_All_PDF_VERSION_DATA
   } from "../actions/actionType"



const initialPdfVersionState={
    currentPdfVersion:null,//pdf version is an object which has an array of pdf page order numbering value
    pdfVersionList:[],
    isShowPdfVersionEditor:false,
    pdfPageList:[],
    pdfDetail:null
};

   export  default function pdfVersion(state=initialPdfVersionState,action){

        switch(action.type){

            case ADD_PDF_DETAIL:
                return{
                ...state,
                pdfDetail:action.pdfDetail
            }

            case ADD_PDF_VERSION:
                return {
                ...state,
                currentPdfVersion:action.pdfVersion
            }

            case ADD_PDF_VERSION_LIST:
             return {
               ...state,
                pdfVersionList:action.pdfVersionList
            }

            case ADD_PDF_VERSION_TO_LIST:
             return {
                ...state,
                pdfVersionList:[...state.pdfVersionList,action.pdfVersion]
            }

            //i delete pdfVersion from pdfVersion List that  _id match 
            case DELETE_PDF_VERSION_TO_LIST:
                const filteredArray=state.pdfVersionList.filter(
                 pdfVersion=>pdfVersion._id!==action.pdfVersion._id
                );
                  
             return {
                ...state,
                pdfVersionList:filteredArray
            }

            case SHOW_PDF_VERSION_EDITOR:
             return {
                ...state,
                isShowPdfVersionEditor:action.val
            }

            case ADD_PDF_PAGE_LIST:
             return {
                ...state,
                pdfPageList:action.pdfPageList,
            }

            case ADD_PAGE_NUM_IN_VERSION:
             return {
                ...state,
                currentPdfVersion :  {...state.currentPdfVersion,pageList:[...state.currentPdfVersion.pageList,action.pageNum]},
            }

            case DELETE_PAGE_NUM_IN_VERSION:
              const filteredPageList=state.currentPdfVersion.pageList.filter(
                    pageNum=>pageNum!==action.pageNum
                );

                return {
                ...state,
                currentPdfVersion :  {...state.currentPdfVersion,pageList:filteredPageList},
            }

            //delete/erase pdfVersion all data by pdf_id match 
            case DELETE_All_PDF_VERSION_DATA:
            if(state.pdfDetail._id===action.pdf_id){
                window.alert("Your all Associated PdfVersion or current Working Version will be Deleted");
                   return {
                      currentPdfVersion:null,
                      pdfVersionList:[],
                      isShowPdfVersionEditor:false,
                      pdfPageList:[],
                      pdfDetail:null
                    }
            }else{
                return {
                    ...state,
                }
            }

            default:
             return state;
        }
        
   }