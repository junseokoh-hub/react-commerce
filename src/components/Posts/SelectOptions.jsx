import React from "react";
import styled from "styled-components";

const Select = styled.select`
  padding-left: 5px;
  width: 100px;
  height: 40px;
  border-radius: 5px;
  & + & {
    margin-left: 10px;
  }
  option {
    background-color: aliceblue;
  }
`;

const SelectOptions = ({ value, setValue, options }) => {
  return (
    <Select value={value} onChange={(e) => setValue(e.target.value)}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.content}
        </option>
      ))}
    </Select>
  );
};

export default React.memo(SelectOptions);
