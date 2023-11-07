import {  
         ADD_PDF_LIST,
         ADD_PDF_TO_LIST, 
         DELETE_PDF_TO_LIST,
         SHOW_SELECTED_PDF,
        } from "./actionType"


 //action creator for  PDFs file 
 export function addPdfList(pdfList){
    return{
         type:ADD_PDF_LIST,
         pdfList
     }
 }
 
export function addPdfToList(pdfFile){
    return{
         type:ADD_PDF_TO_LIST,
         pdfFile
     }
 }

 export function deletePdfToList(pdfFile){
    return{
         type:DELETE_PDF_TO_LIST,
         pdfFile
     }
 }

 export function showSelectedPdf(val){
    return{
         type:SHOW_SELECTED_PDF,
         val:val
     }
 }


