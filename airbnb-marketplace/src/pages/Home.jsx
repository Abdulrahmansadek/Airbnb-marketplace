import house from "../assets/house.jpeg";
import apartment from "../assets/apartment.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="categories-container container mx-auto">
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-1 ">
        <Link to={"/category/apartment"}>
          <div className="apartment">
            <img src={apartment} alt="apartment" className="house-img" />
          </div>
        </Link>

        <Link to={"/category/house"}>
          <div className="houses">
            <img src={house} alt="house" className="house-img" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
