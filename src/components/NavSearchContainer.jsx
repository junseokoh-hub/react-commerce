import React from "react";
import styled from "styled-components";
import { useMatch } from "react-router-dom";
import { useRecoilState } from "recoil";
import { searchBarAtom } from "../store/searchBarAtom";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useQuery } from "react-query";

const SearchBarContainer = styled.header`
  width: 100%;
  height: ${(props) => props.height};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.orange.lighter};
  z-index: 10;
  ul {
    width: 80%;
    margin: 0 auto;
  }
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    &:nth-of-type(2) {
      flex-direction: column;
    }
  }
`;

const SearchBarList = styled.li`
  input {
    width: 500px;
    border: none;
    outline: none;
    background-color: transparent;
    border-bottom: 1px solid black;
  }
`;

const PouplarKeywordContainer = styled.div`
  display: flex;
`;

const PopularKeyword = styled.h4`
  margin: 0 5px;
  width: 130px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  color: #fff;
  border: 1px solid black;
`;

const PopularImgContainer = styled.li`
  img {
    width: 100px;
    height: 100px;
  }
`;

const NavSearchContainer = () => {
  const [isSearchbar, setIsSearchBar] = useRecoilState(searchBarAtom);
  const homeMatch = useMatch("/");

  const { isLoading, data } = useQuery("products", async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const json = await response.json();
    return json;
  });

  const popularData = data && data.slice(4, 8);

  return (
    <SearchBarContainer height={homeMatch ? "30vh" : "20vh"}>
      <ul>
        <SearchBarList>
          <BsSearch />
          <form>
            <input />
          </form>
          <AiOutlineClose onClick={() => setIsSearchBar(false)} />
        </SearchBarList>
        <li>
          <h3>인기 검색어</h3>
          <PouplarKeywordContainer>
            {!isLoading &&
              popularData &&
              popularData.map((item) => (
                <PopularKeyword key={item.id}>
                  {item.title.split(" ").slice(0, 2).join(" ")}
                </PopularKeyword>
              ))}
          </PouplarKeywordContainer>
        </li>
        <PopularImgContainer>
          {!isLoading &&
            popularData &&
            popularData.map((item) => (
              <img
                key={item.id + item.description}
                src={item.image}
                alt={item.description}
              />
            ))}
        </PopularImgContainer>
      </ul>
    </SearchBarContainer>
  );
};

export default NavSearchContainer;
