import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
const Header = () => {
  return (
    <div className="static flex h-[100px] w-full flex-col justify-between border-2 px-8 py-3">
      <ul className="flex gap-5 self-end text-sm font-light tracking-wide">
        <li>Help</li>
        <li>Orders & Returns</li>
        <li>Hi, John</li>
      </ul>
      <div className="grid grid-cols-12 items-center gap-10">
        <h1 className="col-span-2 text-[32px] font-bold leading-[38.73px]">
          ECOMMERCE
        </h1>
        <ul className="col-span-8 flex justify-center gap-10 self-end text-base font-semibold leading-[19.36px] tracking-wide">
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
  );
};

export default Header;
