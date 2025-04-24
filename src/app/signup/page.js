'use client'

import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const page = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth,email,password);
            alert("User created sucessfully")
        } catch (error) {
            setError(error);
            alert("invalid argument");
        }
        
    }
  return (

    <div className="flex justify-center mt-9 ">
       <form onSubmit={handleSubmit} className="flex flex-col m-3 p-3 w-[500px] h-full p-5 border-red-300 border-1">
        <label>Email</label>
        <input 
        type="email" 
        className="w-[300px] border-2 border-black rounded-md p-1" 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="PLace your email" 
        />
        <br/>
        <label>Password</label>
        <input 
        type="password" 
        className="w-[300px] border-2 border-black rounded-md p-1" 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        placeholder="PLace your password"/>
        <br/>
        <button type="Submit" className="border-2 border-black rounded-md p-1 w-[100px]">Submit</button>
       </form>
       {error ? {error} : ""}
    </div>
  )
}

export default page
