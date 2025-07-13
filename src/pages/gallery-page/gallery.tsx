import Transition from "../../settings/transition";
import BackButton from "../../components/back-button";
import { useContext, useState, useEffect, useRef, useCallback } from "react";
import Loader from "../../components/loader/loader";
import SecuredRoute from "../../settings/secured-routes";
import AddButton from "../../components/add-button";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/data-context";
import { getId } from "../../settings/get-id";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  onClick: () => void;
  index: number;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({ src, alt, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  return (
    <div
      ref={imgRef}
      className="relative hover:cursor-pointer mb-6 sm:mb-8"
      onClick={onClick}
    >
      <div
        className={`absolute inset-0 bg-gray-400 transition-opacity duration-300 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      >
        {" "}
        <div className="w-full h-full bg-gray-400 animate-pulse"></div>
      </div>

      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`relative w-full h-full object-cover object-center pointer-events-none transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {hasError && (
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
          <div className="text-gray-500 text-sm">⚠️</div>
        </div>
      )}
    </div>
  );
};

export default function Gallery() {
  const navigate = useNavigate();
  const {
    userData,
    photos,
    loading,
    limitedPhotos,
    displayCount,
    loadMorePhotos,
  } = useContext(DataContext);

  return (
    <SecuredRoute>
      <div className="relative h-screen overflow-x-hidden flex flex-col p-8 sm:p-10 lg:py-12 lg:px-20 xl:py-14 xl:px-32">
        <BackButton isFixed={true} />
        <AddButton />
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
                  <ProgressiveImage
                    key={index}
                    src={photo.url}
                    alt={`Photo ${index}`}
                    index={index}
                    onClick={() => navigate(`/stevengnb/${getId(photo.url)}`)}
                  />
                ))}
              </div>
              <div className="w-full flex items-center justify-center">
                {photos.length > displayCount && (
                  <button
                    onClick={loadMorePhotos}
                    style={{ fontFamily: "suisseregular" }}
                    className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:opacity-90 transition-colors duration-300"
                  >
                    Load More
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Transition />
    </SecuredRoute>
  );
}
