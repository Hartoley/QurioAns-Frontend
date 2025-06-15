import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashNav from "./DashNav";
import Footer from "./Footer";

const SpinnerLoader = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
  </div>
);

const SkeletonBlock = ({ className }) => (
  <div
    className={`bg-gray-300 animate-pulse rounded ${className}`}
    aria-hidden="true"
  />
);

const SkeletonLoader = () => (
  <>
    <DashNav skeleton />
    <main className="max-w-5xl mt-16 mx-auto px-4 py-10 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:space-x-6">
          {/* Sidebar skeleton */}
          <div className="md:w-1/3 flex flex-col items-center space-y-4">
            <SkeletonBlock className="w-24 h-24 rounded-full" />
            <SkeletonBlock className="w-32 h-6" />
            <SkeletonBlock className="w-40 h-4" />
            <SkeletonBlock className="w-full h-8 mt-4 rounded-lg" />
          </div>
          {/* Form skeleton */}
          <div className="mt-8 md:mt-0 md:flex-1 space-y-6">
            <SkeletonBlock className="h-8 w-40 mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SkeletonBlock className="h-12 w-full" />
              <SkeletonBlock className="h-12 w-full" />
              <SkeletonBlock className="h-12 w-full" />
              <SkeletonBlock className="h-12 w-full" />
            </div>
            <SkeletonBlock className="h-12 w-1/3 rounded-lg mt-8" />
          </div>
        </div>
      </div>
    </main>
    <Footer skeleton />
  </>
);

const ProfileSetup = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("QurioUser");

  useEffect(() => {
    if (!userId) return navigate("/login");

    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `https://qurioans.onrender.com/qurioans/getuser/${userId}`
        );
        setUser(res.data.data);

        setFormData({
          firstName: res.data.data.firstName || "",
          lastName: res.data.data.lastName || "",
          phoneNumber: res.data.data.phoneNumber || "",
          password: "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, val]) =>
      submitData.append(key, val)
    );
    if (avatar) submitData.append("image", avatar);

    try {
      const res = await axios.put(
        `https://qurioans.onrender.com/qurioans/updateuser/${userId}`,
        submitData
      );
      alert("Profile updated successfully!");
      setUser(res.data.user);
    } catch (err) {
      alert("Update failed");
      console.error(err);
    }
  };

  if (loading) return <SkeletonLoader />;

  return (
    <>
      <DashNav />
      <div className="flex mt-14 justify-center items-start min-h-screen px-4 py-10 bg-[rgb(240,245,255)]">
        <div className="bg-white w-full max-w-5xl rounded-lg shadow-xl flex flex-col md:flex-row overflow-hidden">
          {/* Sidebar */}
          <div className="md:w-1/3 bg-white border-r p-6 flex flex-col items-center">
            <img
              src={
                avatarPreview ||
                user?.avatarUrl ||
                "https://i.pinimg.com/736x/ee/24/2e/ee242ead34358f14be66d4ffe4992002.jpg"
              }
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border-2 border-[rgb(6,4,52)]"
            />
            <p className="mt-4 font-semibold text-lg text-center text-[rgb(6,4,52)]">
              {user?.userName}
            </p>
            <p className="text-sm text-gray-600 text-center">{user?.email}</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="mt-4 text-sm text-gray-600"
            />
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="md:w-2/3 p-6 bg-white">
            <h2 className="text-2xl font-bold mb-6 text-[rgb(6,4,52)]">
              Profile
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-[rgb(6,4,52)]"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-[rgb(6,4,52)]"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-[rgb(6,4,52)]"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-[rgb(6,4,52)]"
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="px-6 py-2 bg-[rgb(6,4,52)] text-white rounded-lg hover:opacity-90 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileSetup;
