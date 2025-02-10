import axios from "axios";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "../actions/authActions";

export const loginUser = (formData) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const response = await axios.post(
        "http://shivdeeplande.com:8001/api/v1/admin/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      dispatch(loginSuccess(response.data));
    } catch (error) {
      dispatch(
        loginFailure(error.response?.data?.message || "Something went wrong!")
      );
    }
  };
};
