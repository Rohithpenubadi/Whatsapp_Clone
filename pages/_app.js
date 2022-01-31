import '../styles/globals.css'
import Layout from '../components/Layout';
import { AuthProvider } from '../Auth';
import Loading from '../components/Loading';
function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
