import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionsSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <>
        <div className="text-center">No connections found</div>
      </>
    );
  return (
    <div className="text-center my-10">
      <h1 className="text-bold white text-5xl">Connections</h1>
      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          connections;
        return (
          <div className="flex justify-centerm-4 p-4  rounded-lg bg-base-300 w-1/2 mx-auto">
            <div>
              {" "}
              <img
                alt="photo"
                src={photoUrl}
                className="rounded-full w-20 h-20"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              <p>{age + "  " + gender}</p>
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
