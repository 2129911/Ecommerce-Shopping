import React, { useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import {BsArrowRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const DataOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("Payment_Orders").select("*");
      if (error) {
        console.error(error);
        return;
      }
      setOrders(data); 
    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
  };
  
  return (
    <div>
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
            to="/orders" onClick={fetchData}
            className="flex items-center gap-4 border rounded p-2 hover:bg-gray-200"
          >
            <p className="text-xl">Orders</p>
            <BsArrowRight className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DataOrders
