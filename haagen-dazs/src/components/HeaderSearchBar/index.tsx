import React, { useState, useEffect } from "react";

import * as S from "./style";

const inputChangeHandle = (
  e: React.ChangeEvent<HTMLInputElement>,
  setKeyword: (keyword: string) => void
) => {
  setKeyword(e.target.value);
};

const inputBlurHandle = (
  e: React.ChangeEvent<HTMLInputElement>,
  setKeyword: (keyword: string) => void,
  setKeywordsList: (keywordsList: string[]) => void,
  keywordsList: string[],
  keyword: string
) => {
  if (e.target.value !== "") {
    const addedKeywordsList = [...keywordsList, keyword];
    setKeywordsList(addedKeywordsList);
    setKeyword("");
    e.target.value = "";
  }
};

const inputKeyDownHandle = (
  e: React.KeyboardEvent<HTMLInputElement>,
  keyword: string,
  keywordsList: string[],
  setKeywordsList: (keywordsList: string[]) => void,
  setKeyword: (keyword: string) => void,
  handleChangeDaejeonCheckbox: () => void,
  handleChangeNationwideCheckbox: () => void,
  handleChangeUnpaidCheckbox: () => void,
  handleChangeNotArrivedCheckbox: () => void,
  handleChangeGeneralCheckbox: () => void,
  handleChangeSocialIntegrationCheckbox: () => void,
  handleChangeMeisterCheckbox: () => void
) => {
  if (e.keyCode === 8 && keyword === "") {
    const popedKeyWordsList = [...keywordsList];
    const deletedWord = popedKeyWordsList.pop();
    setKeywordsList(popedKeyWordsList);

    switch (deletedWord) {
      case "대전":
        handleChangeDaejeonCheckbox();
        break;
      case "전국":
        handleChangeNationwideCheckbox();
        break;
      case "미납자":
        handleChangeUnpaidCheckbox();
        break;
      case "원서 미도착":
        handleChangeNotArrivedCheckbox();
        break;
      case "일반전형":
        handleChangeGeneralCheckbox();
        break;
      case "사회통합":
        handleChangeSocialIntegrationCheckbox();
        break;
      case "마이스터전형":
        handleChangeMeisterCheckbox();
        break;
      default:
        break;
    }
  } else if (e.keyCode === 13 && keyword !== "") {
    const addedKeywordsList = [...keywordsList, keyword];
    setKeywordsList(addedKeywordsList);
    setKeyword("");
    e.currentTarget.value = "";
  }
};

interface Props {
  isDaejeonSelected: boolean;
  isNationwideSelected: boolean;
  isUnpaidSelected: boolean;
  isNotArrivedSelected: boolean;
  isGeneralSelected: boolean;
  isSocialIntegrationSelected: boolean;
  isMeisterSelected: boolean;
  handleChangeDaejeonCheckbox: () => void;
  handleChangeNationwideCheckbox: () => void;
  handleChangeUnpaidCheckbox: () => void;
  handleChangeNotArrivedCheckbox: () => void;
  handleChangeGeneralCheckbox: () => void;
  handleChangeSocialIntegrationCheckbox: () => void;
  handleChangeMeisterCheckbox: () => void;
}

const HeaderSearchBar: React.FC<Props> = ({
  isDaejeonSelected,
  isNationwideSelected,
  isUnpaidSelected,
  isNotArrivedSelected,
  isGeneralSelected,
  isSocialIntegrationSelected,
  isMeisterSelected,
  handleChangeDaejeonCheckbox,
  handleChangeNationwideCheckbox,
  handleChangeUnpaidCheckbox,
  handleChangeNotArrivedCheckbox,
  handleChangeGeneralCheckbox,
  handleChangeSocialIntegrationCheckbox,
  handleChangeMeisterCheckbox
}) => {
  const [keyword, setKeyword] = useState("");
  const [keywordsList, setKeywordsList] = useState([]);

  useEffect(() => {
    const newKeywordsList = [...keywordsList];
    if (isDaejeonSelected && keywordsList.indexOf("대전") === -1) {
      newKeywordsList.push("대전");
    }
    if (keywordsList.indexOf("전국") === -1 && isNationwideSelected) {
      newKeywordsList.push("전국");
    }
    if (keywordsList.indexOf("미납자") === -1 && isUnpaidSelected) {
      newKeywordsList.push("미납자");
    }
    if (keywordsList.indexOf("원서 미도착") === -1 && isNotArrivedSelected) {
      newKeywordsList.push("원서 미도착");
    }
    if (keywordsList.indexOf("일반전형") === -1 && isGeneralSelected) {
      newKeywordsList.push("일반전형");
    }
    if (
      keywordsList.indexOf("사회통합") === -1 &&
      isSocialIntegrationSelected
    ) {
      newKeywordsList.push("사회통합");
    }
    if (keywordsList.indexOf("마이스터전형") === -1 && isMeisterSelected) {
      newKeywordsList.push("마이스터전형");
    }
    setKeywordsList(newKeywordsList);
  }, [
    isDaejeonSelected,
    isGeneralSelected,
    isMeisterSelected,
    isNationwideSelected,
    isNotArrivedSelected,
    isSocialIntegrationSelected,
    isUnpaidSelected
  ]);

  console.log(keywordsList, "here");

  return (
    <div>
      <>
        {keywordsList.length >= 1 &&
          keywordsList.map((keyword, index) => {
            return (
              <span key={index}>
                <div>
                  {index !== 0 && <S.Keyword>,</S.Keyword>}
                  <S.Keyword>#</S.Keyword>
                  <S.Keyword>{keyword}</S.Keyword>
                </div>
              </span>
            );
          })}
        <S.SearchInput
          type="text"
          placeholder={!keywordsList.length ? "검색어를 입력해주세요." : ""}
          onChange={e => inputChangeHandle(e, setKeyword)}
          onBlur={e =>
            inputBlurHandle(
              e,
              setKeyword,
              setKeywordsList,
              keywordsList,
              keyword
            )
          }
          onKeyUp={e =>
            inputKeyDownHandle(
              e,
              keyword,
              keywordsList,
              setKeywordsList,
              setKeyword,
              handleChangeDaejeonCheckbox,
              handleChangeNationwideCheckbox,
              handleChangeUnpaidCheckbox,
              handleChangeNotArrivedCheckbox,
              handleChangeGeneralCheckbox,
              handleChangeSocialIntegrationCheckbox,
              handleChangeMeisterCheckbox
            )
          }
        />
      </>
    </div>
  );
};

export default HeaderSearchBar;