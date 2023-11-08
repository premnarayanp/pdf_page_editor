import axios from 'axios';
import { API_URLS,LOCAL_STORAGE_TOKEN_KEY } from '../utils';

 const customFetch = async (url, { body, ...customConfig }) => {

  const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const headers = {
    'content-type': 'multipart/form-data',
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

  const formData=new FormData();
  if (body) {
    formData.append("pdf",body.content);
    config.data=formData
  }
  
 
  try {
    console.log("url=",url);
    console.log("config=",config);
    // const response = await axios(url,{
    //     data:formData,
    //     method:'POST',
    //     headers: headers
    // });

    const response = await axios(url,config);
    const data= await response.data;
    console.log("========response=======",response);
    if(config.responseType==='arraybuffer'){
      return {
        data: data,
        success: true,
      };
    }

    if (data.success ) {
      return {
        data: data.data,
        success: true,
        message:"pdf  successfully upload"
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


export const uploadPdf = (content) => {
    return customFetch(API_URLS.uploadPdf(), {
      method: 'POST',
      body: {
        content,
      },
    });
  };

//view pdf /load from server and view on browser
   export const loadPdf =async (pdf_id) => {
      return customFetch(API_URLS.loadPdf(pdf_id), {
        method: 'GET',
        responseType:'arraybuffer'
      });
    }

    export const downloadPdf =async (pdf_id) => {
      return customFetch(API_URLS.downloadPdf(pdf_id), {
        method: 'GET',
        responseType:'arraybuffer'
      });
    }

    // export const deletePdf =async (pdf_id) => {
    //   return customFetch(API_URLS.deletePdf(pdf_id), {
    //     method: 'DELETE',
    //     headers:{
    //       'content-type': 'application/x-www-form-urlencoded',
    //     }
    //   });
    // }



//===========================================================
//Number of way to fetch data using axios
    //const response = await axios.post(url,formData,{header:header})
       
    //   const response= await axios(API_URLS.loadPdf(pdf_id), {
    //     headers:headers,
    //     responseType:'arraybuffer'
    //  })
    // 
    
    // const response = await axios(url,{
    //     data:formData,
    //     method:'POST',
    //     headers: headers
    // });

    // const data= await response.data;
    //console.log("========data=======",data);