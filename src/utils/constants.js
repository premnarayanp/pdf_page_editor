 const API_ROOT = 'http://localhost:8398';
//const API_ROOT = 'https://pdf-page-extractor.onrender.com';

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
  createNewPdf: () => `${API_ROOT}/pdf_version/create`,
  editNewPdf: () => `${API_ROOT}/pdf_version/edit`,
  loadNewPdf: (pdfVersion_id) => `${API_ROOT}/pdf_version/loads/${pdfVersion_id}`,
  deleteNewPdf: (pdfVersion_id) => `${API_ROOT}/pdf_version/delete/${pdfVersion_id}`,
  downloadNewPdf: (pdfVersion_id) => `${API_ROOT}/pdf_version/downloads/${pdfVersion_id}`,
  pdfVersionPosts: (pdf_id) => `${API_ROOT}/pdf_version/posts/${pdf_id}`,
};

export const LOCAL_STORAGE_TOKEN_KEY = '__myPdf_extractor_token__';
