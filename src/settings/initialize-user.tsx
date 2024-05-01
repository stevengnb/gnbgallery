import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

interface InitializeUserProps {
  uid: string;
  displayName: string | null;
}

export async function initializeUser({
  uid,
  displayName,
}: InitializeUserProps) {
  const userRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    await setDoc(userRef, {
      username: displayName,
      photos: [],
      profile: "",
      bio: "",
    });
  }
}
