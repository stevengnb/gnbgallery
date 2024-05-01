import { FcGoogle } from "react-icons/fc";
import { signInWithRedirect } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";

export default function GoogleSignIn({ authType }: { authType: string }) {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
      navigate("/");
    } catch (err) {
      console.log("ERROR = ", err);
    }
  };

  return (
    <div
      className="border-2 opacity-90 rounded-full flex py-3 px-5 items-center transition-all duration-300 hover:cursor-pointer active:scale-95"
      onClick={signInWithGoogle}
    >
      <FcGoogle className="w-6 h-6" />
      <p
        className="text-base flex-1 text-center font-semibold"
        style={{ fontFamily: "suisseregular" }}
      >
        {authType}
      </p>
    </div>
  );
}
