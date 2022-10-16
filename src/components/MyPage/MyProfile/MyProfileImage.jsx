import React, { useCallback, useState } from "react";

const MyProfileImage = () => {
  const [photoUrl, setPhotoUrl] = useState(null);

  const fileChangeHandler = useCallback((e) => {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = (e) => setPhotoUrl(e.target.result);
  }, []);

  return (
    <div>
      {photoUrl === null ? (
        <div
          style={{ width: "100px", height: "100px", background: "blue" }}
        ></div>
      ) : (
        <img
          style={{ width: "100px", height: "100px", display: "block" }}
          src={photoUrl}
          alt="profile_image"
        />
      )}
      <input type="file" onChange={fileChangeHandler} />
    </div>
  );
};

export default MyProfileImage;
