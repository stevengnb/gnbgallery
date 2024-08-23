import Navbar from "../../components/navbar/navbar";
import Transition from "../../settings/transition";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="h-full relative overflow-y-hidden overflow-x-hidden text-[#ECE6D5] p-10 bg-[#050c0f]">
        <div className="flex h-full w-full flex-col justify-center text-left md:text-center">
          <div>
            <p
              className="absolute left-8 bottom-8 text-xl tracking-widest select-none"
              style={{ fontFamily: "AntonioBold" }}
            >
              BY STEVEN
            </p>
          </div>
          <div style={{ fontFamily: "AntonioBold" }}>
            <p
              className="text-6xl md:text-9xl hover:scale-105 transition-all duration-500 hover:cursor-pointer hover:tracking-wider hover:text-white select-none"
              onClick={() => navigate("/stevengnb")}
            >
              EXPLORE MY GALLERY
            </p>
          </div>
        </div>
      </div>
      <Transition isHome={true} />
    </div>
  );
}
