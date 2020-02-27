import styled from 'styled-components';
import React from 'react';

export const Container = styled.div`
  padding: 0px 50px;
  background-color: #fbf8f5;
`;

export const ArticlesList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Article = styled.li`
  display: flex;
  padding-bottom: 20px;
`;

export const ArticleContainer = styled.div``;

export const ArticleImage = styled.div`
  width: 100%;
  height: 28.75rem;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center 25%;
  background-repeat: no-repeat;
`;

export const ArticleContent = styled.div`
  margin-left: 30px;
`;

export const ArticleTitle = styled.div`
  color: rgba(0, 0, 0, 0.88);
  font-family: SofiaProWeb, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.5;
  margin: 25px 0px 25px 0px;
`;

const _ReadArticle = props => (
  <a className={props.className} href={props.href}>
    {props.children}
  </a>
);

export const ReadArticle = styled(_ReadArticle)`
  color: rgba(0, 0, 0, 0.88);
  font-family: SofiaProWeb, Helvetica, Arial, sans-serif;
  font-weight: 600;
  letter-spacing: 0.125em;
  line-height: 1;
  padding-bottom: 0.25rem;
  text-align: center;
  text-transform: uppercase;
  font-size: 0.75rem;
  border-bottom: 0.125rem solid currentcolor;
  margin: 0px;
  text-decoration: none;
  transition: all 100ms ease-in 0s;
`;

export const Divider = styled.div`
  background-color: rgb(238, 226, 215);
  height: 0.125rem;
  width: 100%;
  margin-bottom: 30px;
`;

export const MorePost = styled.div.attrs({
  id: 'more'
})`
  width: 160px;
  height: 30px;
  margin: auto;
  color: rgba(0, 0, 0, 0.88);
  font-family: SofiaProWeb, Helvetica, Arial, sans-serif;
  border: 1px solid rgba(140, 140, 140, 0.88);
  border-radius: 20px;
  text-align: center;
  font-size: 20px;
`;

export const SearchBar = styled.div`
  height: 55px;
  margin-bottom: 20px;
  padding-top: 10px;
  // width: 400px;
  display: flex;
`;

export const SwitchContainer = styled.div`
  margin: 0px 20px;
  font-weight: bold;
  height: 100%;
  align-items: center;
  display: flex;
`;

export const SwitchBody = styled.div`
  background-color: #1890ff;
  width: 100px;
`;

export const SwitchLabel = styled.div`
  margin: 0px 20px;
  font-weight: bold;
`;
