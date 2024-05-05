import { doc, getDoc } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";
import { db } from "../firebase/firebase-config";
import { IUser } from "../interface/user";

export const DataContext = createContext<{
  userData: IUser | null;
  photos: any[];
  loading: boolean;
}>({
  userData: null,
  photos: [],
  loading: true,
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

  useEffect(() => {
    const fetchData = async () => {
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
    <DataContext.Provider value={{ userData, photos, loading }}>
      {children}
    </DataContext.Provider>
  );
};
