import { useState } from "react";
import BackButton from "../../components/back-button";
import SecuredRoute from "../../settings/secured-routes";
import Transition from "../../settings/transition";
import { MdCloudUpload } from "react-icons/md";
import Loader from "../../components/loader/loader";
import { db, imageDb } from "../../firebase/firebase-config";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";

export default function AddPhoto() {
  const [image, setImage] = useState<File | null>(null);
  const [imageShow, setImageShow] = useState("");
  const [fileName, setFileName] = useState("No selected file");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const successMessage = "Photo uploaded successfully!";

  const handleClick = () => {
    const inputField = document.querySelector(
      ".input-field"
    ) as HTMLInputElement;
    if (inputField) {
      inputField.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFileName(files[0].name);
      setImage(files[0]);
      setImageShow(URL.createObjectURL(files[0]));
    }
  };

  const clearAllFields = () => {
    setFileName("No selected file");
    setImage(null);
    setImageShow("");
    setDescription("");
    setErrorMessage("");
  };

  const addPhoto = async () => {
    if (!image || description === "") {
      setErrorMessage("All fields must be filled!");
      return;
    }

    setErrorMessage("");

    if (image.type !== "image/jpeg" && image.type !== "image/png") {
      setErrorMessage("Only JPEG and PNG images are supported.");
      return;
    }

    const imgRef = ref(imageDb, `gallery/${fileName}`);
    const contentType =
      image.type === "image/jpeg" ? "image/jpeg" : "image/png";
    const fileReader = new FileReader();
    let url;

    fileReader.onload = async (event: any) => {
      try {
        const fileData = event.target.result;

        if (fileData instanceof ArrayBuffer) {
          setLoading(true);

          const existingFiles = await listAll(ref(imageDb, "gallery"));
          const duplicateFile = existingFiles.items.find(
            (item) => item.name === fileName
          );

          if (duplicateFile) {
            setLoading(false);
            setErrorMessage("A file with the same name already exists.");
            return;
          }

          await uploadBytes(imgRef, fileData, { contentType });
          url = await getDownloadURL(imgRef);
          console.log("Download URL:", url);
          addPhotoToDB(url);

          setLoading(false);
          clearAllFields();
        }
      } catch (error) {
        setErrorMessage("Error uploading image. Please try again.");
        setLoading(false);
      }
    };
    fileReader.readAsArrayBuffer(image);
  };

  const addPhotoToDB = async (url: string) => {
    setLoading(true);
    const docRef = doc(db, "users", "Dmi3Rfay78bU0JORfl9Y7HOiqVw1");

    const newPhotoData = {
      url: url,
      desc: description,
      time: Timestamp.fromDate(new Date()),
    };

    try {
      await updateDoc(docRef, {
        photos: arrayUnion(newPhotoData),
      });
      setErrorMessage(successMessage);
    } catch (error) {
      setErrorMessage("Error uploading image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SecuredRoute isAdd={true}>
      <div className="relative h-full lg:h-screen overflow-x-hidden flex flex-col p-8 sm:p-10 lg:py-12 lg:px-20 xl:py-14 xl:px-32">
        <BackButton isFixed={true} isAdd={true} />
        <div className="h-full w-full flex flex-col p-2 sm:p-4 pt-16 md:p-16 items-center justify-center">
          <div className="flex flex-col lg:flex-row h-full w-full gap-4">
            <form
              action=""
              onClick={handleClick}
              className="flex flex-col justify-center md:h-150 lg:h-full items-center shadow-xl w:full lg:w-1/2 border cursor-pointer rounded-xl p-3 bg-white"
            >
              <input
                type="file"
                accept="image/*"
                className="input-field"
                hidden
                onChange={handleChange}
              />
              {imageShow ? (
                <img
                  src={imageShow}
                  className="w-full h-full object-contain"
                  alt={fileName}
                />
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <MdCloudUpload color="#1475cf" size={60} />
                  <p style={{ fontFamily: "suisseregular" }}>
                    Browse Files to upload
                  </p>
                </div>
              )}
            </form>
            <div className="flex flex-col items-center shadow-xl border rounded-xl h-fit bg-white w:full lg:w-1/2 p-5 gap-5">
              <div className="flex flex-col justify-center items-start gap-1 w-full">
                <p
                  className="text-sm"
                  style={{ fontFamily: "Heebo, sans-serif" }}
                >
                  Image
                </p>
                <input
                  type="text"
                  name="Email"
                  className="bg-gray-300 bg-opacity-25 h-12 w-full px-3 py-7 rounded-xl"
                  placeholder="Email"
                  disabled={true}
                  value={fileName}
                />
              </div>
              <div className="flex flex-col justify-center items-start gap-1 w-full">
                <p
                  className="text-sm"
                  style={{ fontFamily: "Heebo, sans-serif" }}
                >
                  Description
                </p>
                <input
                  type="text"
                  name="Description"
                  className="bg-gray-300 bg-opacity-25 h-12 w-full px-3 py-7 rounded-xl"
                  placeholder="Description"
                  disabled={loading}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              {errorMessage !== "" && (
                <div
                  className={
                    errorMessage === successMessage
                      ? "text-sm text-green-500"
                      : "text-sm text-red-500"
                  }
                >
                  {errorMessage}
                </div>
              )}
              <div className="flex w-full gap-2">
                <button
                  className={
                    !loading
                      ? "bg-black flex justify-center items-center text-white h-10 font-semibold tracking-wider p-2 text-sm w-full rounded-xl text-left hover:opacity-85 transition-all duration-300 active:scale-95"
                      : "bg-slate-400 p-2 flex justify-center rounded-xl transition-all duration-300"
                  }
                  style={{ fontFamily: "HBLight" }}
                  onClick={addPhoto}
                >
                  {!loading ? "UPLOAD" : <Loader />}
                </button>
                <button
                  className="bg-black flex justify-center items-center text-white h-10 font-semibold tracking-wider p-2 text-sm w-full rounded-xl text-left hover:opacity-85 transition-all duration-300 active:scale-95"
                  style={{ fontFamily: "HBLight" }}
                  onClick={clearAllFields}
                >
                  CLEAR
                </button>
              </div>
            </div>
          </div>
        </div>
        <Transition />
      </div>
    </SecuredRoute>
  );
}