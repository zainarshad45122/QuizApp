import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import sellerReducer from './sellerReducer';


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  seller: sellerReducer
});
