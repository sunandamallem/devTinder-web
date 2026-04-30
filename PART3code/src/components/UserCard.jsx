import React from "react";

const UserCard = ({ user }) => {
  if (!user) return null;

  const { firstName, lastName, age, gender, about, photoUrl } = user;

  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      {/* ✅ safe image rendering */}
      {photoUrl ? (
        <figure>
          <img src={photoUrl} alt="photo" />
        </figure>
      ) : (
        <figure>
          <img src="https://via.placeholder.com/300" alt="default" />
        </figure>
      )}

      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>

        <p>{about}</p>

        {age && gender && <p>{age + " " + gender}</p>}

        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
