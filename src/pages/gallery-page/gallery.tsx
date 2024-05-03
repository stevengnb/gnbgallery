import Transition from "../../settings/transition";
import BackButton from "../../components/back-button";
import { Suspense, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase-config";
import { IUser } from "../../interface/user";
import Loader from "../../components/loader/loader";
import SecuredRoute from "../../settings/secured-routes";
import AddButton from "../../components/add-button";

export default function Gallery() {
  const [photos, setPhotos] = useState<
    { url: string; time: Date; desc: string }[]
  >([]);
  const [userData, setUserData] = useState<IUser | null>({
    id: "",
    username: "",
    bio: "",
    profile: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        if (doc.data().photos.length > 0) {
          setUserData({
            id: doc.id,
            username: doc.data().username,
            bio: doc.data().bio,
            profile: doc.data().profile,
          });
          const photosData = doc.data().photos.map((photo: any) => ({
            url: photo.url,
            time: new Date(
              photo.time.seconds * 1000 + photo.time.nanoseconds / 1000000
            ),
            desc: photo.desc,
          }));
          setPhotos(photosData);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
          console.log(doc.data().photos);
          return;
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SecuredRoute>
      <div className="relative h-screen overflow-x-hidden flex flex-col p-8 sm:p-10 lg:py-12 lg:px-20 xl:py-14 xl:px-32">
        <BackButton isFixed={true} />
        {auth.currentUser?.uid === userData?.id && <AddButton />}
        <div className="flex flex-col justify-start items-center">
          <div className="flex flex-col gap-3 sm:gap-4">
            <img className="max-w-32 rounded-full" src={userData?.profile} />
            <p
              className="font-bold text-lg tracking-wider"
              style={{ fontFamily: "suisseregular" }}
            >
              {userData?.username}
            </p>
            <p style={{ fontFamily: "suisseregular" }}>{userData?.bio}</p>
          </div>
          {loading ? (
            <div className="mt-8">
              <Loader />
            </div>
          ) : (
            <>
              <div className="pt-8 w-full lg:columns-5 gap-x-6 sm:gap-x-8 md:columns-4 sm:columns-3 columns-2 transition-all duration-500">
                {photos
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.time).getTime() - new Date(a.time).getTime()
                  )
                  .map((photo, index) => (
                    <img
                      key={index}
                      src={photo.url}
                      alt={`Photo ${index}`}
                      className="w-full mb-6 sm:mb-8 object-cover object-center"
                    />
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Transition />
    </SecuredRoute>
  );
}
