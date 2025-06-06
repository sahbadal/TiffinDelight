import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext.jsx";
import { assets } from "../../assets/assets.js";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Utensils } from "lucide-react";
import toast from "react-hot-toast";

const ProviderLayout = () => {
    const { axios, navigate, setUser, setIsProvider, provider } = useAppContext();
    const [showDropdown, setShowDropdown] = useState(false);

    const sidebarLinks = [
        { name: "Add Product", path: "/provider", icon: assets.add_icon },
        { name: "Meal List", path: "/provider/meal-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/provider/orders", icon: assets.order_icon },
    ];

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/provider/logout');
            if (data.success) {
                setUser(null);
                setIsProvider(false);
                toast.success(data.message);
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.response);
            toast.error(error.message);
        }
    }

    return (
        <>
            {/* Top Navbar */}
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white relative">
                <Link to="/">
                    <div className='flex items-center gap-2 text-2xl font-bold'>
                        <Utensils className="w-8 h-8 text-primary" />
                        <p className="hidden sm:block">TiffinDelight</p>
                    </div>
                </Link>

                {/* Profile Dropdown */}
                {provider && (
                    <div
                        className="relative group"
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                    >
                        <img
                            src={assets.profile_icon}
                            alt="profile"
                            className="w-10 h-10 rounded-full cursor-pointer"
                        />
                        {showDropdown && (
                            <ul className="absolute top-11 right-0 bg-white shadow-lg border border-gray-200 py-2 w-32 rounded-md text-sm z-40">
                                <li className="px-4 py-2 text-primary font-semibold">{provider.name.toUpperCase()}</li>
                                <li
                                    onClick={logout}
                                    className="px-4 py-2 hover:bg-primary/10 cursor-pointer"
                                >
                                    Logout
                                </li>
                            </ul>
                        )}
                    </div>
                )}
            </div>

            {/* Sidebar + Content */}
            <div className="flex">
                <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col ">
                    {sidebarLinks.map((item) => (
                        <NavLink
                            to={item.path}
                            key={item.name}
                            end={item.path === "/provider"}
                            className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                                ${isActive
                                    ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                                    : "hover:bg-gray-100/90 border-white "
                                }`}
                        >
                            <img src={item.icon} alt="" className="w-7 h-7" />
                            <p className="md:block hidden text-center">{item.name}</p>
                        </NavLink>
                    ))}
                </div>
                <Outlet />
            </div>
        </>
    );
};

export default ProviderLayout;
