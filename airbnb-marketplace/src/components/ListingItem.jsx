import React from "react";
import { Link } from "react-router-dom";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";

function ListingItem({ listing, id }) {
  return (
    <li className="categoryListing">
      <Link
        to={`/category/${listing.type}/${id}`}
        className="categoryListingLink"
      >
        <img
          src={listing.imagesUrls[0]}
          alt={listing.name}
          className="categoryListingImg"
        />
        <div className="categoryListingDetails">
          <p className="categoryListingName">{listing.name}</p>
          <p className="categoryListingLocation">{listing.location}</p>
          <p className="categoryListingPrice">
            {listing.offer ? listing.disscountPrice : listing.regularPrice}/ per
            Night
          </p>
          <div className="listingIcons">
            <img src={bedIcon} alt={listing.name} />
            <p className="iconText">{listing.bedrooms} bedrooms</p>
            <img src={bathtubIcon} alt={listing.name} />
            <p className="iconText">{listing.bedrooms} bathrooms</p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ListingItem;
