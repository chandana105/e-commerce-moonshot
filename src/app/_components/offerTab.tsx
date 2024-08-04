import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const OfferTab = () => {
  return (
    <div className="flex h-9 w-full items-center justify-center gap-3 bg-gray-200">
      <span>
        <MdKeyboardArrowLeft size={20} />
      </span>
      Get 10% off on business sign up
      <span>
        <MdKeyboardArrowRight size={20} />
      </span>
    </div>
  );
};

export default OfferTab;
