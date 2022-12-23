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
  const changeOptionHandler = (e) => {
    if (typeof value === "string") {
      setValue(e.target.value);
    } else if (typeof value === "number") {
      setValue(Number(e.target.value));
    }
  };

  return (
    <Select value={value} onChange={changeOptionHandler}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.content}
        </option>
      ))}
    </Select>
  );
};

export default React.memo(SelectOptions);
