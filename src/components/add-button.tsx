import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function AddButton() {
  const navigate = useNavigate();

  return (
    <button
      className="fixed bottom-6 right-6 w-12 h-12 rounded-2xl bg-white hover:bg-gray-200 active:bg-gray-50 flex items-center justify-center transition-all duration-500 shadow-xl"
      onClick={() => navigate("/stevengnb/add")}
    >
    <IoMdAdd className="w-6 h-6" />
    </button>
  );
}
