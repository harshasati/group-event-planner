import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '../styles/globals.css'; // Assuming your CSS file is located in the "styles" folder


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
