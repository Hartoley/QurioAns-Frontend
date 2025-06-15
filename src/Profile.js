import React, { useEffect, useState } from "react";
import DashNav from "./components/ui/DashNav";
import Footer from "./components/ui/Footer";

const ProfileDetails = ({ Home }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("QurioUser");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `https://qurioans.onrender.com/qurioans/getuser/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await response.json();
        setUser(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) {
    return (
      <>
        <DashNav />
        <div className="max-w-4xl mx-auto min-h-[80vh] p-8 mt-16">
          <div className="animate-pulse flex flex-col items-center space-y-6 bg-white p-8 rounded-lg shadow-lg">
            <div className="w-32 h-32 rounded-full bg-gray-300"></div>
            <div className="w-48 h-6 bg-gray-300 rounded"></div>
            <div className="w-64 h-4 bg-gray-300 rounded"></div>
            <div className="w-full space-y-4">
              {[...Array(5)].map((_, idx) => (
                <div key={idx} className="h-4 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <DashNav Home={Home} />
        <div className="max-w-4xl min-h-80 mx-auto p-8 mt-16">
          <p className="text-red-500">{error}</p>
        </div>
        <Footer />
      </>
    );
  }

  const renderValue = (value) =>
    value && value !== "" ? (
      <span className="font-semibold text-gray-900">{value}</span>
    ) : (
      <span className="italic text-gray-400 select-none">Not provided</span>
    );

  return (
    <>
      <DashNav />
      <main className="max-w-4xl mx-auto p-8 mt-16 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <img
            src={
              user.avatarUrl ||
              "https://i.pinimg.com/736x/ee/24/2e/ee242ead34358f14be66d4ffe4992002.jpg"
            }
            alt={`${user.userName}'s avatar`}
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-600 shadow-md"
          />
          <h1 className="text-3xl font-bold mt-6 text-indigo-900">
            {renderValue(user.userName)}
          </h1>
          <p className="text-gray-600 mt-1">{renderValue(user.email)}</p>
        </div>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-indigo-800 mb-3 border-b border-indigo-300 pb-1">
              Personal Information
            </h2>
            <dl className="space-y-4 text-gray-700">
              <div>
                <dt className="font-medium">First Name</dt>
                <dd>{renderValue(user.firstName)}</dd>
              </div>
              <div>
                <dt className="font-medium">Last Name</dt>
                <dd>{renderValue(user.lastName)}</dd>
              </div>
              <div>
                <dt className="font-medium">Phone Number</dt>
                <dd>{renderValue(user.phoneNumber)}</dd>
              </div>
              <div>
                <dt className="font-medium">Role</dt>
                <dd>{renderValue(user.role)}</dd>
              </div>
              <div>
                <dt className="font-medium">Verified</dt>
                <dd>{user.isVerified ? "Yes" : "No"}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-indigo-800 mb-3 border-b border-indigo-300 pb-1">
              Preferences & Security
            </h2>
            <dl className="space-y-4 text-gray-700">
              <div>
                <dt className="font-medium">Dark Mode</dt>
                <dd>{user.darkMode ? "Enabled" : "Disabled"}</dd>
              </div>
              <div>
                <dt className="font-medium">Push Notifications</dt>
                <dd>
                  {user.notificationPreferences?.push ? "Enabled" : "Disabled"}
                </dd>
              </div>
              <div>
                <dt className="font-medium">Email Notifications</dt>
                <dd>
                  {user.notificationPreferences?.email ? "Enabled" : "Disabled"}
                </dd>
              </div>
              <div>
                <dt className="font-medium">Two Factor Authentication</dt>
                <dd>{user.twoFactorEnabled ? "Enabled" : "Disabled"}</dd>
              </div>
            </dl>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProfileDetails;
