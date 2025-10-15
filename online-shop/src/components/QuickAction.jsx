import React from 'react';
import { Link } from 'react-router';
import orderimg from "../assets/cart.png";
import vendorimg from "../assets/vendor.png"
import catimg from "../assets/category.png"
import wishimg from "../assets/wishlist.png"
import { t } from 'i18next';

const QuickAction = () => {
  const actions = [
    { id: 1, title: 'OrderHistory', icon: orderimg, link:"/Order-history" },
    { id: 2, title: 'Vendorlist', icon:vendorimg , link:"/comingsoon" },
    { id: 3, title: 'Category', icon: catimg, link:"/categories" },
    { id: 4, title: 'Wishlist', icon: wishimg, link:"/wishlist" },
  ];

  return (
    <div className="p-5">
      <div className="grid grid-cols-4 gap-2">
  {actions.map((action) => (
    <Link
      to={action.link}
      key={action.id}
      className={`card ${action.color || 'bg-base-100'} shadow-lg hover:shadow-xl cursor-pointer aspect-square flex flex-col items-center justify-center text-black font-semibold text-[10px] transition-all hover:scale-105`}
    >
      {action.icon && (
        <img src={action.icon} alt={action.title} className="w-10 h-10 mb-2" />
      )}
      {t(action.title)}
    </Link>
  ))}
</div>

    </div>
  );
};

export default QuickAction;
