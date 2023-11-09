import { 
    ADD_PDF_VERSION_LIST,
    ADD_PDF_VERSION_TO_LIST,
    DELETE_PDF_VERSION_TO_LIST, 
    SHOW_PDF_VERSION_EDITOR  
   } from "../actions/actionType"


const initialPdfVersionState={
    pdfVersionList:[],
    isShowPdfVersionEditor:false
};

    export  default function pdfVersion(state=initialPdfVersionState,action){

        switch(action.type){
            case ADD_PDF_VERSION_LIST:
            return {
                ...state,
                pdfVersionList:action.pdfVersionList
            }

            case ADD_PDF_VERSION_TO_LIST:
            return {
                ...state,
                pdfVersionList:[action.pdfVersion, ...state.pdfVersionList]
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

            default:
             return state;
        }
        
   }