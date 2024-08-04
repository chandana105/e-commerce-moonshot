import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import OfferTab from "./offerTab";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="flex h-[100px] w-full flex-col justify-between border-2 px-8 py-3">
        <ul className="flex gap-5 self-end text-sm font-light tracking-wide">
          <li>Help</li>
          <li>Orders & Returns</li>
          <li>Hi, John</li>
        </ul>
        <div className="grid grid-cols-12 items-center gap-10">
          <h1 className="text-heading leading-heading-line-height col-span-2 font-bold">
            ECOMMERCE
          </h1>
          <ul className="leading-text-line-height col-span-8 flex justify-center gap-10 self-end text-base font-semibold tracking-wide">
            <li>Categories</li>
            <li>Sale</li>
            <li>Clearance</li>
            <li>New stock</li>
            <li>Trending</li>
          </ul>
          <ul className="col-span-2 flex justify-end gap-10 self-end">
            <li>
              <IoSearchOutline size={24} />
            </li>
            <li>
              <FiShoppingCart size={24} />
            </li>
          </ul>
        </div>
      </div>
      <OfferTab />
    </div>
  );
};

export default Header;
