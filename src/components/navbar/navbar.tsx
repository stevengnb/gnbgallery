import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import { signOut } from "firebase/auth";
import styles from "./navbar.module.css";
import { useEffect, useState } from "react";

function Navbar() {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.log("ERROR = ", err);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const truncateUsername = (username: string | null, maxLength: number) => {
    if (username === null) {
      return "";
    }
    return username.length > maxLength
      ? username.substring(0, maxLength) + "..."
      : username;
  };

  const getMaxUsernameLength = () => {
    console.log(window.innerWidth);
    return window.innerWidth <= 800 ? window.innerWidth <= 350 ? 2 : 6 : 12;
  };

  return (
    <div
      className="select-none z-10 fixed w-full flex justify-between items-center px-10 py-10 transition-all duration-600 bg-[#050c0f]"
      id="idNav"
    >
      <div
        className="text-[#ECE6D5] text-base hover:cursor-default flex items-center justify-center"
        style={{ fontFamily: "Heebo, sans-serif" }}
      >
        <p className="select-none tracking-wider" onClick={() => navigate("/")}>
          {currentUser === null
            ? "Welcome!"
            : "Welcome, " +
              truncateUsername(
                currentUser.displayName,
                getMaxUsernameLength()
              ) +
              "!"}
        </p>
      </div>
      <div
        className="text-[#ECE6D5] text-base hover:cursor-pointer flex items-center justify-center"
        style={{ fontFamily: "Heebo, sans-serif" }}
      >
        <p className={styles.navbarItem} onClick={() => navigate("/stevengnb")}>
          Gallery
        </p>
      </div>
      <div
        className="text-[#ECE6D5] text-base hover:cursor-pointer flex items-center justify-center"
        style={{ fontFamily: "Heebo, sans-serif" }}
      >
        {currentUser === null ? (
          <p className={styles.navbarItem} onClick={() => navigate("/login")}>
            Login
          </p>
        ) : (
          <p className={styles.navbarItem} onClick={logout}>
            Logout
          </p>
        )}
      </div>
    </div>
  );
}

export default Navbar;
