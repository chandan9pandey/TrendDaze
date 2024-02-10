import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ShopContextProvider from "./Context/ShopContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ShopContextProvider>
			<App />
		</ShopContextProvider>
	</StrictMode>
);
