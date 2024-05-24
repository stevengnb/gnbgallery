import { useContext, useEffect, useRef, useState } from "react";
import BackButton from "../../components/back-button";
import SecuredRoute from "../../settings/secured-routes";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import RequestCard from "./request-card";
import { DataContext } from "../../context/data-context";

export default function PhotoRequest() {
  const [photos, setPhotos] = useState<
    { url: string; time: Date; desc: string; fromId: string; index: number }[]
  >([]);
  const { userData } = useContext(DataContext);
  const fetchedRef = useRef(false);

  const deletePhoto = async (documentId: string, index: number) => {
    try {
      const documentRef = doc(db, "request", documentId);
      const docSnapshot = await getDoc(documentRef);

      if (docSnapshot.exists()) {
        const photos = docSnapshot.data()?.photos || [];
        photos.splice(index, 1);
        await updateDoc(documentRef, { photos });

        console.log("Photo deleted successfully!");
        window.location.reload();
      } else {
        console.log("Document doesn't exist.");
      }
    } catch (error) {
      console.error("Error =", error);
    }
  };

  const addPhoto = async (photo: any) => {
    if (!userData) return;
    const docRef = doc(db, "users", userData.id);

    const newPhotoData = {
      url: photo.url,
      desc: photo.desc,
      time: photo.time,
    };

    try {
      await updateDoc(docRef, {
        photos: arrayUnion(newPhotoData),
      });

      deletePhoto(photo.fromId, photo.index);
    } catch (error) {
      console.log("Error uploading image. Please try again.");
    }
  };

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "request"));
        querySnapshot.forEach((doc) => {
          if (doc.data().photos && doc.data().photos.length > 0) {
            doc.data().photos.map((photo: any, index: number) => {
              setPhotos((prev) => [
                ...prev,
                {
                  fromId: doc.id,
                  index: index,
                  url: photo.url,
                  time: new Date(
                    photo.time.seconds * 1000 + photo.time.nanoseconds / 1000000
                  ),
                  desc: photo.desc,
                },
              ]);
            });
          }
        });
      } catch (error) {
        console.log("Error = ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SecuredRoute isRequest={true}>
      <div className="relative h-full overflow-x-hidden p-16 flex justify-center">
        <BackButton isRequest={true} isFixed={true} />
        <div className="w-full h-full md:w-3/4 items-center justify-center flex flex-col gap-5">
          {photos?.map((photo, index) => (
            <RequestCard
              photo={photo}
              addPhoto={addPhoto}
              deletePhoto={deletePhoto}
              key={index}
            />
          ))}
        </div>
      </div>
    </SecuredRoute>
  );
}
