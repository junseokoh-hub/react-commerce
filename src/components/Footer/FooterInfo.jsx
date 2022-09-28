import React, { useCallback } from "react";
import styled from "styled-components";
import { IoIosArrowUp } from "react-icons/io";

const InfoContainer = styled.article`
  padding-left: 120px;
  margin-top: 10px;
  position: relative;
  color: ${(props) => props.theme.whiteColor};
  li {
    margin-bottom: 10px;
  }
  @media screen and (max-width: 1000px) {
    padding-left: 0px;
  }
  @media screen and (max-width: 768px) {
    li {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 480px) {
    li {
      font-size: 10px;
    }
  }
`;

const ArrowContainer = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.orange.normal};
  cursor: pointer;
  .arrow_up {
    font-size: 40px;
  }
  @media screen and (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 10px;
    .arrow_up {
      font-size: 20px;
    }
  }
`;

const FooterInfo = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <InfoContainer>
      <ul>
        <li>전화번호 : XX-XXX-XXXX</li>
        <li>
          운영시간 : 월-금 10:00 - 18:30(점심시간 12::00-13:00/주말,공휴일 휴무)
        </li>
      </ul>

      <ul>
        <li>회사명 : xx</li>
        <li>대표 : xxx</li>
        <li>사업자등록번호 : xxx-xx-xxxxx</li>
        <li>팩스 : xx-xxxx-xxxx</li>
        <li>주소 : 서울특별시 </li>
      </ul>
      <ArrowContainer onClick={scrollToTop}>
        <IoIosArrowUp className="arrow_up" />
        맨위로
      </ArrowContainer>
    </InfoContainer>
  );
};

export default FooterInfo;
