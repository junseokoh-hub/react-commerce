import React, { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { appAuth, storage } from "../../../lib/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { authUserAtom } from "../../../store/authAtom";
import { updateProfile } from "firebase/auth";

const MyProfileImage = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [authUser, setAuthuser] = useRecoilState(authUserAtom);

  // const update = useCallback(() => {
  //   updateProfile(appAuth.currentUser, {
  //     photoURL,
  //   })
  //     .then(() => {
  //       setAuthuser((prev) => ({ ...prev, photoURL }));
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  // }, [photoURL, setAuthuser]);
  // console.log(authUser.user);

  const changeImageHandler = useCallback((e) => {
    setImageUpload(e.target.files[0]);
  }, []);

  const uploadImageHandler = useCallback(() => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `user_images/${authUser.user.uid}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        updateProfile(appAuth.currentUser, {
          photoURL: url,
        })
          .then(() => {
            setAuthuser((prev) => ({ ...prev, photoURL: url }));
          })
          .catch((err) => {
            throw err;
          });
      });
    });
  }, []);

  return (
    <div>
      {authUser.user.photoURL === null ? (
        <div
          style={{ width: "100px", height: "100px", background: "blue" }}
        ></div>
      ) : (
        <img
          style={{ width: "100px", height: "100px", display: "block" }}
          src={authUser.user.photoURL}
          alt="profile_image"
        />
      )}
      <span>{authUser.user.displayName}님</span>
      <input type="file" onChange={changeImageHandler} />
      <button onClick={uploadImageHandler}>저장</button>
    </div>
  );
};

export default MyProfileImage;
