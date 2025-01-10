import React, { useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { Link, Outlet } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const Orders = () => {
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
    <div className="border m-10">
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
      {/* <button
        onClick={fetchData}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        Fetch Orders
      </button> */}

      {orders.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="table-auto w-full bg-white rounded shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Order Name</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) =>
                order.products.map((item) => (
                  <tr key={item.id} className="odd:bg-gray-100 even:bg-white">
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{item.name || "N/A"}</td>
                    <td className="px-4 py-2">
                      <img
                        src={item.image || ""}
                        alt={item.name || "Image"}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="px-4 py-2">{item.status || "Pending"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {orders.length === 0 && (
        <p className="mt-4 text-gray-600">No orders found. Click "Fetch Orders" to load data.</p>
      )}
    </div>
  );
};

export default Orders;
