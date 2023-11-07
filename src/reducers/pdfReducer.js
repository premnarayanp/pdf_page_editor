import { 
    ADD_PDF_LIST,
    ADD_PDF_TO_LIST,
    DELETE_PDF_TO_LIST, 
    SHOW_SELECTED_PDF  
   } from "../actions/actionType"


const initialPdfState={
  pdfList:[],
  isShowSelectedPdf:false
};

    export  default function pdf(state=initialPdfState,action){

        switch(action.type){
            case ADD_PDF_LIST:
            return {
                ...state,
                pdfList:action.pdfList
            }

            case ADD_PDF_TO_LIST:
            return {
                ...state,
                pdfList:[action.pdfFile, ...state.pdfList]
            }

            //i delete pdf from pdf list that  _id match 
            case DELETE_PDF_TO_LIST:
                const filteredArray=state.pdfList.filter(
                    pdfFile=>pdfFile._id!==action.pdfFile._id
                  );
                  
            return {
                ...state,
                pdfList:filteredArray
            }

            case SHOW_SELECTED_PDF:
            return {
                ...state,
                isShowSelectedPdf:action.val
            }

            default:
             return state;
        }
        
   }