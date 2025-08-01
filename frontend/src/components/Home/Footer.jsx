import React from "react";

function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-8 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <p className="text-sm text-center sm:text-left">
          &copy; 2025 Your Company. All rights reserved.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-center">
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
