import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/data-context";
import Loader from "../../components/loader/loader";
import SecuredRoute from "../../settings/secured-routes";
import Transition from "../../settings/transition";
import BackButton from "../../components/back-button";

export default function PhotoDetail() {
  const { photoId } = useParams<{ photoId: string }>();
  const { userData, photos, loading } = useContext(DataContext);
  const [photo, setPhoto] = useState([] as any);

  const getDetail = () => {
    const photoData = photos.find((item: any) => item.url.includes(photoId));
    if (photoData) {
      setPhoto(photoData);
    }
  };

  useEffect(() => {
    getDetail();
  }, [photos]);

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = date.toLocaleDateString("en-US", options);

    return `${formattedDate}`;
  };

  return (
    <SecuredRoute>
      <div className="relative w-screen h-screen overflow-x-hidden justify-center items-center flex flex-col py-20 md:p-10">
        <BackButton isFixed={true} isDetail={true} />
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full h-full flex flex-col items-center">
            <div className="max-h-170 md:h-170 2xl:h-140 flex justify-center">
              <img
                src={photo.url}
                alt="Photo"
                className="max-h-full pointer-events-none"
              />
            </div>
            <div className="h-full p-6 w-full lg:w-1/2 flex flex-col items-start gap-2 md:gap-6">
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
            </div>
          </div>
        )}
      </div>
      <Transition />
    </SecuredRoute>
  );
}
