// export const LOGIN_REQUEST = 'LOGIN_REQUEST';

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

// Direct set action to state without middleware
// export const loginUser = (formData) => ({
//   type: LOGIN_REQUEST,
//   payload: formData,  // { email, password }
// });

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});
