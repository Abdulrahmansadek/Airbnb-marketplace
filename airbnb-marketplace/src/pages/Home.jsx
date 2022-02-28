import houses from "../assets/houses.jpeg";
import apartment from "../assets/apartment.png";
import { Link } from "react-router-dom";
import camping from "../assets/camping.png";

const Home = () => {
  return (
    <>
      <div className="pictureHome">
        <img src={camping} className="campingImage" />
      </div>
      <div className="categories-container container mx-auto home">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2  md:grid-cols-1 ">
          <Link to={"/category/apartment"}>
            <div className="apartment">
              <img src={apartment} alt="apartment" className="house-img" />
            </div>
          </Link>

          <Link to={"/category/house"}>
            <div className="houses">
              <img src={houses} alt="house" className="house-img" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
