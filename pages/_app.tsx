import { useRouter } from 'next/router';
import '../styles/global.scss';
import '../styles/fonts.scss';
import SideBar from '@/components/SideBar/SideBar';

interface MyAppProps {
  Component: React.ComponentType;
  pageProps: any;
}

function App({ Component, pageProps }: MyAppProps) {
  const router = useRouter();

  const isLoginPage = router.pathname === '/login';

  const shouldRenderSidebar = !isLoginPage;

  const containerClassName = shouldRenderSidebar ? 'main-container' : '';

  return (
    <div className={containerClassName}>
      {shouldRenderSidebar && <SideBar />}
      <Component {...pageProps} />
    </div>
  );
}

export default App;
