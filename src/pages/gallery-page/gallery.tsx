import Transition from "../../settings/transition";
import BackButton from "../../components/back-button";
import { useContext } from "react";
import { auth } from "../../firebase/firebase-config";
import Loader from "../../components/loader/loader";
import SecuredRoute from "../../settings/secured-routes";
import AddButton from "../../components/add-button";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/data-context";

export default function Gallery() {
  const navigate = useNavigate();
  const { userData, photos, loading, getId } = useContext(DataContext);
  const limitedPhotos = photos.slice(0, 10);

  return (
    <SecuredRoute>
      <div className="relative h-screen overflow-x-hidden flex flex-col p-8 sm:p-10 lg:py-12 lg:px-20 xl:py-14 xl:px-32">
        <BackButton isFixed={true} />
        {auth.currentUser?.uid === userData?.id && <AddButton />}
        <div className="flex flex-col justify-start items-center">
          <div className="flex flex-col gap-3 sm:gap-4">
            <img
              className="max-w-32 rounded-full"
              src={userData?.profile}
              loading="lazy"
            />
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
                {limitedPhotos.map((photo, index) => (
                  <div
                    key={index}
                    className="hover:cursor-pointer"
                    onClick={() => navigate(`/stevengnb/${getId(photo.url)}`)}
                  >
                    <img
                      key={index}
                      src={photo.url}
                      alt={`Photo ${index}`}
                      className="w-full mb-6 sm:mb-8 object-cover object-center pointer-events-none"
                    />
                  </div>
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
