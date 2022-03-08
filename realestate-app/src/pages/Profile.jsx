import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Profile() {
  const auth = getAuth();
  const [userData, setUserData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = userData;
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <>
      <div className="profile container mx-auto">
        <div className="profileHeader">
          <h4 className="pageHeader"> My profile</h4>
        </div>
        <div className="signOutBtn">
          <button
            type="button"
            className="btn btn-outline btn-error"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
      <div className="information container mx-auto">
        <ul className="informationList">
          <li>{name}</li>
          <li>{email}</li>
        </ul>
      </div>
    </>
  );
}

export default Profile;
