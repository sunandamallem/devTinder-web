import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user: initialUser }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(initialUser);

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [about, setAbout] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [loading, setLoading] = useState(true);

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch user if not available
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!user) {
          const res = await axios.get(BASE_URL + "/profile/view", {
            withCredentials: true,
          });
          setUser(res.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Sync form when user is available
  useEffect(() => {
    if (user) {
      setfirstName(user.firstName || "");
      setlastName(user.lastName || "");
      setPhotoUrl(user.photoUrl || "");
      setAge(user.age || "");
      setGender(user.gender || "male");
      setAbout(user.about || "");
    }
  }, [user]);

  if (loading) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  if (!user) {
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load profile
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Edit Profile</h2>

              <input
                type="text"
                value={firstName}
                className="input input-bordered my-2"
                placeholder="Enter First Name"
                onChange={(e) => setfirstName(e.target.value)}
              />

              <input
                type="text"
                value={lastName}
                className="input input-bordered my-2"
                placeholder="Enter Last Name"
                onChange={(e) => setlastName(e.target.value)}
              />

              <input
                type="text"
                value={photoUrl}
                className="input input-bordered my-2"
                placeholder="Enter Photo URL"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />

              <input
                type="number"
                value={age}
                className="input input-bordered my-2"
                placeholder="Enter Age"
                onChange={(e) => setAge(e.target.value)}
              />

              <input
                type="text"
                value={about}
                className="input input-bordered my-2"
                placeholder="About you"
                onChange={(e) => setAbout(e.target.value)}
              />

              {/* Gender */}
              <div className="form-control my-3">
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>

                <div className="flex gap-6">
                  <label className="label cursor-pointer gap-2">
                    <span className="label-text">Male</span>
                    <input
                      type="radio"
                      name="gender"
                      className="radio radio-primary"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </label>

                  <label className="label cursor-pointer gap-2">
                    <span className="label-text">Female</span>
                    <input
                      type="radio"
                      name="gender"
                      className="radio radio-primary"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </label>
                </div>
              </div>

              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          className="bg-base-200"
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-right">
          <div className="alert alert-info">
            <span>New mail arrived.</span>
          </div>
          <div className="alert alert-success">
            <span>Message sent successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
