import React from "react";

function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-8 px-32">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <p className="text-sm">
          &copy; 2025 Your Company. All rights reserved.
        </p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white text-sm">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-400 hover:text-white text-sm">
            Terms of Service
          </a>
          <a href="#" className="text-gray-400 hover:text-white text-sm">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
