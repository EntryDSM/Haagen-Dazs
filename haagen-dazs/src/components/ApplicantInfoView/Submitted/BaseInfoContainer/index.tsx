import * as React from "react";

import * as S from "./style";
import { getApplicantIdPhotoApi } from "../../../../lib/api";
import { refreshAccessToken } from "../../../../utils/refreshToken";
import { checkFalse } from "../../../../utils/checkFalse";
import defaultImg from "../../../../assets/admin-page/cross.png";

interface Props {
  email: string;
  apply_type: string;
  additinal_type: string;
  name: string;
  birth_date: string;
  address: string;
  school_name: string;
}

const checkApplyType = (apply_type: string): string => {
  switch (apply_type) {
    case "COMMON":
      return "일반전형";
    case "MEISTER":
      return "마이스터전형";
    case "SOCIAL_ONE_PARENT":
      return "사회통합전형 한부모가족보호대상자";
    case "SOCIAL_FROM_NORTH":
      return "사회통합전형 북한이탈주민";
    case "SOCIAL_MULTICULTURAL":
      return "사회통합전형 다문화가정";
    case "SOCIAL_BASIC_LIVING":
      return "기초생활수급권자";
    case "SOCIAL_LOWEST_INCOME":
      return "차상위계층";
    case "SOCIAL_TEEN_HOUSEHOLDER":
      return "사회통합전형 소년소녀가장";
    default:
      return "";
  }
};

const checkAdditionalType = (additional_type: string): string => {
  switch (additional_type) {
    case "NOT_APPLICABLE":
      return "";
    case "PRIVILEGED_ADMISSION":
      return "특례입학대상자";
    case "NATIONAL_MERIT":
      return "국가유공자자녀";
    default:
      return "";
  }
};

const BaseInfoContainer: React.FC<Props> = ({
  apply_type,
  additinal_type,
  name,
  birth_date,
  address,
  school_name,
  email
}) => {
  const [photo, setPhoto] = React.useState("");

  const getApplicantIdPhoto = React.useCallback(async () => {
    try {
      const response = await getApplicantIdPhotoApi({
        email,
        access: sessionStorage.getItem("access")
      });

      const photo = URL.createObjectURL(new Blob([response]));
      setPhoto(photo);
    } catch (e) {
      if (e.response.status === 401) {
        refreshAccessToken();
        getApplicantIdPhoto();
      } else if (e.response.status === 500) {
        const photo = null;
        setPhoto(photo);
      }
    }
  },                                            [email]);

  React.useEffect(() => {
    getApplicantIdPhoto();
  },              [email]);

  return (
    <S.BaseInfoContainer>
      <S.IdPhoto src={photo === null ? defaultImg : photo} alt="ID Photo" />
      <S.BaseTextInfoContainer>
        <S.BaseInfoLine>
          <S.BaseInfoName>{checkFalse(name) ? name : "미기입"}</S.BaseInfoName>
          <S.BaseInfo>
            {checkFalse(birth_date) && birth_date.slice(0, 10)}
          </S.BaseInfo>
        </S.BaseInfoLine>
        {additinal_type === "NOT_APPLICABLE" ? (
          <S.BaseInfoLine>
            {school_name === undefined ? (
              <S.BaseInfo>검정고시</S.BaseInfo>
            ) : (
              <S.BaseInfo>
                {checkFalse(school_name) ? school_name : "학교명 미기입"}
              </S.BaseInfo>
            )}{" "}
            <S.BaseInfo>
              {checkFalse(apply_type)
                ? checkApplyType(apply_type)
                : "전형 미기입"}
            </S.BaseInfo>
          </S.BaseInfoLine>
        ) : (
          <S.TwoItemsInfoLine>
            {school_name === undefined ? (
              <S.BaseInfo>
                검정고시{" "}
                {checkFalse(apply_type)
                  ? checkApplyType(apply_type)
                  : "전형 미기입"}
              </S.BaseInfo>
            ) : (
              <S.BaseInfo>
                {`${checkFalse(school_name) ? school_name : "미기입"}${" "}${
                  checkFalse(apply_type)
                    ? checkApplyType(apply_type)
                    : "전형 미기입"
                } `}
              </S.BaseInfo>
            )}
            <S.BaseInfo>{checkAdditionalType(additinal_type)}</S.BaseInfo>
          </S.TwoItemsInfoLine>
        )}

        <S.TwoItemsInfoLine>
          {address !== null && address.indexOf("/") === -1 ? (
            <S.BaseInfo>{address}</S.BaseInfo>
          ) : (
            <>
              <S.BaseInfo>
                {address && address.slice(0, address.indexOf("/"))}
              </S.BaseInfo>
              <S.BaseInfo>
                {address && address.slice(address.indexOf("/") + 1)}
              </S.BaseInfo>
            </>
          )}
        </S.TwoItemsInfoLine>
      </S.BaseTextInfoContainer>
    </S.BaseInfoContainer>
  );
};

export default BaseInfoContainer;
