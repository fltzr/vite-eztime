import { Outlet } from 'react-router-dom';

import { AppGlobalHeader } from './app-global-header';
import { AppInnerHeader } from './app-inner-header';
import { AppSidebar } from './app-sidebar';

import styles from './styles.module.css';

const AppLayout = () => {
  
  return (
    <div className='bg-black h-full overflow-hidden relative z-0'>
      <AppGlobalHeader />
      <div className={`flex items-stretch mx-2 mb-2 mt-[60px] dark:bg-black ${styles['app-wrapper']}`}>
        <AppSidebar />
        <main className='flex-grow h-full overflow-auto bg-[#202123] rounded-r-lg'>
          <AppInnerHeader />
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export const Component = AppLayout;