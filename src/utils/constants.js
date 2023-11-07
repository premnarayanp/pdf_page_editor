const API_ROOT = 'http://localhost:8398';

export const API_URLS = {
  //API URL for User
  login: () => `${API_ROOT}/users/login`,
  signup: () => `${API_ROOT}/users/signup`,

  //API URL for original pdf
  uploadPdf: () => `${API_ROOT}/pdf/uploads`,
  pdfPosts: () => `${API_ROOT}/pdf/posts`,
  loadPdf: (pdf_id) =>`${API_ROOT}/pdf/loads/${pdf_id}`,
  downloadPdf:(pdf_id) =>`${API_ROOT}/pdf/downloads/${pdf_id}`,
  deletePdf:(pdf_id) =>`${API_ROOT}/pdf/delete/${pdf_id}`,

  //API URL for original pdf versions(new pdf which edited)
  createNewPdf: () => `${API_ROOT}/new_pdf/create`,
  editNewPdf: () => `${API_ROOT}/new_pdf/edit`,
  loadNewPdf: (pdf_id) => `${API_ROOT}/new_pdf/loads/${pdf_id}`,
  deleteNewPdf: (pdf_id) => `${API_ROOT}/new_pdf/delete/${pdf_id}`,
  downloadNewPdf: (pdf_id) => `${API_ROOT}/new_pdf/downloads/${pdf_id}`,
};

export const LOCAL_STORAGE_TOKEN_KEY = '__myPdf_extractor_token__';
