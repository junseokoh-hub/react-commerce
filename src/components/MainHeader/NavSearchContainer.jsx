import React from "react";
import styled from "styled-components";
import { useMatch, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { searchBarAtom } from "../../store/searchBarAtom";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { fetchProducts } from "../../lib/api";
import { useCallback } from "react";

const SearchBarContainer = styled.header`
  width: 100%;
  min-height: 40vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    ${(props) => props.theme.orange.lighter},
    ${(props) => props.theme.orange.normal}
  );
  z-index: 10000;
  li {
    margin: 30px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    &:nth-of-type(2) {
      flex-direction: column;
      h3 {
        margin-bottom: 5px;
      }
    }
  }
  @media screen and (max-width: 480px) {
    min-height: 15vh;
    h3 {
      display: none;
    }
  }
`;

const SearchBarList = styled.li`
  input {
    margin-left: 5px;
    padding-left: 10px;
    width: 500px;
    border: none;
    outline: none;
    background-color: transparent;
    border-bottom: 1px solid ${(props) => props.theme.whiteColor};
    color: ${(props) => props.theme.whiteColor};
    &:-webkit-autofill {
      /* -webkit-box-shadow: 0 0 0 1000px ${(props) =>
        props.theme.orange.lighter}
        inset !important; */
      box-shadow: 0 0 0 1000px ${(props) => props.theme.orange.lighter} inset !important;
      -webkit-text-fill-color: #fff !important;
    }
  }
  @media screen and (max-width: 1000px) {
    input {
      width: 600px;
    }
  }
  @media screen and (max-width: 480px) {
    input {
      width: 300px;
    }
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
  @media screen and (max-width: 1000px) {
    width: 100px;
    font-size: 12px;
  }
  @media screen and (max-width: 768px) {
    width: 80px;
    font-size: 10px;
  }
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const PopularImgContainer = styled.li`
  display: flex;
  width: 100%;
  img {
    margin: 0 10px;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border-radius: 50%;
    cursor: pointer;
  }
  @media screen and (max-width: 1000px) {
    img {
      width: 80px;
      height: 80px;
    }
  }
  @media screen and (max-width: 768px) {
    display: none !important;
    img {
      display: none !important;
    }
  }
`;

const NavSearchContainer = () => {
  const setIsSearchBar = useSetRecoilState(searchBarAtom);
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  const homeMatch = useMatch("/");

  const { isLoading, data } = useQuery("products", fetchProducts);

  const popularData = data && data.slice(4, 12);

  const searchSubmitHandler = handleSubmit((data) => {
    if (data.searchInput === "") {
      return;
    } else {
      setIsSearchBar(false);
      navigate(`/search?keyword=${data.searchInput}&search=true`);
      setValue("searchInput", "");
    }
  });

  const navigateToProductsHandler = useCallback(() => {
    navigate("/products");
    setIsSearchBar(false);
  }, []);

  return (
    <SearchBarContainer>
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
                <PopularKeyword
                  key={item.id}
                  onClick={navigateToProductsHandler}
                >
                  {item.title.split(" ").slice(0, 2).join(" ")}
                </PopularKeyword>
              ))}
          </PouplarKeywordContainer>
        </li>
        <PopularImgContainer>
          {!isLoading &&
            popularData &&
            popularData.map(({ id, description, image }) => (
              <img
                key={id + description}
                src={image}
                alt={description}
                width={homeMatch ? "100px" : "50px"}
                height={homeMatch ? "100px" : "50px"}
                onClick={navigateToProductsHandler}
              />
            ))}
        </PopularImgContainer>
      </ul>
    </SearchBarContainer>
  );
};

export default NavSearchContainer;
