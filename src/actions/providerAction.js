import axios from 'axios';
import { GET_ERRORS } from './types';
import { SET_CURRENT_USER } from './types';
import { GET_SELLER_PROFILE } from './types';
import { SET_SELLER } from './types';

// Register User
export const registerSeller = (chefData, history) => dispatch => {
	axios
		.post('http://127.0.0.1:8000/api/sellers', chefData)
		.then(res => {
			console.log(res);

			axios
				.get('http://127.0.0.1:8000/api/sellers')
				.then(res => {
					dispatch(setUser("abc"), {
						type: SET_SELLER,
            payload: res.status,
            
          });
          window.location.href = '/profile';
				})
				.catch(err => console.log(err));
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};
export const setUser = (chefData, history) => dispatch => {
  axios
  .get("http://127.0.0.1:8000/api/user")
  .then(res => {
    dispatch(setCurrentUser(res.data));
    localStorage.setItem("data", JSON.stringify(res.data));
   
  })
  .catch(err => console.log(err));
};
export const setCurrentUser = decoded => {
	console.log(decoded);
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};

export const getSellerProfile = () => dispatch => {
	console.log('getchef');
	axios
		.get('http://127.0.0.1:8000/api/sellers')
		.then(res =>
			dispatch({
				type: GET_SELLER_PROFILE,
				payload: res.data.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_SELLER_PROFILE,
				payload: null,
			})
		);
};
