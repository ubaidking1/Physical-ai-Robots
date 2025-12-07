import React, { useState } from "react";

const SigninForm = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-blue-600 p-6">
      <button
        onClick={() => setOpen(!open)}
        className="px-8 py-3 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-xl shadow-lg hover:bg-white/20 transition"
      >
        Sign In
      </button>

      {open && (
        <div className="mt-8 w-full max-w-md p-8 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl text-white">
          <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>

          <form className="flex flex-col gap-5">
            <input
              className="p-3 bg-white/20 border border-white/30 rounded-lg placeholder-white focus:bg-white/30 transition"
              placeholder="Email"
              type="email"
            />

            <input
              className="p-3 bg-white/20 border border-white/30 rounded-lg placeholder-white focus:bg-white/30 transition"
              placeholder="Password"
              type="password"
            />

            <button className="w-full py-3 bg-white text-purple-700 rounded-lg font-bold shadow-lg hover:opacity-90 transition">
              Sign In
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SigninForm;
