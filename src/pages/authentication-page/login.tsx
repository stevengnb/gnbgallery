import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import Loader from "../../components/loader/loader";
import AuthForm from "./auth-form";
import GoogleSignIn from "../../components/google-sign-in";
import { initializeUser } from "../../settings/initialize-user";
import Transition from "../../settings/transition";
import BackButton from "../../components/back-button";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async () => {
      if (auth.currentUser !== null) {
        await initializeUser({
          uid: auth.currentUser.uid,
          displayName: auth.currentUser.displayName,
        });
        setLoading(false);
        navigate("/");
      }
      setAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  const setPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signIn = async () => {
    if (email === "" || password === "") {
      setErrorMessage("All fields must be filled!");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in:", error);
      setLoading(false);
      setErrorMessage(
        "Error signing in. Please check your email and password."
      );
    }
  };

  return (
    <>
      <div className="h-screen relative overflow-x-hidden p-10 flex flex-col justify-center items-center">
        <BackButton />
        {authReady ? (
          <div className=" px-8 py-6 sm:mt-2 mt-7 text-left w-96">
            <div className="flex flex-col gap-6">
              <p
                className="text-xl font-semibold tracking-wide mb-4"
                style={{ fontFamily: "suisseregular" }}
              >
                Log into your account
              </p>
              <AuthForm
                email={email}
                password={password}
                errorMessage={errorMessage}
                loading={loading}
                setEmail={setEmail}
                setPassword={setPassword}
                setPasswordVisibility={setPasswordVisibility}
                showPassword={showPassword}
                isRegister={false}
              />
              <button
                className={
                  !loading
                    ? "bg-black text-white h-10 font-semibold tracking-wider p-2 pl-6 text-sm rounded-full text-left hover:bg-gray-900 transition-all duration-300 active:scale-95"
                    : "bg-slate-400 p-2 flex justify-center rounded-full transition-all duration-300"
                }
                style={{ fontFamily: "HBLight" }}
                onClick={signIn}
              >
                {!loading ? "LOG IN" : <Loader />}
              </button>
            </div>
            <div className="border my-8"></div>
            <GoogleSignIn authType="Log in with Google" />
            <p
              className="text-base font-semibold underline mt-4 hover:cursor-pointer"
              onClick={() => navigate("/register")}
            >
              or sign up for an account
            </p>
          </div>
        ) : (
          <Loader />
        )}
      </div>
      <Transition />
    </>
  );
}
