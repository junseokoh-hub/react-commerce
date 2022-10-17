import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { authUserAtom } from "../../../store/authAtom";
import { FiEdit3 } from "react-icons/fi";
import { updateProfile } from "firebase/auth";
import { appAuth } from "../../../lib/firebaseConfig";

const ProfileInfoFrame = styled.ul`
  margin-top: 20px;
`;

const ProfileInfoList = styled.li`
  margin: 25px 0;
  display: flex;
  align-items: center;
`;

const ProfileInfoTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

const ProfileInfoContent = styled.p`
  margin-left: 10px;
`;

const ProfileInfoContentEditor = styled.input`
  background-color: #ddd;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
`;

const MyProfileInfo = () => {
  const [authUser, setAuthUser] = useRecoilState(authUserAtom);
  const [isEdit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const editHandler = useCallback(() => {
    setIsEdit((prev) => !prev);
  }, []);

  const submitContentHandler = handleSubmit((data) => {
    if (data.phoneNumber.includes("-")) return;
    updateProfile(appAuth.currentUser, {
      phoneNumber: data.phoneNumber,
    })
      .then(() => {
        setAuthUser((prev) => ({ ...prev, phoneNumber: data.phoneNumber }));
      })
      .catch((error) => {
        throw error;
      });
    setValue("phoneNumber", "");
  });

  const phoneNumberValidation = {
    minLength: { value: 9, message: "Number must be at least 9digits" },
  };

  return (
    <ProfileInfoFrame>
      <ProfileInfoList>
        <ProfileInfoTitle>이메일 :</ProfileInfoTitle>
        <ProfileInfoContent>{authUser.user.email}</ProfileInfoContent>
      </ProfileInfoList>
      <ProfileInfoList>
        <ProfileInfoTitle>닉네임 :</ProfileInfoTitle>
        <ProfileInfoContent>{authUser.user.displayName}</ProfileInfoContent>
      </ProfileInfoList>
      <ProfileInfoList>
        <ProfileInfoTitle onClick={editHandler}>전화번호 :</ProfileInfoTitle>
        {!isEdit && (
          <ProfileInfoContent>{authUser.user.phoneNumber}</ProfileInfoContent>
        )}
        {isEdit && (
          <>
            <ProfileInfoContentEditor
              {...register("phoneNumber", phoneNumberValidation)}
            />
            <FiEdit3 className="edit_btn" onClick={submitContentHandler} />
          </>
        )}
        <p>{errors.phoneNumber?.message}</p>
      </ProfileInfoList>
      <ProfileInfoList>
        <ProfileInfoTitle>주소 :</ProfileInfoTitle>
        <ProfileInfoContent></ProfileInfoContent>
        <ProfileInfoContentEditor {...register("Address")} />
      </ProfileInfoList>
    </ProfileInfoFrame>
  );
};

export default MyProfileInfo;
