import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { appAuth, storage } from "../../../lib/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { authUserAtom } from "../../../store/authAtom";
import { updateProfile } from "firebase/auth";

const ProfileImgContainer = styled.div`
  display: flex;
`;

const ProfileImg = styled.img`
  margin-bottom: 20px;
  width: 200px;
  height: 200px;
  display: block;
  border-radius: 50%;
`;

const NoProfileImg = styled(ProfileImg)`
  background-color: ${(props) => props.theme.brown.normal};
`;

const SaveBtn = styled.button`
  width: 50px;
  height: 30px;
  border: 1px solid ${(props) => props.theme.orange.lighter};
  background-color: ${(props) => props.theme.orange.normal};
  color: ${(props) => props.theme.whiteColor};
  &:active {
    background-color: ${(props) => props.theme.brown.normal};
  }
`;

const MyProfileImage = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [authUser, setAuthuser] = useRecoilState(authUserAtom);

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
    <ProfileImgContainer>
      <div>
        {authUser.user.photoURL === null ? (
          <NoProfileImg as="div" />
        ) : (
          <ProfileImg src={authUser.user.photoURL} alt="profile_image" />
        )}
        <input type="file" onChange={changeImageHandler} />
        <SaveBtn onClick={uploadImageHandler}>저장</SaveBtn>
      </div>

      <h3 style={{ fontWeight: "bold", fontSize: "18px" }}>닉네임 :</h3>
      <span>{authUser.user.displayName}님</span>
    </ProfileImgContainer>
  );
};

export default MyProfileImage;
