import React from 'react';
import kid from '../assets/Images/kid.webp';
import baby from '../assets/Images/bab.webp';
import women from '../assets/Images/wome.webp';
import men from '../assets/Images/me.webp';

const CategorieSection = () => {
  const Categories = [
    {
      title: 'Men',
      imageUrl: men,
    },
    {
      title: 'Women',
      imageUrl: women,
    },
    {
      title: 'Kid',
      imageUrl: kid,
    },
    {
      title: 'Baby',
      imageUrl: baby,
    },
  ];

  return (
    <div className="py-10 px-4 block" >
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9">
        {Categories.map((item, index) => (
          <div key={index} className="group relative max-w-sm mx-auto bg-white shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-56 object-cover object-center transition-all duration-300 group-hover:scale-110"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-500 group-hover:text-red-500">{item.title}</h2>
              <p className="mt-3 text-white">Explore the latest styles and trends.</p>
              <button className="mt-10 px-6 py-2 bg-red-500 text-white rounded-full text-sm font-medium transition-colors duration-300 hover:bg-red-600">
                View All
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorieSection;
