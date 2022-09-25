import React from "react";
import styled from "styled-components";

const Select = styled.select``;

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
