import {  
    ADD_PDF_VERSION_LIST,
    ADD_PDF_VERSION_TO_LIST, 
    DELETE_PDF_VERSION_TO_LIST,
    SHOW_PDF_VERSION_EDITOR,
   } from "./actionType"


//action creator for  PDFs file 
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


