import React from "react";
import styled from "styled-components";
import { FaYoutube, FaFacebookF } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { BsInstagram } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../../store/authAtom";

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media screen and (max-width: 1000px) {
    justify-content: space-between;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Terms = styled.ul`
  display: flex;
  li {
    font-size: 16px;
    font-weight: bolder;
    color: ${(props) => props.theme.whiteColor};
    cursor: pointer;
    a {
      color: ${(props) => props.theme.whiteColor};
    }
    span {
      margin: 0 10px;
      color: lightgrey;
      font-weight: normal;
    }
  }
  @media screen and (max-width: 1000px) {
    li {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 20px;
    li {
      font-size: 12px;
    }
  }
`;

const MediaLinkContainer = styled.ul`
  display: flex;
  li {
    margin: 0 10px;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.whiteColor};
    border-radius: 50%;
    &.insta {
      border: 1px solid #dd2a7b;
    }
    &.youtube {
      border: 1px solid #ff0000;
    }
    &.facebook {
      border: 1px solid #1877f2;
    }
    &.naver {
      border: 1px solid #04cf5c;
    }
    &.kakao {
      border: 1px solid #fee500;
    }
  }
  svg {
    font-size: 30px;
  }
  @media screen and (max-width: 768px) {
    li {
      width: 35px;
      height: 35px;
    }
    svg {
      font-size: 20px;
    }
  }
`;

const FooterLinks = () => {
  const authUser = useRecoilValue(authUserAtom);
  const navigate = useNavigate();

  const inquiryRedirect = () => {
    if (!authUser.user) {
      if (
        window.confirm(
          `로그인을 하셔야 이용할 수 있는 서비스입니다. 로그인 하시겠습니까?`,
        )
      ) {
        navigate("/login");
      }
    }
    navigate("/partnership-inquiry");
  };

  return (
    <LinkWrapper>
      <Terms>
        <li>
          이용약관 <span>|</span>
        </li>
        <li>
          개인정보처리방침 <span>|</span>
        </li>
        <li>
          <Link to="/community/faq">고객센터</Link> <span>|</span>
        </li>
        <li onClick={inquiryRedirect}>제휴문의</li>
      </Terms>
      <MediaLinkContainer>
        <li className="insta">
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://www.instagram.com"
          >
            <BsInstagram fill="#dd2a7b" />
          </a>
        </li>
        <li className="youtube">
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://www.youtube.com"
          >
            <FaYoutube fill="#FF0000" />
          </a>
        </li>
        <li className="facebook">
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://www.facebook.com"
          >
            <FaFacebookF fill="#1877F2" />
          </a>
        </li>
        <li className="naver">
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://www.naver.com"
          >
            <SiNaver fill="#04CF5C" />
          </a>
        </li>
        <li className="kakao">
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://www.kakao.com"
          >
            <RiKakaoTalkFill fill="#FEE500" />
          </a>
        </li>
      </MediaLinkContainer>
    </LinkWrapper>
  );
};

export default FooterLinks;
