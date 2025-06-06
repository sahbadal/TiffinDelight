import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const AdminLogin = () => {

    const { isAdmin, setIsAdmin, navigate, axios } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post('/api/admin/login', {
                email,
                password
            });
            if (data.success) {
                setIsAdmin(true);
                navigate('/admin');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (isAdmin) {
            navigate('/admin');
        }
    }, [isAdmin]);

    return !isAdmin && (
        <form onSubmit={onSubmitHandler} className="min-h-screen flex items-center text-sm text-gray-600">
            <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200 bg-white'>
                <p className='text-2xl font-medium m-auto'><span className='text-primary'>Admin</span> Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder='enter your email'
                        className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
                        required
                    />
                </div>
                <div className='w-full relative'>
                    <p>Password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type={showPassword ? "text" : "password"}
                        placeholder='enter your password'
                        className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary pr-10'
                        required
                    />
                    <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-[38px] right-3 cursor-pointer text-gray-500 hover:text-primary"
                        title={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                    </div>
                </div>
                <button className='bg-primary w-full text-white py-2 rounded-md cursor-pointer'>Login</button>
            </div>
        </form>
    )
}

export default AdminLogin;
