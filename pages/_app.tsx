import { useRouter } from 'next/router';
import '../styles/global.scss';
import '../styles/fonts.scss';
import SideBar from '@/components/SideBar/SideBar';
import Header from '@/components/Header/Header';

interface MyAppProps {
  Component: React.ComponentType;
  pageProps: any;
}

function App({ Component, pageProps }: MyAppProps) {
  const router = useRouter();

  const isLoginPage = router.pathname === '/login';

  const shouldRenderSidebar = !isLoginPage;

  const mainContainerClassName = shouldRenderSidebar ? 'main-container' : '';
  const contentContainerClassName = shouldRenderSidebar ? 'content-container' : '';

  return (
    <div className={mainContainerClassName}>
      {shouldRenderSidebar && <SideBar />}
      <div className={contentContainerClassName}>
        <Header />
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default App;
