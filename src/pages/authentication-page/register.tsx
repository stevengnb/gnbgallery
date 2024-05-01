import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Loader from "../../components/loader/loader";
import AuthForm from "./auth-form";
import GoogleSignIn from "../../components/google-sign-in";
import { initializeUser } from "../../settings/initialize-user";
import Transition from "../../settings/transition";
import BackButton from "../../components/back-button";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
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
        navigate("/");
      }
      setAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  const setPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signUp = async () => {
    if (email === "" || password === "" || username === "") {
      setErrorMessage("All fields must be filled!");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      console.log("Creating usernya");
      const authUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("harusnya berhasil create user");

      initializeUser({
        uid: authUser.user.uid,
        displayName: username,
      });

      await updateProfile(authUser.user, {
        displayName: username,
      });

      console.log("sebelum redirect ke home");
      navigate("/");
    } catch (error) {
      setErrorMessage("Error creating your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen relative overflow-x-hidden p-10 flex flex-col justify-center items-center">
        <BackButton />
        {authReady ? (
          <div className=" px-8 py-6 sm:mt-2 mt-7 text-left w-96">
            <div className="flex flex-col gap-4">
              <p
                className="text-xl font-semibold tracking-wide mb-4"
                style={{ fontFamily: "suisseregular" }}
              >
                Sign up for an account
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
                isRegister={true}
              />
              <input
                type="text"
                name="username"
                className=" bg-gray-300 bg-opacity-25 h-12 w-full px-3 py-7 rounded-xl"
                placeholder="Username"
                disabled={loading}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errorMessage !== "" && (
                <div className="text-sm text-red-500">{errorMessage}</div>
              )}
              <button
                className={
                  !loading
                    ? "bg-black text-white h-10 font-semibold tracking-wider p-2 pl-6 text-sm rounded-full text-left hover:bg-gray-900 transition-all duration-300 active:scale-95"
                    : "bg-slate-400 p-2 flex justify-center rounded-full transition-all duration-300"
                }
                style={{ fontFamily: "HBLight" }}
                onClick={signUp}
              >
                {!loading ? "SIGN UP" : <Loader />}
              </button>
            </div>
            <div className="border my-8"></div>
            <GoogleSignIn authType="Sign up with Google" />
            <p
              className="text-base font-semibold underline mt-4 hover:cursor-pointer"
              onClick={() => navigate("/login")}
            >
              or log into your account
            </p>
          </div>
        ) : (
          <Loader />
        )}
      </div>
      <Transition />
    </>
  );
};

export default Register;
