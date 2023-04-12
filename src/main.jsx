import React from 'react'
import ReactDOM from 'react-dom/client'
import { UseWalletProvider } from "use-wallet2";
import { ToastContainer } from "react-toastify";
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
    <UseWalletProvider autoConnect={true}>
		<App />
    <ToastContainer newestOnTop={true} />
      </UseWalletProvider>
	</React.StrictMode>
)