import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function AddButton({ isRequest = false }) {
  const navigate = useNavigate();

  return (
    <button
      className="z-[100] fixed bottom-6 right-6 w-12 h-12 rounded-2xl bg-gray-900 hover:bg-gray-600 active:bg-gray-50 flex items-center justify-center transition-all duration-500 shadow-xl"
      onClick={() =>
        isRequest ? navigate("/stevengnb/request") : navigate("/stevengnb/add")
      }
    >
      {isRequest ? (
        <MdOutlineAddPhotoAlternate className="w-6 h-6 text-white" />
      ) : (
        <IoMdAdd className="w-6 h-6 text-white" />
      )}
    </button>
  );
}
