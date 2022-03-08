import { Link } from "react-router-dom";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";

function ListingItem({ listing, id }) {
  return (
    <>
      <Link
        to={`/category/${listing.type}/${id}`}
        className="categoryListingLink"
      >
        <li className="categoryListing container mx-auto">
          <img
            src={listing.imagesUrls[0]}
            alt={listing.name}
            className="categoryListingImg"
          />
          <div className="categoryListingDetails ">
            <p className="categoryListingName">{listing.name}</p>
            <p className="categoryListingLocation">{listing.location}</p>
            <p className="categoryListingPrice">
              {listing.offer ? listing.disscountPrice : listing.regularPrice}/
              per Night
            </p>
            <div className="listingIcons ">
              <img src={bedIcon} alt={listing.name} />
              <p className="iconText">{listing.bedrooms} bedrooms</p>
              <img src={bathtubIcon} alt={listing.name} />
              <p className="iconText">{listing.bedrooms} bathrooms</p>
            </div>
          </div>
        </li>
      </Link>
    </>
  );
}

export default ListingItem;
