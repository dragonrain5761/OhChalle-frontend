import styled from 'styled-components';
import { BsPersonFill } from 'react-icons/bs';

export const ImageWrapper = styled.div`
  width: 100%;
  height: 259px;
  display: flex;
  justify-content: center;
  border-radius: 25px 25px 0 0;
  background-color: #EEEEEE;
  overflow: hidden;

  & > img {
    height: 100%;
  }
`;

export const Overview = styled.div`
  width: 100%;
  height: 70px;
  padding: 14px 16px;
  border-radius: 0 0 25px 25px;
  background-color: #f3f3f3;

  & > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
  }

  & > p {
    font-size: 13px;
  }

  & > div > span > svg {
    font-size: 20px;
  }
`;

export const StyledBsPersonFill = styled(BsPersonFill)`
  width: 14px;
  height: 14px;
`;

export const TitleContainer = styled.div`
  display: flex;

  & > p {
    white-space: nowrap;
    display: block;
    font-size: 18px;

    &:nth-of-type(2) {
      margin-left: 5px;
      display: flex;
      align-items: center;
      background-color: #DADADA;
      padding: 0 8px;
      height: 20px;
      line-height: 20px;
      border-radius: 20px;
      font-size: 12px;

      & > span {
        white-space: nowrap;
        display: block;
        margin-left: 3px;
      }
    }
  }
`;
