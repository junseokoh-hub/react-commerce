import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import Accordion from "../../components/Accordion/Accordion";
import OutletLayout from "../../components/Layout/OutletLayout";

const DUMMY_DATA = [
  {
    title: "배송은 얼마나 걸리나요?",
    content: "배송 시작 알림 후 3일 이내로 배송이 완료됩니다.",
  },
  {
    title: "고객센터 운영시간은 어떻게 되나요?",
    content:
      "주말(토요일, 일요일) 및 공휴일을 제외한 오전 9시 부터 오후 6시까지 입니다.",
  },
  {
    title: "해외배송은 가능하나요?",
    content: "죄송하지만 해외배송 서비스는 운영하고 있지 않습니다.",
  },
  {
    title: "제품이 파손되었을 때는 어떻게 해야하나요?",
    content:
      "상품 이용에 불편을 드려 죄송합니다. 제품이 파손 또는 손상된 경우에는 고객세터로 전화주시면 감사드리겠습니다.",
  },
  {
    title: "교환/반품/환불은 어떻게 해야 하나요?",
    content:
      "교환 및 반품(환불)은 상품 수령 후 7일 이내에 가능하며 신청하시는 방법은 고객센터로 연락해주시면 감사드리겠습니다. 저희는 소비자 보호를 위해 규정한 제반 법규를 준수하며 반품 배숭비는 반품 사유에 따라 달라지게 됩니다.",
  },
];

const FaqTitle = styled.h3`
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid silver;
  font-weight: bold;
  text-align: center;
`;

const Faq = () => {
  return (
    <OutletLayout>
      <Helmet>
        <title>FAQ</title>
      </Helmet>
      <FaqTitle>자주 묻는 질문</FaqTitle>
      {DUMMY_DATA.map((data) => (
        <Accordion key={data.title} data={data} />
      ))}
    </OutletLayout>
  );
};

export default Faq;
