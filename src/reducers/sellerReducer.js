import { GET_SELLER_PROFILE } from "../actions/types";
import { SET_SELLER } from "../actions/types";


const initialState = {
  profile: "abc",
  loading: false,
  status:null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SELLER_PROFILE:
      console.log("reducer :" + action.payload);
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
      case SET_SELLER:
        console.log("reducer :" + action.payload);
        return {
          ...state,
          profile: action.payload,
          loading: false
        };
  
    default:
      return state;
  }
}
