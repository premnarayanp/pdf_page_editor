import {  
    ADD_PDF_DETAIL,
    ADD_PDF_VERSION_LIST,
    ADD_PDF_VERSION_TO_LIST, 
    DELETE_PDF_VERSION_TO_LIST,
    SHOW_PDF_VERSION_EDITOR,
    //ADD_ORIGINAL_PDF_FILE,
    ADD_PDF_VERSION,
    ADD_PAGE_NUM_IN_VERSION,
    DELETE_PAGE_NUM_IN_VERSION,
    ADD_PDF_PAGE_LIST,
    DELETE_All_PDF_VERSION_DATA,
    IS_PDF_PAGE_LIST_LOADED,
    ADD_EDITABLE_PAGE_INDEX_LIST,
    ADD_EDIT_MODE,
    UPDATE_PDF_VERSION,
   } from "./actionType"


//action creator for  PDFs file 

export function addPdfDetail(pdfDetail){
    return{
        type:ADD_PDF_DETAIL,
        pdfDetail
    }
    }

export function addPdfVersion(pdfVersion){
    return{
        type:ADD_PDF_VERSION,
        pdfVersion
    }
    }

    export function addPageNumInPdfVersion(pageNum){
        return{
            type:ADD_PAGE_NUM_IN_VERSION,
            pageNum
        }
        }


        export function deletePageNumInPdfVersion(pageNum){
            return{
                type:DELETE_PAGE_NUM_IN_VERSION,
                pageNum
            }
            }
        
export function addPdfVersionList(pdfVersionList){
return{
    type:ADD_PDF_VERSION_LIST,
    pdfVersionList
}
}


export function addPdfVersionToList(pdfVersion){
return{
    type:ADD_PDF_VERSION_TO_LIST,
    pdfVersion
}
}

export function deletePdfVersionToList(pdfVersion){
return{
    type:DELETE_PDF_VERSION_TO_LIST,
    pdfVersion
}
}

export function showPdfVersionEditor(val){
return{
    type:SHOW_PDF_VERSION_EDITOR,
    val:val
}
}

//real page of pdf 
export function addPdfPageList(pdfPageList){
    return{
        type:ADD_PDF_PAGE_LIST,
        pdfPageList,
    }
    }

export function deleteAllPdfVersionData(pdf_id){
    return{
        type:DELETE_All_PDF_VERSION_DATA,
        pdf_id:pdf_id
    }
}

export function pdfPageListLoaded(val){
    return{
        type:IS_PDF_PAGE_LIST_LOADED,
        isPdfPageListLoaded:val
    }
}

export function addEditablePageIndexList(indexList,isEditModeOnVal){
    return{
        type:ADD_EDITABLE_PAGE_INDEX_LIST,
        editablePageIndexList:indexList,
        isEditModeOn:isEditModeOnVal
    }
}

export function add_UpdateEditMode(isEditModeOn){
    return{
        type:ADD_EDIT_MODE,
        isEditModeOn:isEditModeOn
    }
}

export function updatePdfVersionListItem(pdfVersion){
    return{
        type:UPDATE_PDF_VERSION,
        pdfVersion
    }
    }





