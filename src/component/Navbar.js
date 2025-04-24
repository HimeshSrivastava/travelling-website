'use client';

import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';
import useAuth from './AuthenticationCheck';

const Navbar = () => {
  const [user, loading] = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div 
        onClick={() => router.push('/')} 
        className="text-2xl font-bold text-blue-600 cursor-pointer tracking-wide hover:text-blue-700 transition"
      >
        TravelPlanner
      </div>
      
      <div>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2 rounded-lg transition duration-200"
          >
            Logout
          </button>
        ) : (<div className='flex gap-4'>
              <button
            onClick={() => router.push('/login')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-lg transition duration-200"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/signup')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-lg transition duration-200"
          >
            Sign-up
          </button>
            </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
