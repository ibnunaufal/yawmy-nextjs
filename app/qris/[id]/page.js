import { doc, getDoc } from "@firebase/firestore";
import db from "@/utils/firestore";
import QrisPage from "./QrisPage";

export async function generateMetadata({ params }) {
  // Ensure params is awaited properly
  const id = params?.id; 
  if (!id) {
    return {
      title: "QRIS Page",
      description: "Detail of QRIS page",
    };
  }

  // Fetch data from Firestore
  const qrisRef = doc(db, "infaqris", id);
  try {
    const docSnap = await getDoc(qrisRef);
    if (docSnap.exists()) {
      return {
        title: `QRIS ${docSnap.data().name}` || "QRIS Page",
        description: `Detail of QRIS: ${docSnap.data().name}`,
      };
    }
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }

  return {
    title: "QRIS Page",
    description: "Detail of QRIS page",
  };
}
export default function Page({ params }) {
  return <QrisPage id={params.id} />;
}

