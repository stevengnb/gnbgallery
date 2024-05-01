import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase-config";
import { authorizeUser } from "./authorized-user-add";
import Loader from "../components/loader/loader";

interface Props {
  children: React.ReactNode;
  isAdd?: boolean;
}

const SecuredRoute: React.FC<Props> = ({ children, isAdd = false }: Props) => {
  const redirectTime = 4000;
  const [authenticated, setAuthenticated] = useState(false);
  const [determined, setDetermined] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user);
      if (!user) {
        timer = setTimeout(() => {
          navigate("/login");
        }, redirectTime);
      } else {
        if (isAdd) {
          authorizeUser().then((authorizedUserId) => {
            if (auth.currentUser?.uid !== authorizedUserId) {
              setAuthenticated(false);
            } else {
              setAuthenticated(true);
            }
            setDetermined(true);
          });
        } else {
          setAuthenticated(true);
          setDetermined(true);
        }
      }
    });

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  if (!determined) {
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        <Loader />
      </div>
    );
  }

  return authenticated ? (
    <>{children}</>
  ) : (
    <div className="h-screen relative text-[#ECE6D5] bg-[#050c0f] flex justify-center items-center">
      <div
        className="text-6xl md:text-9xl transition-all duration-500"
        style={{ fontFamily: "AntonioBold" }}
      >
        NOT AUTHENTICATED
      </div>
    </div>
  );
};

export default SecuredRoute;
