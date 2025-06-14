import React from "react";
import DashNav from "../components/ui/DashNav";
import Footer from "../components/ui/Footer";
import DashContent from "../components/ui/DashContent";
import { useNavigate } from "react-router-dom";

const UserDash = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("QurioUser");
  const Home = () => {
    navigate(`/dashboard/${userId}`);
  };

  return (
    <>
      <DashNav Home={Home} />
      <DashContent Home={Home} />
      <Footer />
    </>
  );
};

export default UserDash;
