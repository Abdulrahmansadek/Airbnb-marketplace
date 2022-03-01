import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { useAuthentication } from "../Hooks/useAuthentication";
import Spinner from "../components/Spinner";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

function Listing() {
  const { isLogged } = useAuthentication();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const listingRef = doc(db, "listings", params.listingId);
      const data = await getDoc(listingRef);
      if (data.exists()) {
        console.log(data.data());
        setListing(data.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="container mx-auto">
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {listing.imagesUrls.map((url, idx) => (
          <SwiperSlide key={idx}>
            <div
              style={{
                background: `url(${listing.imagesUrls[idx]}) center no-repeat`,
                backgroundSize: "cover",
              }}
              className="swiperSlideDiv"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="listingDetails">
        <p className="listingName">
          {listing.name} - $
          {listing.offer ? listing.disscountPrice : listing.regularPrice}
        </p>
        <p className="listingLocation"> {listing.location}</p>
        <p className="listingPerDay"> per day</p>
        {listing.offer && (
          <p className="discountPrice">
            $ {listing.regularPrice - listing.disscountPrice} disscount
          </p>
        )}
        <ul className="listingDetailsList">
          <li>{listing.bedrooms} bedrooms </li>
          <li>{listing.bathrooms} bathrooms </li>
          <li> {listing.parking && "Parking spot"}</li>
          <li> {listing.furnished && "Kitchen"}</li>
          <li> {listing.wifi && "WIFI"}</li>
        </ul>
        <p className="listingLocationTitle"> Location</p>
        <div className="leafletContainer">
          <MapContainer
            style={{ height: "100%", width: "100%" }}
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            />
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>{listing.location}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
}

export default Listing;
