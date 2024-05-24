import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/data-context";
import Loader from "../../components/loader/loader";
import SecuredRoute from "../../settings/secured-routes";
import Transition from "../../settings/transition";
import BackButton from "../../components/back-button";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { formatDate } from "../../settings/format-date";
import { getId } from "../../settings/get-id";

const PhotoDetail = () => {
  const navigate = useNavigate();
  const { photoId } = useParams<{ photoId: string }>();
  const { userData, photos, loading } = useContext(DataContext);
  const [photo, setPhoto] = useState<any>({});
  const [pnLoading, setPnLoading] = useState(false);
  const [pnPhoto, setPnPhoto] = useState<{ previous: string; next: string }>({
    previous: "",
    next: "",
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPnLoading(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [photo]);

  useEffect(() => {
    const getDetail = () => {
      const photoIndex = photos.findIndex((item: any) =>
        item.url.includes(photoId)
      );

      if (photoIndex !== -1) {
        const nextPhoto =
          photoIndex < photos.length - 1 ? photos[photoIndex + 1] : null;
        const previousPhoto = photoIndex > 0 ? photos[photoIndex - 1] : null;

        setPhoto(photos[photoIndex]);
        setPnPhoto({
          previous: previousPhoto ? previousPhoto.url : "",
          next: nextPhoto ? nextPhoto.url : "",
        });
      }
    };

    getDetail();
  }, [photos, photoId]);

  const handleNavigation = (url: string) => {
    setPnLoading(true);
    navigate(`/stevengnb/${getId(url)}`);
  };

  return (
    <SecuredRoute>
      <div className="relative w-screen h-screen overflow-x-hidden justify-center items-center flex flex-col py-20 md:p-10">
        <BackButton isFixed={true} isDetail={true} />
        {(loading || pnLoading) && <Loader />}
        {!loading && !pnLoading && (
          <div className="w-full h-full flex flex-col items-center">
            <div className="max-h-170 md:h-170 2xl:h-140 flex justify-center">
              <img
                src={photo.url}
                alt="Photo"
                className="max-h-full pointer-events-none"
              />
            </div>
            <div className="relative h-full p-6 w-full lg:w-1/2 flex flex-col items-start gap-2 md:gap-6">
              <p
                className="font-bold text-sm tracking-wide"
                style={{ fontFamily: "suisseregular" }}
              >
                {userData?.username}
              </p>
              {photo.desc?.trim() !== "" && (
                <p
                  className="text-sm tracking-wide"
                  style={{ fontFamily: "suisseregular" }}
                >
                  {photo.desc}
                </p>
              )}
              <p
                className="opacity-80 text-sm tracking-wide"
                style={{ fontFamily: "suisseregular" }}
              >
                {formatDate(new Date(photo.time).toString())}
              </p>
              <div className="absolute top-3 right-5 flex gap-1">
                {pnPhoto.previous !== "" && (
                  <button
                    className="w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center transition-all duration-400"
                    onClick={() => handleNavigation(pnPhoto.previous)}
                  >
                    <GrFormPreviousLink className="w-6 h-6" />
                  </button>
                )}
                {pnPhoto.next !== "" && (
                  <button
                    className="w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center transition-all duration-400"
                    onClick={() => handleNavigation(pnPhoto.next)}
                  >
                    <GrFormNextLink className="w-6 h-6" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Transition />
    </SecuredRoute>
  );
};

export default PhotoDetail;
