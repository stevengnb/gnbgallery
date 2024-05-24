import { useState } from "react";
import Loader from "../../components/loader/loader";
import { formatDate } from "../../settings/format-date";

export default function RequestCard({
  photo,
  deletePhoto,
  addPhoto,
}: {
  photo: any;
  deletePhoto: any;
  addPhoto: any;
}) {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);

  const handleDelete = async () => {
    setLoadingDelete(true);
    await deletePhoto(photo.fromId, photo.index);
    setLoadingDelete(false);
  };

  const handleAdd = async () => {
    setLoadingAdd(true);
    await addPhoto(photo);
    setLoadingAdd(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between shadow-md border rounded-xl bg-white p-5 w-full gap-5">
      <div className="h-80 md:h-72 md:w-1/2 flex items-center">
        <img src={photo.url} className="max-h-full rounded-xl" alt="Photo" />
      </div>
      <div className="flex flex-col md:justify-around gap-2 md:gap-5 w-full md:w-1/2 h-full">
        <div className="flex flex-col text-left">
          <p style={{ fontFamily: "suisseregular" }}>
            Description <br />
            {photo.desc}
          </p>
          <br />
          <p
            className="text-sm tracking-wide"
            style={{ fontFamily: "suisseregular" }}
          >
            Date
            <br />
            {formatDate(new Date(photo.time).toString())}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            className={
              "bg-red-700 flex justify-center items-center text-white h-10 font-semibold tracking-wider p-2 text-sm w-full rounded-xl text-left hover:opacity-85 transition-all duration-300 active:scale-95"
            }
            onClick={handleDelete}
            disabled={loadingDelete || loadingAdd}
          >
            {loadingDelete ? <Loader /> : "Delete"}
          </button>
          <button
            className={
              "bg-green-700 flex justify-center items-center text-white h-10 font-semibold tracking-wider p-2 text-sm w-full rounded-xl text-left hover:opacity-85 transition-all duration-300 active:scale-95"
            }
            onClick={handleAdd}
            disabled={loadingDelete || loadingAdd}
          >
            {loadingAdd ? <Loader /> : "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
}
