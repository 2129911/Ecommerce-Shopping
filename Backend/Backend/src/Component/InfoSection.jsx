import React, { useState, useCallback } from "react";
import { FaHeadset, FaLock, FaMoneyBillWave, FaShippingFast, FaTag } from "react-icons/fa";

// Throttle function for performance
function throttle(func, delay) {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    func(...args);
  };
}

const InfoSection = () => {
  const [rotates, setRotates] = useState(
    Array(5).fill({ x: 0, y: 0 }) // Assuming 5 items
  );

  // Throttled mouse movement handler
  const onMouseMove = useCallback(
    throttle((e, index) => {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const rotateX = (y - centerY) / 7;
      const rotateY = (centerX - x) / 7;

      setRotates((prev) =>
        prev.map((rotate, i) =>
          i === index ? { x: rotateX, y: rotateY } : rotate
        )
      );
    }, 100),
    []
  );

  // Reset rotation on mouse leave
  const onMouseLeave = (index) => {
    setRotates((prev) =>
      prev.map((rotate, i) => (i === index ? { x: 0, y: 0 } : rotate))
    );
  };

  const infoItems = [
    {
      icon: <FaShippingFast />,
      title: "Free Shipping",
      description: "Get your orders delivered with no extra cost",
    },
    {
      icon: <FaHeadset />,
      title: "Support 24/7",
      description: "We are here to assist you anytime",
    },
    {
      icon: <FaMoneyBillWave />,
      title: "100% Money Back",
      description: "Full refund if you are not satisfied",
    },
    {
      icon: <FaLock />,
      title: "Payment Secure",
      description: "Your payment information is safe with us",
    },
    {
      icon: <FaTag />,
      title: "Discount",
      description: "Enjoy the best prices on our products",
    },
  ];

  return (
    <div className="z py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 px-4">
        {infoItems.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center text-center p-6 bg-white border rounded-lg shadow-lg  transition-all duration-300 ease-in-out"
            onMouseMove={(e) => onMouseMove(e, index)}
            onMouseLeave={() => onMouseLeave(index)}
            style={{
              transform: `perspective(1000px) rotateX(${rotates[index].x}deg) rotateY(${rotates[index].y}deg) scale3d(1, 1, 1)`,
              transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99)",
            }}
          >
            <div className="pulse absolute -inset-2  rounded-lg " />
            <div className="relative z-10">
              <div className="text-4xl text-red-600 mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoSection;
