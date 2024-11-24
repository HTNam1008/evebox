// pages/_app.js

import { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../public/styles/admin/pages/global.css';
import "@fontsource/nunito-sans"; // Defaults to weight 400
import "@fontsource/nunito-sans/400.css"; // Specify weight
import "@fontsource/nunito-sans/400-italic.css"; // Specify weight and style


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
