import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import background from '../assets/background'
const Login = () => {
  const [loader, setloader] = useState(false)
  const [isLogin, setIsLogin] = useState(true);
  const [email, setemail] = useState('')
  const [fullname, setfullname] = useState('')
  const [password, setpassword] = useState('')
  const [emaillog, setemaillog] = useState('')
  const [passwordlog, setpasswordlog] = useState('')
  const navigate = useNavigate();
  const Register = async function(){
    console.log({fullname,email,password});
    try{
        setloader(true);
        const res=await axios.post("http://localhost:8000/users/register",{email,fullName:fullname,password});
        document.getElementById("email").value='';
        document.getElementById("fullname").value='';
        document.getElementById("password").value='';
        setfullname('');
        setemail('');
        setpassword('');
        toast(res.data.message,{className:"font-bold text-lg"});
        console.log(res.status)
        if(res.status==201)
        {
          try{
            const resLog = await axios.post("http://localhost:8000/users/login",{email:email,password:password});
            toast(resLog.data.message,{className:"font-bold text-lg"});
            console.log(res.data);
          }
          catch(error)
          {
            console.error("Error Logging in after registering",error);
            toast("Login Failed!",{className:"font-bold text-lg"});
          }
          navigate('/',{replace:true})
        }
        // await handleLogin();
        setloader(false);
        console.log(res.data);

    }catch(error)
    {
        setloader(false);
        console.error('Error registering user:', error);
        toast(error.response.data.message||"Registration Failed",{className:"font-bold text-lg"});
    }
}
const handleLogin = async function(){
  console.log({emaillog,passwordlog});
  try{
    setloader(true);
    const res = await axios.post("http://localhost:8000/users/login",{email:emaillog,password:passwordlog});
    document.getElementById("emaillog").value='';
    document.getElementById("passwordlog").value='';
    setpasswordlog('');
    setemaillog('');
    setloader(false);
    // toast(res.data.message,{className:"font-bold text-lg"});
    navigate('/dashboard',{replace:true})
    // console.log(res.data);
  }catch(error){
    setloader(false);
    console.log("Error Logging In");
    toast(error.response.data.message || "Login Failed",{className:"font-bold text-lg"});
  }
  
}

return (
  <div className="relative flex w-full h-screen overflow-hidden bg-gradient-to-br from-[#0b1020] via-[#0f172a] to-[#1e1b4b]">
    <ToastContainer />
    {loader && <Loader />}

    {/* Sliding Image Panel */}
    <div
      className={`absolute lg:z-40 top-0 h-full w-1/2 transition-all duration-700 ease-in-out ${
        isLogin ? "left-1/2" : "left-0"
      }`}
      >
      <div className="w-full h-full bg-gradient-to-br from-indigo-600/40 via-purple-600/30 to-pink-600/40 backdrop-blur-xl">
        <img
          className="w-full h-full object-cover opacity-50"
          src="https://semeq.com/wp-content/uploads/2024/10/equipment-maintenance-management-1.jpg"
          alt="Background"
          />
      </div>
    </div>

    {/* LOGIN */}
    <div
      className={`flex items-center justify-center transition-all duration-700 ${
        isLogin ? "w-screen z-10" : "w-0"
      } lg:w-1/2 h-full`}
      >
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.3)] rounded-3xl p-10 lg:w-[420px] w-[90%]">
        <h1 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Seamlessly manage equipment & teams
        </p>

        <div className="flex flex-col gap-5">
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Email</label>
            <input
              id="emaillog"
              onChange={(e) => setemaillog(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              />
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-1 block">Password</label>
            <input
              id="passwordlog"
              type="password"
              onChange={(e) => setpasswordlog(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
              />
          </div>

          <button
            onClick={handleLogin}
            className="mt-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-3 rounded-xl text-lg font-semibold hover:scale-105 transition-all shadow-lg"
            >
            Sign In
          </button>
        </div>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => {
              setIsLogin(false);
              document.getElementById("emaillog").value = "";
              document.getElementById("passwordlog").value = "";
              setemaillog("");
              setpasswordlog("");
            }}
            className="text-blue-400 hover:underline cursor-pointer"
            >
            Sign up
          </span>
        </p>
      </div>
    </div>

    {/* REGISTER */}
    <div
      className={`absolute right-0 flex items-center justify-center transition-all duration-700 ${
        isLogin ? "w-0" : "w-full"
      } lg:w-1/2 h-full`}
      >
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(236,72,153,0.3)] rounded-3xl p-10 lg:w-[450px] w-[90%]">
        <h1 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Create Account
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Start managing maintenance smarter
        </p>

        <div className="flex flex-col gap-5">
          <input
            id="fullname"
            onChange={(e) => setfullname(e.target.value)}
            className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white"
            placeholder="Full Name"
            />

          <input
            id="email"
            type="email"
            onChange={(e) => setemail(e.target.value)}
            className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white"
            placeholder="Email Address"
            />

          <input
            id="password"
            type="password"
            onChange={(e) => setpassword(e.target.value)}
            className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white"
            placeholder="Password"
            />

          <button
            onClick={Register}
            className="mt-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-3 rounded-xl text-lg font-semibold hover:scale-105 transition-all shadow-lg"
            >
            Sign Up
          </button>
        </div>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => {
              setIsLogin(true);
              document.getElementById("email").value = "";
              document.getElementById("fullname").value = "";
              document.getElementById("password").value = "";
              setfullname("");
              setemail("");
              setpassword("");
            }}
            className="text-blue-400 hover:underline cursor-pointer"
            >
            Log in
          </span>
        </p>
      </div>
    </div>
  </div>
);

}
export default Login;
