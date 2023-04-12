import React, { lazy, Suspense } from 'react';
const Ecosystem = lazy(() => import('./pages/Ecosystem'));
const Footer = lazy(() => import('./pages/Footer'));
const Main = lazy(() => import('./pages/Main'));
import { BlockchainProvider } from "./context/index";
import "./assets/css/style.css";
import "./assets/css/custom.css";


export default function App() {
  return (
    <main>
      <BlockchainProvider>
           <Suspense fallback={<div>Loading...</div>}>
            <Main />
           </Suspense>
       
      </BlockchainProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Ecosystem />
        <Footer />
      </Suspense>
      
    </main>
  )
}
