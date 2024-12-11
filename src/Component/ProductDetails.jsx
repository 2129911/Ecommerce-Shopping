import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { filter } from 'framer-motion/client';


const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


const handleClick = (e, product) => {
  
  e.stopPropagation();
  e.preventDefault();
  dispatch(addToCart(product)); 
  alert(`${product.name} added to cart successfully!`); 
};


  const { id } = useParams();
  const cart = useSelector((state) => state.product.product);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const newProduct = cart.find((product) => product.id === parseInt(id));
  console.log(newProduct)
    setProduct(newProduct);
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-semibold loader"></div>
      </div>
    );
  }

  return (<>
   
    
    <div style={{ backgroundImage: `url(${product.image})`} } className="min-h-screen flex justify-center items-center  p-4">

      <motion.div
        className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden p-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >      <div className='flex'>

        <motion.img
          src={product.image}
          alt={product.name}
          className="w-2/5
           h-full object-contain mb-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <div className='text-center w-full'>
        <h1 className="text-8xl font-bold text-gray-800 borders-text  w-full mb-4 ">{product.name}</h1>
        <p className="text-xl  text-gray-600  mb-4">{product.description}</p>
        <p className="text-2xl font-semibold text-red-600 mb-4">${product.price}</p>
        <div className="flex items-center w-full justify-center  mb-5 space-x-2">
                    <button
                      onClick={() => dispatch(decreaseQuantity(product.id))}
                      className="bg-gray-200 px-3 py-1 rounded-l-lg hover:bg-gray-300"
                    >
                      -
                    </button>
                    <p className="px-4 py-1 bg-gray-100 rounded">
                    5
                    </p>
                    <button
                      
                      className="bg-gray-200 px-3 py-1 rounded-r-lg hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
        <motion.button onClick={(e) => handleClick(e, item)} 
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 my-1 focus:outline-none focus:ring-2 focus:ring-red-300 w-3/4"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Add to Cart
        </motion.button><br></br>
        <button onClick={() => navigate(-1)}> <div className= " w-full bg-red-600  flex text-white items-center px-6 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"><GoArrowLeft ></GoArrowLeft > Go-back</div></button>
    </div>
    </div>
      </motion.div>
      </div>
      </> );
};

export default ProductDetails;