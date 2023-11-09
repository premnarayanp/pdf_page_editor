import auth from './authReducer'
import pdf from './pdfReducer'
import pdfVersion from './pdfVersionReducer'

import {combineReducers} from 'redux';

  //using predefined redux combined reducers
  export default combineReducers({
        auth,
        pdf,
        pdfVersion
     });
  


