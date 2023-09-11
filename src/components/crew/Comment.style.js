import styled from 'styled-components';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';

export const CommentContainer = styled.div`
  width: calc(100% - 32px);
  margin: 0 16px 20px;
`;

export const StyledComment = styled.div`
  width: 100%;
  margin-bottom: 12px;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 11px;

  & > div:first-of-type {
    display: flex;
    align-items: center;
    
    & > span {
      display: inline-block;
      width: 30px;
      height: 30px;
      background-color: #BAF2FF;
      text-align: center;
      line-height: 30px;
      border-radius: 50%;
      margin-right: 8px;
      font-size: 12px;
      font-weight: bold;
    }

    & > p {
      font-size: 18px;
      font-weight: bold;
    }
  }

  & > div:nth-of-type(2) {
    position: relative;
    display: flex;
    align-items: center;

    & > span {
      display: block;
      margin-right: 8px;
      font-size: 12px;
    }

    & > button {
      display: block;
      background-color: transparent;
      border: none;
    }
  }
`;

export const CommentModal = styled.div`
  position: absolute;
  right: 4px;
  top: 32px;

  & > button {
    display: block;
    background-color: transparent;
    border: none;
    font-size: 12px;
    white-space: nowrap;

    &:nth-of-type(n+2) {
      margin-top: 4px;
    }
  }
`;

export const CommentContent = styled.div`
  width: 100%;
  max-height: 80px;
  margin-bottom: 22px;
  white-space: pre-line;
  overflow: hidden;
`;

export const CommentFooter = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    display: flex;
    align-items: center;
    
    & > button {
      display: block;
      margin-right: 10px;
      background-color: transparent;
      border: none;
      padding: 0;
    }

    & > span {
      display: block;
      font-size: 14px;
    }
  }

  & > button {
    font-size: 14px;
    background-color: transparent;
    border: none;
    text-decoration: underline;
  }
`;

export const SubCommentContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const SubComment = styled.div`
  width: calc(100% - 28px);
  margin-left: 28px;

  &:nth-child(n+2) {
    margin-top: 8px;
  }
`;

export const SubCommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;

  & > div:first-of-type {
    display: flex;
    align-items: center;
    
    & > span {
      display: inline-block;
      width: 20px;
      height: 20px;
      background-color: #BAF2FF;
      text-align: center;
      line-height: 20px;
      border-radius: 50%;
      margin-right: 8px;
      font-size: 10px;
      font-weight: bold;
    }

    & > p {
      font-size: 15px;
      font-weight: bold;
    }
  }

  & > div:nth-of-type(2) {
    display: flex;
    align-items: center;

    & > span {
      display: block;
      margin-right: 8px;
      font-size: 12px;
    }

    & > button {
      display: block;
      background-color: transparent;
      border: none;
    }
  }
`;

export const SubCommentContent = styled.div`
  font-size: 14px;
`;

export const CommentFormWrapper = styled.div`
  & > form > textarea {
    display: block;
    width: 100%;
    height: 100px;
    border-radius: 10px 10px 0 0;
    padding: 16px;
  }

  & > form > button {
    display: block;
    width: 100%;
    height: 40px;
    border-radius: 0 0 10px 10px;
    border: none;
    color: #FFFFFF;
    background-color: #979797;
  }
`;

export const CommentEditFormWrapper = styled.div`
  & > form > textarea {
    display: block;
    width: 100%;
    height: 100px;
    border-radius: 10px 10px 0 0;
    padding: 16px;
  }

  & > form > div {
    display: flex;
  }

  & > form > div > button {
    display: block;
    width: 50%;
    height: 40px;
    border-radius: 0 0 0 10px;
    border: none;
    color: #FFFFFF;
    background-color: #979797;

    &:nth-of-type(2) {
      border-radius: 0 0 10px 0;
      background-color: #FF4747;
    }
  }
`;

export const StyledAiOutlineHeart = styled(AiOutlineHeart)`
  width: 20px;
  height: 20px;
`;

export const StyledFiMoreHorizontal = styled(FiMoreHorizontal)`
  width: 24px;
  height: 24px;
`;
