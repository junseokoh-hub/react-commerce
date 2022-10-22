import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { authUserAtom } from "../../../store/authAtom";
import { FiEdit3 } from "react-icons/fi";
import { useFireStore } from "../../../hooks/useFirestore";
import { useCollection } from "../../../hooks/useCollection";
import { useMemo } from "react";

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
  const authUser = useRecoilValue(authUserAtom);
  const [isPhoneEdit, setIsPhoneEdit] = useState(false);
  const [isAdEdit, setIsAdEdit] = useState(false);
  const { setDocument } = useFireStore("user_info");
  const { documents: userInfo, error } = useCollection("user_info");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const editPhoneHandler = useCallback(() => {
    setIsPhoneEdit((prev) => !prev);
  }, []);

  const editAdHandler = useCallback(() => {
    setIsAdEdit((prev) => !prev);
  }, []);

  const phoneNumberValidation = {
    required: { value: true, message: "write phone-number" },
    minLength: { value: 9, message: "Number must be at least 9digits" },
  };

  const AddressValidation = {
    required: { value: true, message: "write address" },
    minLength: { value: 2, message: "Address must be at least 2 letters" },
  };

  const submitHandler = handleSubmit((data) => {
    const { uid, displayName, email } = authUser.user;
    const { phoneNumber, address } = data;
    setDocument(uid, {
      displayName,
      email,
      phoneNumber,
      address,
    });
    setIsPhoneEdit(false);
    setIsAdEdit(false);
    reset();
  });

  const myInfo = useMemo(() => {
    return (
      !error &&
      userInfo &&
      userInfo.filter((who) => who.id === authUser.user.uid)[0]
    );
  }, [userInfo]);

  console.log(myInfo);

  return (
    <ProfileInfoFrame>
      <ProfileInfoList>
        <ProfileInfoTitle style={{ fontWeight: "bold", fontSize: "18px" }}>
          닉네임 :
        </ProfileInfoTitle>
        <ProfileInfoContent>{authUser.user.displayName}님</ProfileInfoContent>
      </ProfileInfoList>
      <ProfileInfoList>
        <ProfileInfoTitle>이메일 :</ProfileInfoTitle>
        <ProfileInfoContent>{authUser.user.email}</ProfileInfoContent>
      </ProfileInfoList>
      <ProfileInfoList>
        <ProfileInfoTitle>닉네임 :</ProfileInfoTitle>
        <ProfileInfoContent>{authUser.user.displayName}</ProfileInfoContent>
      </ProfileInfoList>
      <ProfileInfoList>
        <ProfileInfoTitle onClick={editPhoneHandler}>
          전화번호 :
        </ProfileInfoTitle>
        {!isPhoneEdit && (
          <ProfileInfoContent>{myInfo?.phoneNumber}</ProfileInfoContent>
        )}
        {isPhoneEdit && (
          <>
            <ProfileInfoContentEditor
              {...register("phoneNumber", phoneNumberValidation)}
            />
            <FiEdit3 name="phoneNumber_edit" className="edit_btn" />
          </>
        )}
        <p>{errors.phoneNumber?.message}</p>
      </ProfileInfoList>
      <ProfileInfoList>
        <ProfileInfoTitle onClick={editAdHandler}>주소 :</ProfileInfoTitle>
        {!isAdEdit && (
          <ProfileInfoContent>{myInfo?.address}</ProfileInfoContent>
        )}
        {isAdEdit && (
          <>
            <ProfileInfoContentEditor
              {...register("address", AddressValidation)}
            />
            <FiEdit3 name="address_edit" className="edit_btn" />
          </>
        )}
      </ProfileInfoList>
      <button onClick={submitHandler}>저장</button>
    </ProfileInfoFrame>
  );
};

export default MyProfileInfo;
