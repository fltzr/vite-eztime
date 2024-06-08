import { Link } from 'react-router-dom';

export const AppGlobalHeader = () => {
  return (
    <header className='h-[60px] fixed top-0 w-full z-[1px]'>
      <div className='flex relative'>
        <div className='flex-grow-0 flex-shrink justify-start overflow-hidden'>
          <Link className="flex items-center gap-2 font-semibold lg:hidden" to="/">
            <span className="">Ez time</span>
          </Link>
        </div>

        <div className='items-center flex-grow justify-end p-0 m-0 relative z-[1px]'></div>

        <div className='flex-grow-0 flex-shrink justify-end overflow-hidden relative'>
          User
        </div>
      </div>
    </header>
  );
}