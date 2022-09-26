import React from "react";
import styled from "styled-components";
import { FaYoutube, FaFacebookF } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Terms = styled.ul`
  display: flex;
  li {
    font-size: 20px;
    font-weight: bolder;
    color: ${(props) => props.theme.whiteColor};
    a {
      color: ${(props) => props.theme.whiteColor};
    }
    span {
      margin: 0 10px;
      color: lightgrey;
      font-weight: normal;
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
`;

const FooterLinks = () => {
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
        <li>제휴문의</li>
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
