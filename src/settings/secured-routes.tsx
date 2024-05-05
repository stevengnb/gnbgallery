import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase-config";
import Loader from "../components/loader/loader";
import Message from "../templates/message";

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
          if (auth.currentUser?.uid !== "Dmi3Rfay78bU0JORfl9Y7HOiqVw1") {
            setAuthenticated(false);
          } else {
            setAuthenticated(true);
          }
          setDetermined(true);
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
    <Message message="NOT AUTHENTICATED" />
  );
};

export default SecuredRoute;
