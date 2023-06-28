import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/global.scss';
import '../styles/fonts.scss';

interface MyAppProps {
  Component: React.ComponentType;
  pageProps: any;
}

function App({ Component, pageProps }: MyAppProps) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== '/login' && !localStorage.getItem('isAuth')) {
      router.replace('/login');
    }
  }, [router, router.pathname]);

  return <Component {...pageProps} />;
}

export default App;
