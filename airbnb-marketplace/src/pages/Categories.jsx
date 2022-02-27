import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { ToastContainer } from "react-toastify";

function Categories() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");

        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),

          limit(10)
        );

        const querySnap = await getDocs(q);
        let listingsArr = [];
        querySnap.forEach((doc) => {
          return listingsArr.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listingsArr);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, [params.categoryName]);

  return (
    <div>
      <p>{params.categoryName === "apartment" ? "apartments" : "Houses"}</p>

      {loading ? (
        <h1>loading...</h1>
      ) : listings && listings.length > 0 ? (
        <>
          <ul>
            {listings.map((listing) => (
              <ListingItem
                key={listing.id}
                listing={listing.data}
                id={listing.id}
              />
            ))}
          </ul>
        </>
      ) : (
        <p>no listings {params.categoryName}</p>
      )}
    </div>
  );
}

export default Categories;
