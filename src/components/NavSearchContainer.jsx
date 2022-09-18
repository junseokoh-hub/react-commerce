import React from "react";
import styled from "styled-components";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { searchBarAtom } from "../store/searchBarAtom";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";

const SearchBarContainer = styled.header`
  width: 100%;
  height: ${(props) => props.height};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
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
    margin: 10px 0;
    color: #fff;
    &:nth-of-type(2) {
      flex-direction: column;
      h3 {
        margin-bottom: 5px;
      }
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
  border: 1px solid #fff;
  cursor: pointer;
`;

const PopularImgContainer = styled.li`
  background-color: #4b2d0b;
  img {
    margin: 0 10px;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border-radius: 50%;
  }
`;

const NavSearchContainer = () => {
  const [isSearchbar, setIsSearchBar] = useRecoilState(searchBarAtom);
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  const homeMatch = useMatch("/");

  const { isLoading, data } = useQuery("products", async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const json = await response.json();
    return json;
  });

  const popularData = data && data.slice(4, 8);

  const searchSubmitHandler = handleSubmit((data) => {
    setIsSearchBar(false);
    navigate(`/search?keyword=${data.searchInput}&search=true`);
    setValue("searchInput", "");
  });

  return (
    <SearchBarContainer height={homeMatch ? "30vh" : "20vh"}>
      <ul>
        <SearchBarList>
          <BsSearch onClick={searchSubmitHandler} />
          <form onSubmit={searchSubmitHandler}>
            <input {...register("searchInput")} />
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
                width={homeMatch ? "100px" : "80px"}
                height={homeMatch ? "100px" : "80px"}
              />
            ))}
        </PopularImgContainer>
      </ul>
    </SearchBarContainer>
  );
};

export default NavSearchContainer;
