import React, { useState } from "react";
import { AiOutlineClose, AiOutlineHeart, AiOutlineMenu } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
const navLinks = [
  { title: "Home", path: "/" },
  { title: "Wishlist", path: "/wishlist" },
];

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const location = useLocation();
  const toggleNav = () => setNav(!nav);
  const closeNav = () => setNav(false);

  const menuVariants = {
    open: { x: 0, transition: { stiffness: 20, damping: 15 } },
    closed: { x: "-100%", transition: { stiffness: 20, damping: 15 } },
  };

  return (
    <>
      {/* Navbar Container */}
      <div className="fixed top-0 left-0 w-full bg-black text-white/70 z-50">
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-center mx-auto max-w-[350px] px-4 py-6">
          <ul className="flex space-x-6 p-4">
            {navLinks.map((el, index) => (
              <li key={index}>
                <Link to={el.path} className="group">
                  <h1 className="text-md font-bold text-white/70 cursor-pointer flex items-center gap-2">
                    {el.title}
                    {el.title === "Wishlist" && (
                      <span className="relative">
                        <AiOutlineHeart size={24} />
                        <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          {0}
                        </span>
                      </span>
                    )}
                  </h1>
                  {location.pathname === el.path && (
                    <div className="relative">
                      <div className="absolute w-2/3 h-1 bg-blue-600 rounded-full transition-all duration-300 ease-out group-hover:w-full" />
                      <div className="absolute mt-1 w-1/3 h-1 bg-blue-200 rounded-full transition-all duration-300 ease-out group-hover:w-full" />
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Navbar Header */}
        <div className="md:hidden flex items-center justify-between px-4 py-6">
          <Link to="/wishlist" className="text-white/70 relative">
            <AiOutlineHeart size={24} />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {0}
            </span>
          </Link>
          <button
            onClick={toggleNav}
            className="border border-white/70 text-white/70 rounded p-2 z-50"
            aria-label="Toggle menu"
          >
            {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={nav ? "open" : "closed"}
          variants={menuVariants}
          className="md:hidden fixed left-0 top-0 w-full h-screen bg-black/90 z-40 pt-24"
        >
          <ul className="my-24 text-center space-y-8 text-xl font-semibold">
            {navLinks.map((el, index) => (
              <li key={index}>
                <Link
                  to={el.path}
                  onClick={closeNav}
                  className="hover:text-white block"
                >
                  {el.title}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </>
  );
}
