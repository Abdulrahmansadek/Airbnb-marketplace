import rentHouse from "../assets/rentHouse.jpeg";
import amster from "../assets/amster.jpeg";
import { Link } from "react-router-dom";
import camping from "../assets/camping.png";
import { useAuthentication } from "../Hooks/useAuthentication";
import FeedbackItem from "../components/FeedbackItem";
import AddFeedback from "../components/AddFeedback";
const Home = () => {
  const { isLogged } = useAuthentication();

  return (
    <>
      <div className="pictureHome">
        <img src={camping} className="campingImage" alt={camping} />
      </div>
      <div className="categories-container container mx-auto home">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2  md:grid-cols-1 ">
          <Link to={"/category/apartment"}>
            <div className="apartment">
              <img src={amster} alt="apartment" className="house-img" />
              <div className="apartmentText">
                <h1>Rent your apartment here </h1>
              </div>
              <div className="exploreBtn">
                <button className="btn btn-outline btn-accent">
                  Explore here
                </button>
              </div>
            </div>
          </Link>

          <Link to={"/category/house"}>
            <div className="apartment">
              <img src={rentHouse} alt="house" className="house-img" />
              <div className="apartmentText">
                <h1>Looking for big place to stay ? </h1>
              </div>
              <div className="exploreBtn">
                <button className="btn btn-outline btn-accent">
                  Explore here
                </button>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <FeedbackItem />

      {isLogged && <AddFeedback />}
    </>
  );
};

export default Home;
