import { IoArrowBack } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function BackButton({
  isFixed = false,
  isAdd = false,
  isDetail = false,
}) {
  const navigate = useNavigate();

  return (
    <button
      className={
        isFixed
          ? "fixed top-5 left-5 w-11 h-11 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center transition-all duration-500 shadow-xl"
          : "absolute top-7 left-7 w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center transition-all duration-400"
      }
      onClick={() =>
        isAdd || isDetail ? navigate("/stevengnb") : navigate("/")
      }
    >
      {isDetail ? (
        <IoClose className="w-6 h-6" />
      ) : (
        <IoArrowBack className="w-6 h-6" />
      )}
    </button>
  );
}
