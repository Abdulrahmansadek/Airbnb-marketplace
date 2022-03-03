import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmitForgetPassword = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    toast.success("email has been sent!");
    navigate("/sign-in");
    try {
    } catch (error) {
      toast.error("email is not sent please try again!!");
    }
  };
  return (
    <div className="container mx-auto pageContainer  aboutContainer">
      <header>
        <p className="pageHeader"> Forgot Password</p>
      </header>
      <main className="container mx-auto ">
        <form onSubmit={handleSubmitForgetPassword} className="form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            className="forgetPasswordForm "
          />
          <div className="forgetButton">
            <div className="forgetText">
              <h1> Send Reset Link</h1>
            </div>
            <button className="btn btn-error"> send</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgetPassword;
