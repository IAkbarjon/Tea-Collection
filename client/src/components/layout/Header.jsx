import { Outlet, useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    const routes = [
        {
            path: 'materials',
            title: 'Материалы'
        },
        {
            path: 'products',
            title: 'Товары'
        }
    ]
    
    return (
        <div className='flex flex-col'>
            <header
                className='bg-main-secondary flex items-center justify-between self-center fixed w-full h-[60px] top-0 left-0 right-0 pl-8 pr-8 z-10'
            >
                <h2>Чайная коллекция</h2>
                <nav className='flex gap-4'>
                    {routes.map((route, idx) => (
                        <button
                            key={idx}
                            className='text-main-accent'
                            onClick={() => navigate(route.path)}
                            tabIndex={-1}
                        >{route.title}</button>
                    ))}
                </nav>
            </header>

            <div className='mt-[60px] mb-[60px]'>
                <Outlet />
            </div>
        </div>
    )
}

export default Header
