"use client";
import HeadComponent from "@/components/HeadComponent";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { saveMutabaah } from "@/utils/firestore";
import { auth } from "@/utils/auth";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";

let mutabaahData = {
  qiyaamul_lail: false,
  subuh: false,
  subuh_rawatib: false,
  subuh_jamaah: false,
  dhuha: false,
  dhuhur: false,
  dhuhur_rawatib: false,
  dhuhur_jamaah: false,
  ashar: false,
  ashar_rawatib: false,
  ashar_jamaah: false,
  magrib: false,
  magrib_rawatib: false,
  magrib_jamaah: false,
  isya: false,
  isya_rawatib: false,
  isya_jamaah: false,
  tarawih: false,
  infaq_nominal: false,
  tilawah_lembar: 0,
  dzikir_pagi: false,
  dzikir_petang: false,
  finish_mutabaah: false,
};

export default function EvaluatePage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const [mutabaah, setMutabaah] = useState(mutabaahData);
  const [currentEmail, setCurrentEmail] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is logged in:", user.email);
        setCurrentEmail(user.email);
      } else {
        router.push("/login");
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMutabaah({
      ...mutabaah,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(mutabaah);
  };

  async function saveMutabaah(email, date, mutabaahData) {
    try {
      const docRef = doc(db, `mutabaah/${email}/dailyRecords/${date}`);
      await setDoc(docRef, { mutabaahData }, { merge: true });
      console.log("Mutabaah data saved successfully!");
      return { success: true, message: "Mutabaah data saved successfully!" };
    } catch (error) {
      console.error("Error saving data:", error);
      return { success: false, message: "Error saving data", error };
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <title>Isi Mutabaah | Yawmy</title>
      <HeadComponent title={`Mutabaah ${id}`} />
      <h1 className="text-2xl font-bold">Evaluate Item {id}</h1>
      <p>Provide your feedback for this item.</p>
      <Disclosure>
        <DisclosureButton className="py-2">
          Is team pricing available?
        </DisclosureButton>
        <DisclosurePanel className="text-gray-500">
          Yes! You can purchase a license that you can share with your entire
          team.
        </DisclosurePanel>
      </Disclosure>
      <form onSubmit={handleSubmit}>
        {Object.keys(mutabaahData).map((key) => (
          <div key={key}>
            <label>
              {key}:
              {typeof mutabaahData[key] === "boolean" ? (
                <input
                  type="checkbox"
                  name={key}
                  checked={mutabaah[key]}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type={
                    typeof mutabaahData[key] === "number" ? "number" : "text"
                  }
                  name={key}
                  value={mutabaah[key]}
                  onChange={handleChange}
                />
              )}
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
