import * as React from "react";
import { Component } from "react";

import * as S from "./style";
import Checked from "../../../../assets/admin-page/checked.png";

interface State {
  applicationArrivalStatus: boolean;
  paymentStatus: boolean;
}

class EditButtonContainer extends React.Component<any, State> {
  state: State = {
    applicationArrivalStatus: false,
    paymentStatus: false
  };

  render() {
    return (
      <S.EditButtonWrapper>
        <S.CheckboxTitle>원서도착여부</S.CheckboxTitle>
        <S.StatusCheckbox
          type="checkbox"
          name="ApplicationArrivalStatus"
          id="application-arrival-status"
        />
        <label htmlFor="application-arrival-status">
          <S.CheckBox style={{ marginRight: "24px" }}></S.CheckBox>
        </label>
        <S.CheckboxTitle>결제여부</S.CheckboxTitle>
        <S.StatusCheckbox
          type="checkbox"
          name="PaymentStatus"
          id="payment-status"
        />
        <label htmlFor="payment-status">
          <S.CheckBox style={{ marginRight: "127px" }} />
        </label>
        <S.SubmissionCancelBtn>최종제출 취소</S.SubmissionCancelBtn>
      </S.EditButtonWrapper>
    );
  }
}

export default EditButtonContainer;