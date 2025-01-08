import React, { useState } from "react";
import { supabase } from "../../supabase/supabaseClient";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch data from Supabase
  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("Payment_Orders").select("*");
      if (error) {
        console.error(error);
        return;
      }
      setOrders(data); // Update orders state with fetched data
    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
  };

  return (
    <div className="border m-10">
      <button
        onClick={fetchData}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        Fetch Orders
      </button>

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
