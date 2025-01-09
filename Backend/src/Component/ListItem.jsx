import React from "react";
import { Link, Outlet } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { BsArrowRight } from "react-icons/bs";
import Items from "./Items"
const ListItem = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 shadow-lg">
        <div className="flex flex-col gap-4">
          <Link
            to="/admin"
            className="flex items-center gap-4 border rounded p-2 hover:bg-gray-200"
          >
            <p className="text-xl">Add Item</p>
            <BsArrowRight className="text-2xl" />
          </Link>
          <Link
            to="/items"
            className="flex items-center gap-4 border rounded p-2 hover:bg-gray-200"
          >
            <p className="text-xl">List Item</p>
            <BsArrowRight className="text-2xl" />
          </Link>
          <Link
            to="/orders"
            className="flex items-center gap-4 border rounded p-2 hover:bg-gray-200"
          >
            <p className="text-xl">Orders</p>
            <BsArrowRight className="text-2xl" />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <Outlet />
        <AddItem/> 
        {/* <Orders/>  
        <ListItem/>   */}
        <Items></Items>

      </div>
    </div>
  )
}

export default ListItem
