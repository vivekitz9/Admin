import { RouterProvider } from "react-router-dom";
import router from "./Routes";

const App = () => {
  return (
    <>
      {/* <AuthPage /> */}
      {/* <Home /> */}
      <RouterProvider router={router} />
    </>
  );
};
export default App;
