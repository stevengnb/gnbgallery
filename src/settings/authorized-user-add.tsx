import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export async function authorizeUser(): Promise<string | null> {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    let authorizedUserId: string | null = null;

    querySnapshot.forEach((doc) => {
      if (doc.data().photos.length > 0) {
        authorizedUserId = doc.id;
        return;
      }
    });

    return authorizedUserId;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
