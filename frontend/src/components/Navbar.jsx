/* eslint-disable react/prop-types */
import { useState } from "react";

const Navbar = ({ user, handleLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="h-16 flex items-center shadow px-6 bg-pink-100">
      {user ? (
        <div className="w-full flex items-center justify-between">
          <div className="">
            <p className="text-3xl ">Kanban Board</p>
          </div>
          <div>
            <p>
              {" "}
              <span className="text-gray-600"> Welcome, </span>{" "}
              <span className="text-gray-800">{user.name}</span>
            </p>
          </div>

          <div
            className="bg-gray-100 border border-gray-300 text-blue-600 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {user.name
              .split(" ")
              .map((name) => name[0].toUpperCase())
              .join("")}
          </div>
          {showDropdown && (
            <div className="absolute right-4 top-12 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
              <button
                onClick={() => {
                  handleLogout();
                  setShowDropdown(false);
                }}
                className="block px-4 py-2 text-blue-600 hover:bg-blue-100 w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full">
          <p className="text-3xl text-center">Kanban Board</p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
