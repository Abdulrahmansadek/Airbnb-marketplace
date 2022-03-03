import { useState } from "react";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function AddFeedback() {
  const auth = getAuth();
  const [addFeedback, setAddFeedback] = useState({
    id: auth.currentUser.uid,
    name: auth.currentUser.displayName,
    title: "",
    rate: 5,
  });
  const { id, name, title, rate } = addFeedback;

  const handleChange = (e) => {
    setAddFeedback((prev) => ({
      ...prev,
      id,
      name,
      title: e.target.value,
    }));
  };
  const rateChange = (e) => {
    setAddFeedback((prev) => ({
      ...prev,
      rate: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === "" || title.length <= 10) {
      toast.error("the text review should be longer");
    } else {
      const feedbackRef = await addDoc(
        collection(db, "feedbacks"),
        addFeedback
      );
    }
  };
  return (
    <div className="reviewForm">
      <form className="addReviewForm" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          id="text"
          type="text"
          placeholder="Add your review here"
          className="input input-bordered input-lg w-full max-w-xs"
        />
        <div className="rating" onChange={rateChange}>
          <input
            value={2}
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            value={2}
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            value={3}
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            value={4}
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            value={5}
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
        </div>
        <div className="reviewBtn">
          <button className="btn btn-success"> Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddFeedback;
