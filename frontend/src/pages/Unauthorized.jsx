import React from 'react'

function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
   
      <p className="text-4xl px-95 text-red-500 font-bold mt-4">You are not allowed to access this page. Only Seller can access this page</p>
    </div>
  )
}

export default Unauthorized
