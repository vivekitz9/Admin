import axios from "axios";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "../actions/authActions";
import { baseURL } from "../../assets/BaseUrl";

export const loginUser = (formData) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const response = await axios.post(
        `${baseURL}api/v1/admin/login`,
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
