import { jwtDecode } from "jwt-decode";
import { Helmet } from "react-helmet";

export default function Profile() {
  const decoded = jwtDecode(localStorage.getItem("userToken"));

  return (
    <>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Profile Page" />
      </Helmet>
      <div className="container align-items-center d-flex justify-content-center align-items-center m-auto vh-100">
        <div className="col-md-9 text-end">
          <h2 className="px-3 py-2 btn bg-main text-light fw-bold rounded-2 w-100">
            {" "}
            Hi,{" "}
            <span className="text-white">{decoded.name.toUpperCase()}!</span>
          </h2>
        </div>
      </div>
    </>
  );
}
