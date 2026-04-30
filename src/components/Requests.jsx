import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <>
        <div className="text-center">No requests found</div>
      </>
    );
  return (
    <div>
      {" "}
      <div className="text-center my-10">
        <h1 className="text-bold white text-5xl">Connection Requests</h1>
        {requests.map((connection) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            request.fromuserId;
          return (
            <div
              key={_id}
              className="flex justify-between items-center m-4 p-4  rounded-lg bg-base-300 w-2/3 mx-auto"
            >
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
              <button className="btn btn-primary mx-2">Primary</button>
              <button className="btn btn-secondary mx-2">Secondary</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
