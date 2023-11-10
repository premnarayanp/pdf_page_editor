import { API_URLS, getFormBody, LOCAL_STORAGE_TOKEN_KEY } from '../utils';

//custom fetch methods for all api
const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = getFormBody(body);
  }

  try {
    const response = await fetch(url, config);
    console.log("url=",url,"config=",config)
    const data = await response.json();
    console.log("========data=======",data);
    if (data.success) {
      return {
        data: data.data,
        success: true,
        message:data.msg
      };
    }

    throw new Error(data.msg);
  } catch (error) {
    console.error('error');
    return {
      message: error.message,
      success: false,
    };
  }
};

 //============API for User============================
export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: 'POST',
    body: { email, password },
  });
};

export const signUp = async (name, email, password, confirmPassword) => {
  return customFetch(API_URLS.signup(), {
    method: 'POST',
    body: { name, email, password, confirmPassword: confirmPassword },
  });
};

 //==============API for original pdf=========================

export const getPdfPosts = () => {
  return customFetch(API_URLS.pdfPosts(), {
    method: 'GET',
  });
};

export const deletePdf =(pdf_id) => {
  return customFetch(API_URLS.deletePdf(pdf_id), {
    method: 'DELETE',
  });
}

//==============API URL for new pdf versions(new pdf which edited)===============
export const createNewPdf = (content,pdf_id) => {
  return customFetch(API_URLS.createNewPdf(), {
    method: 'POST',
    body: {
      pdf_id:pdf_id,
      ...content,
    },
  });
};


export const editPdfVersion = (content) => {
  return customFetch(API_URLS.editNewPdf(), {
    method: 'POST',
    body: {
      content,
    },
  });
};

export const deletePdfVersion =(pdf_id) => {
  return customFetch(API_URLS.deleteNewPdf(pdf_id), {
    method: 'DELETE',
  });
}

