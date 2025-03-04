import { Card, CardBody } from "@nextui-org/react";
import LineChart from "./LineChart";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
const CardStats = ({ text }) => {
  return (
    <Card className="min-w-64" shadow="none">
      <CardBody>
        <h3
          className={`${
            text ? "font-bold text-4xl" : "font-bold text-4xl text-slate-300"
          }`}
        >
          {text ? `GH₵${text}` : "No data"}
        </h3>
      </CardBody>
    </Card>
  );
};
const Content = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          } else {
            console.log("User data not found in Firestore");
          }
          setLoading(false);
        });
        return unsubscribeSnapshot; // Cleanup function to unsubscribe from onSnapshot
      } else {
        setUserDetails(null); // Clear userDetails if no user is authenticated
        console.log("User is not logged in");
        setLoading(false);
      }
    });
    return () => unsubscribe(); // Cleanup function to unsubscribe from onAuthStateChanged
  }, []);
  return (
    <div className="h-full p-5">
      <div className="">
        <p className="text-3xl">Your total balance</p>
        <p className="mt-4 text-xl text-slate-400">Stats</p>
      </div>
      <div className="mt-5 flex gap-x-3">
        {loading ? (
          <p>loading</p>
        ) : (
          <CardStats
            text={userDetails?.balance === 0 ? "0" : userDetails?.balance}
          />
        )}
        <CardStats />
        <CardStats />
      </div>
      <div className="mt-10">
        <LineChart />
      </div>
    </div>
  );
};
export default Content;
