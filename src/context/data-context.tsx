import { doc, getDoc } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";
import { db } from "../firebase/firebase-config";
import { IUser } from "../interface/user";

const getId = (id: string) => {
  const ids = id.split("token=")[1];
  const lastChar = ids.slice(-15);
  return lastChar;
};

export const DataContext = createContext<{
  userData: IUser | null;
  photos: any[];
  loading: boolean;
  getId: (id: string) => string;
  limitedPhotos: any[];
  displayCount: number;
  setDisplayCount: (count: number) => void;
  loadMorePhotos: () => void;
}>({
  userData: null,
  photos: [],
  loading: true,
  getId: getId,
  limitedPhotos: [],
  displayCount: 10,
  setDisplayCount: () => {},
  loadMorePhotos: () => {},
});

export const DataProvider = ({ children }: { children: any }) => {
  const [userData, setUserData] = useState<IUser | null>({
    id: "",
    username: "",
    bio: "",
    profile: "",
  });
  const [photos, setPhotos] = useState<
    { url: string; time: Date; desc: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(10);

  const limitedPhotos = photos.slice(0, displayCount);

  const loadMorePhotos = () => {
    setDisplayCount((prevCount) => prevCount + 10);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetch data kepanggil?");
      try {
        const documentRef = doc(db, "users", "Dmi3Rfay78bU0JORfl9Y7HOiqVw1");
        const docSnapshot = await getDoc(documentRef);

        if (docSnapshot.exists()) {
          const docData = docSnapshot.data();
          if (docData.photos && docData.photos.length > 0) {
            setUserData({
              id: docSnapshot.id,
              username: docData.username,
              bio: docData.bio,
              profile: docData.profile,
            });

            const photosData = docData.photos.map((photo: any) => ({
              url: photo.url,
              time: new Date(
                photo.time.seconds * 1000 + photo.time.nanoseconds / 1000000
              ),
              desc: photo.desc,
            }));
            photosData.sort((a: any, b: any) => b.time - a.time);
            console.log("photos data hrsnya ada");
            console.log(photosData);
            setPhotos(photosData);
            setLoading(false);
          } else {
            console.log("Photos not found in the document.");
          }
        } else {
          console.log("Document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ userData, photos, loading, getId, limitedPhotos, displayCount, setDisplayCount, loadMorePhotos }}>
      {children}
    </DataContext.Provider>
  );
};
