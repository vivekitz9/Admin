import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react"; // Persist
import { persistStore } from "redux-persist"; // Persist

const root = ReactDOM.createRoot(document.getElementById("root"));

let persistor = persistStore(store); //Persist

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    <Toaster />
  </React.StrictMode>
);
