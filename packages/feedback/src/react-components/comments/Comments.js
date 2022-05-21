import React from 'react'
import styled from "styled-components";

import CommentItem from "./CommentItem";

const Wrapper = styled.div`
  margin-top: 40px;
`

const Title = styled.p`
  margin: 0 0 4px 0;
  font-size: 32px;
  line-height: 48px;
  font-weight: 700;
`

const ButtonWrapper = styled.div`
  margin-top: 24px;
  text-align: center;
`

const Button = styled.button`
  margin-top: 12px;
  width: 280px;
  background-color: none;
  color: #04295e;
  border: 1px solid #04295e;
  border-radius: 6px;
  padding: 12px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 18px;
  line-height: 27px;

  &:hover, &:active {
    background-color: #edeff2;
  }
`

const mockComments = [{
  id: Math.random(),
  date: '2022/5/19 15:29',
  content: `'我在今晚剛剛18:52分收到居家隔離通知書了\n教學一下 看有沒有用  沒用別嘴我😂\n用健保快易通 自主回報系統上網填寫\n\n填完以後 去你的健保快易通 的健康櫃檯\n把常用詞彙跟行動裝置設定\n把完整資料都填寫完 \n結果不到10分鐘簡訊就寄過來了\n我不曉得是剛剛好巧合還是怎麼樣\n\n我在隔離第二天有上網回報 但健康櫃檯資料都沒填寫 \n於是剛剛無聊滑一滑看填完整會不會快一些\n結果真的填完10分鐘簡訊就寄過來了\n希望有幫助 但也有可能是巧合！'`,
}]

export default function Comments({ comments = mockComments }) {
  return <Wrapper>
    <Title>網友回饋</Title>
    {comments.map((comment) => (<CommentItem key={comment.id} comment={comment} />))}
    <ButtonWrapper>
      <Button >展開更多</Button>
    </ButtonWrapper>
  </Wrapper>
}