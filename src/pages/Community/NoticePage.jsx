import React, { useState } from "react";
import styled from "styled-components";
import Accordion from "../../components/Accordion/Accordion";
import Pagination from "../../components/Posts/Pagination";
import SelectOptions from "../../components/Posts/SelectOptions";
import { NOTICE_DATA } from "../../lib/notice-data";

const NoticeSelectContainer = styled.div`
  margin-right: 210px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 768px) {
    margin-right: 10px;
  }
  @media screen and (max-width: 480px) {
    select {
      width: 50px;
    }
  }
`;

const NoticeContentContainer = styled.div`
  @media screen and (max-width: 480px) {
    padding: 0 10px;
  }
`;

const noticeOptions = [
  { value: 5, content: "5" },
  { value: 10, content: "10" },
  { value: 20, content: "20" },
];

const NoticePage = () => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const offset = (page - 1) * limit;

  return (
    <>
      <NoticeSelectContainer>
        <SelectOptions
          value={limit}
          setValue={setLimit}
          options={noticeOptions}
        />
      </NoticeSelectContainer>
      <NoticeContentContainer>
        {NOTICE_DATA.slice(offset, offset + limit).map((data, index) => (
          <Accordion key={index} data={data} />
        ))}
      </NoticeContentContainer>
      <Pagination
        total={NOTICE_DATA?.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default NoticePage;
