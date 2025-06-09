import React from "react";
import UserDash from "../Users/UserDash";
import DashNav from "../components/ui/DashNav";
import Footer from "../components/ui/Footer";
import AdminDash from "../components/ui/AdminDash";

const Admin = () => {
  return (
    <>
      <DashNav />
      <AdminDash />
      <Footer />
    </>
  );
};

export default Admin;
