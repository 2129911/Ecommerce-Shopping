import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";
import { supabase } from "../supabase/supabaseClient";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";



const ListItem = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: null });
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("All_Products").select("*");
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data);
    }
  }
  const handleAddProduct = async () => {
    let images = null;
    if (newProduct.image) {
      const imageUpload = await supabase.storage
        .from("product-image")
        .upload(`${Date.now()}-${newProduct.image.name}`, newProduct.image);

      if (imageUpload.error) {
        console.error("Error uploading image:", imageUpload.error);
        return;
      }
      images = supabase.storage.from("product-image").getPublicUrl(imageUpload.data.path).data.publicUrl;
    }

    const { data, error } = await supabase
      .from("All_Products")
      .insert([{ name: newProduct.name, price: newProduct.price, images: images }])
      .select();

    if (error) {
      console.error("Error inserting product:", error);
    } else {
      setProducts([...products, ...data]);
      setNewProduct({ name: "", price: "", images: null });
    }
  };

  const handleUpdateProduct = async (id) => {
    let imageUrl = editProduct.image_url;

    if (editProduct.image) {
      const imageUpload = await supabase.storage
        .from("product-image")
        .upload(`${Date.now()}-${editProduct.image.name}`, editProduct.image);

      if (imageUpload.error) {
        console.error("Error uploading image:", imageUpload.error);
        return;
      }
      imageUrl = supabase.storage.from("product-image").getPublicUrl(imageUpload.data.path).data.publicUrl;
    }

    const { data, error } = await supabase
      .from("All_Products")
      .update({ name: editProduct.name, price: editProduct.price, images: imageUrl })
      .eq("id", id);

    if (error) {
      console.error("Error updating product:", error);
    } else {
      setProducts(products.map((product) => (product.id === id ? data[0] : product)));
      setEditProduct(null);
    }
  };
 <BsArrowRight />

  useEffect(() => {
    fetchProducts();
  }, []);

  
  return (
    <div className="flex">
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
            to="/list-item"
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
     <motion.div
        className=" w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white rounded shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="odd:bg-gray-100 even:bg-white"
                >
                  <td className="px-4 py-2 text-center">{product.id}</td>
                  <td className="px-4 py-2 text-center">
                    {product.images ? (
                      <img
                        src={product.images}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded shadow"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {editProduct?.id === product.id ? (
                      <input
                        type="text"
                        value={editProduct.name}
                        onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                        className="border border-gray-300 rounded p-2"
                      />
                    ) : (
                      product.name
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {editProduct?.id === product.id ? (
                      <input
                        type="number"
                        value={editProduct.price}
                        onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                        className="border border-gray-300 rounded p-2"
                      />
                    ) : (
                      `$${product.price}`
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {editProduct?.id === product.id ? (
                      <button
                        onClick={() => handleUpdateProduct(product.id)}
                        className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditProduct(product)}
                        className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

    </div>
  )
}

export default ListItem
