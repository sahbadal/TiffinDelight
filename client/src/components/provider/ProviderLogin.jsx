import React, { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const ProviderLogin = () => {
    const { setShowUserLogin, setUser, isProvider, setIsProvider, navigate, axios, setProvider } = useAppContext();

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [kitchenName, setKitchenName] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post(`/api/provider/${state}`, {
                name,
                email,
                password,
                kitchenName
            });
            if (data.success) {
                setUser(data.provider);
                setProvider(data.provider)
                setIsProvider(true);
                setShowUserLogin(false);
                navigate("/provider");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (isProvider) {
            navigate("/provider");
        }
    }, [isProvider]);

    return !isProvider && (
        <div
            onClick={() => setShowUserLogin(false)}
            className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50"
        >
            <form
                onSubmit={onSubmitHandler}
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
            >
                <p className="text-2xl font-medium m-auto">
                    <span className="text-primary">Provider</span> {state === "login" ? "Login" : "Sign Up"}
                </p>

                {state === "register" && (
                    <>
                        <div className="w-full">
                            <p>Name</p>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                placeholder="Your name"
                                className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                                type="text"
                                required
                            />
                        </div>
                        <div className="w-full">
                            <p>Kitchen Name</p>
                            <input
                                onChange={(e) => setKitchenName(e.target.value)}
                                value={kitchenName}
                                placeholder="e.g. Maa Ki Rasoi"
                                className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                                type="text"
                                required
                            />
                        </div>
                    </>
                )}

                <div className="w-full">
                    <p>Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Email address"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                        type="email"
                        required
                    />
                </div>

                <div className="w-full relative">
                    <p>Password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Password"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary pr-10"
                        type={showPassword ? "text" : "password"}
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

                {state === "register" ? (
                    <p>
                        Already have account?{" "}
                        <span onClick={() => setState("login")} className="text-primary cursor-pointer">
                            click here
                        </span>
                    </p>
                ) : (
                    <p>
                        Create an account?{" "}
                        <span onClick={() => setState("register")} className="text-primary cursor-pointer">
                            click here
                        </span>
                    </p>
                )}

                <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
                    {state === "register" ? "Create Account" : "Login"}
                </button>
            </form>
        </div>
    );
};

export default ProviderLogin;
