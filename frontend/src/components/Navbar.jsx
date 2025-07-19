import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from './../assets/assets';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const {user, setUser, navigate, setShowUserLogin, searchQuery, setSearchQuery} = useAppContext()

  const logout = async () => {
    setUser(null);
    navigate("/")
  }

  useEffect(()=>{
    if(searchQuery.length>0){
        navigate("/products");
    }
  },[searchQuery])


    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to="/" onClick={()=> {scrollTo(0,0); setOpen(false)}}>
                <img className='h-9' src={assets.logo} alt="Logo" />
            </NavLink>

            {/*---------------------Desktop Menu--------------------*/}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/products">All Products</NavLink>
                <NavLink to="/">Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img className='w-4 h-4' src={assets.search_icon} alt="search" />
                </div>

                <div 
                onClick={() => navigate('/cart')}
                className="relative cursor-pointer">
                    <img className='w-6 opacity-80' src={assets.cart_icon} alt="cart" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">3</button>
                </div>

                {
                    user ?
                    (
                        <div className='relative group'>
                            <img
                            className='w-10 h-10 rounded-full cursor-pointer'
                             src={assets.profile_icon} alt="profile" />
                            <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-40
                             rounded-md text-sm z-40'>
                                <li className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>
                                    <NavLink to="/my-orders">My Orders</NavLink>
                                </li>
                                <li className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>
                                    <button onClick={logout}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    ):(
                        <button 
                onClick={() => {
                    setShowUserLogin(true);
                }}
                className="cursor-pointer px-8 py-2 bg-primary hover:bg-secondary transition text-white rounded-full">
                    Login
                </button>
                    )
                }
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon */}
                <img src={assets.menu_icon} alt="Menu" />
            </button>

            {/*---------------------Mobile Menu--------------------*/}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-50`}>
                <NavLink to="/" onClick={()=>setOpen(false)}>Home</NavLink>
                <NavLink to="/products" onClick={()=>setOpen(false)}>All Products</NavLink>
                {
                    user && (
                        <NavLink to='my-orders' onClick={()=>setOpen(false)}>My Orders</NavLink>
                    )
                }
                <NavLink to="/" onClick={()=>setOpen(false)}>Contact</NavLink>
                {
                    user ? 
                    (
                    <button 
                    onClick={()=>{
                        logout();
                    }}
                    className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-secondary transition text-white rounded-full text-sm">
                    Logout
                    </button>
                    ):
                    (
                    <button 
                    onClick={()=> {
                        setOpen(false);
                        setShowUserLogin(true);
                    }}
                    className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-secondary transition text-white rounded-full text-sm">
                    Login
                    </button>
                    )
                }
            </div>

        </nav>
    )
}

export default Navbar