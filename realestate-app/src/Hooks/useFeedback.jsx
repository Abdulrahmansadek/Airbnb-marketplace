import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase.config";

export const useFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const feedbackArr = [];
        const feedbackRef = collection(db, "feedbacks");
        const snapshot = await getDocs(feedbackRef);
        snapshot.forEach((doc) => {
          feedbackArr.push(doc.data());
          setFeedback(feedbackArr);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
    setLoading(true);
  }, []);

  return { feedback };
};
export default useFeedback;
