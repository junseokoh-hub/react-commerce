import React, { useState } from "react";
import Pagination from "../../components/Posts/Pagination";
import { NOTICE_DATA } from "../../lib/notice-data";
const NoticePage = () => {
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);

  const offset = (page - 1) * limit;

  return (
    <>
      <ul>
        {NOTICE_DATA.slice(offset, offset + limit).map((data, index) => (
          <li key={index}>{data.content}</li>
        ))}
      </ul>
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
