import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Utensils } from 'lucide-react'; // Lucide icon
import { useAppContext } from '../../context/AppContext'; // context path adjust karna ho to karo
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';

const AdminLayout = () => {
    const [providers, setProviders] = useState([]);
    const [orders, setOrders] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const { navigate, axios } = useAppContext();
    const admin = { name: "Admin" };

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/admin/logout');
            if (data.success) {
                toast.success(data.message);
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        const initialProviders = [
            { id: 1, name: "Rajesh Kumar", email: "rajesh@gmail.com", kitchenName: "Royal kitchen", status: "pending" },
            { id: 2, name: "Priya Sharma", email: "priya.sharma@yahoo.com", kitchenName: "Cloud kitchen", status: "approved" },
            { id: 3, name: "Mohammed Ali", email: "mohammed.ali@hotmail.com", kitchenName: "Brij ki rashoi", status: "pending" },
            { id: 4, name: "Sunita Devi", email: "sunita.devi@gmail.com", kitchenName: "Maa ki rashoi", status: "rejected" },
            { id: 5, name: "Amit Patel", email: "amit.patel@gmail.com", kitchenName: "cloud kitchen ", status: "approved" },
            { id: 6, name: "Neha Gupta", email: "neha.gupta@outlook.com", kitchenName: "Royal kitchen", status: "pending" },
        ];
        setProviders(initialProviders);

        const initialOrders = [
            { id: "ORD001", customer: "Rahul Singh", provider: "Priya Sharma", amount: 450 },
            { id: "ORD002", customer: "Anita Joshi", provider: "Amit Patel", amount: 380 },
            { id: "ORD003", customer: "Vikram Mehta", provider: "Priya Sharma", amount: 520 },
            { id: "ORD004", customer: "Pooja Agarwal", provider: "Amit Patel", amount: 340 },
            { id: "ORD005", customer: "Suresh Yadav", provider: "Priya Sharma", amount: 480 },
            { id: "ORD006", customer: "Kavita Desai", provider: "Amit Patel", amount: 420 },
            { id: "ORD007", customer: "Manoj Kumar", provider: "Priya Sharma", amount: 390 },
            { id: "ORD008", customer: "Deepika Chopra", provider: "Amit Patel", amount: 460 },
        ];
        setOrders(initialOrders);
    }, []);

    const updateProviderStatus = (id, status) => {
        const updated = providers.map((p) =>
            p.id === id ? { ...p, status } : p
        );
        setProviders(updated);
    };

    const approvedProviders = providers.filter(p => p.status === 'approved').length;
    const totalRevenue = orders.reduce((acc, order) => acc + Math.round(order.amount * 0.02), 0);

    return (
        <div className="min-h-screen  text-gray-800 pb-10">

            {/* Top Navbar */}
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
                <Link to="/">
                    <div className="flex items-center gap-2 text-2xl font-bold">
                        <Utensils className="w-8 h-8 text-primary" />
                        <p className="hidden sm:block">TiffinDelight Admin</p>
                    </div>
                </Link>

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
                            <li className="px-4 py-2 text-primary font-semibold">{admin.name.toUpperCase()}</li>
                            <li
                                onClick={logout}
                                className="px-4 py-2 hover:bg-primary/10 cursor-pointer"
                            >
                                Logout
                            </li>
                        </ul>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4 space-y-8">
                {/* Dashboard Overview */}
                <div className="bg-white/90 backdrop-blur rounded-xl shadow-lg p-6 border-1 border-primary mt-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white/50 border border-white/30 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold">{providers.length}</div>
                            <div className="text-sm text-gray-600 uppercase tracking-wide">Total Providers</div>
                        </div>
                        <div className="bg-white/50 border border-white/30 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold">{approvedProviders}</div>
                            <div className="text-sm text-gray-600 uppercase tracking-wide">Approved</div>
                        </div>
                        <div className="bg-white/50 border border-white/30 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold">{orders.length}</div>
                            <div className="text-sm text-gray-600 uppercase tracking-wide">Total Orders</div>
                        </div>
                        <div className="bg-white/50 border border-white/30 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-green-600">₹{totalRevenue}</div>
                            <div className="text-sm text-gray-600 uppercase tracking-wide">Commission Earned</div>
                        </div>
                    </div>
                </div>
                {/* Providers Table */}
                <div className="bg-white/90 backdrop-blur rounded-xl shadow-lg p-6 border-1 border-primary">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4 relative">
                        👥 Providers Management
                        <span className="absolute bottom-0 left-0 w-16 h-1 bg-primary rounded"></span>
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg">
                            <thead>
                                <tr className="bg-primary text-white text-sm uppercase">
                                    <th className="px-4 py-3 text-left">Name</th>
                                    <th className="px-4 py-3 text-left">Email</th>
                                    <th className="px-4 py-3 text-left">KitchenName</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                    <th className="px-4 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {providers.map((provider) => (
                                    <tr key={provider.id} className="">
                                        <td className="px-4 py-2">{provider.name}</td>
                                        <td className="px-4 py-2">{provider.email}</td>
                                        <td className="px-4 py-2">{provider.kitchenName}</td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${provider.status === 'approved'
                                                    ? 'bg-green-100 text-green-700'
                                                    : provider.status === 'rejected'
                                                        ? 'bg-red-100 text-red-600'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                    }`}
                                            >
                                                {provider.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 space-x-2">
                                            <button
                                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold cursor-pointer"
                                                onClick={() => updateProviderStatus(provider.id, 'approved')}
                                                disabled={provider.status === 'approved'}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold cursor-pointer"
                                                onClick={() => updateProviderStatus(provider.id, 'rejected')}
                                                disabled={provider.status === 'rejected'}
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Orders Table */}
                <div className="bg-white/90 backdrop-blur rounded-xl shadow-lg p-6 border-1 border-primary">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4 relative">
                        📋 Orders Management
                        <span className="absolute bottom-0 left-0 w-16 h-1 bg-primary rounded"></span>
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg">
                            <thead>
                                <tr className="bg-primary text-white text-sm uppercase">
                                    <th className="px-4 py-3 text-left">Order ID</th>
                                    <th className="px-4 py-3 text-left">Customer</th>
                                    <th className="px-4 py-3 text-left">Provider</th>
                                    <th className="px-4 py-3 text-left">Amount</th>
                                    <th className="px-4 py-3 text-left">Commission (2%)</th>
                                    <th className="px-4 py-3 text-left">Provider Earning</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => {
                                    const commission = Math.round(order.amount * 0.02);
                                    const providerEarning = commission;
                                    return (
                                        <tr key={order.id} className="">
                                            <td className="px-4 py-2">{order.id}</td>
                                            <td className="px-4 py-2">{order.customer}</td>
                                            <td className="px-4 py-2">{order.provider}</td>
                                            <td className="px-4 py-2 text-green-600">₹{order.amount}</td>
                                            <td className="px-4 py-2 text-green-600">₹{commission}</td>
                                            <td className="px-4 py-2 text-green-600">₹{providerEarning}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
