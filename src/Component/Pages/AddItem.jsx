import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";


const AdminPage = () => {
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
  };

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
    <div className="bg-gray-100 min-h-screen mt-8 p-8">
      <motion.h1 
        className="text-4xl font-bold text-center mb-8 text-gray-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Add Item
      </motion.h1>

      <motion.div 
        className="bg-white p-6 rounded shadow-md max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="border border-gray-300 rounded p-2"
          />
          
          <input
            type="file"
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
            className="border border-gray-300 rounded p-2"
          />
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Add Product
          </button>
        </div>
      </motion.div>

     
    </div>
  );
};

export default AdminPage;
