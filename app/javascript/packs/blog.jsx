import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios';
import {getMetadata, metadataRuleSets} from 'page-metadata-parser';
import { func } from 'prop-types';
import styled from 'styled-components';
import { Row, Col} from 'antd';
import 'antd/es/row/style/css';
import 'antd/es/col/style/css';

import { isInViewport } from '../helpers/utils';
import { FETCH_ARTICLES_URL, ARTICLE_NUMBER_LIMIT } from '../constants/api'

function useArticles () {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1);

  const fetchArticles = async () => {
    try {
      const url = `${FETCH_ARTICLES_URL}?limit=${ARTICLE_NUMBER_LIMIT}&page=${page}`;
      const res = await axios.get(url);
      if (res.data && res.data.articles) {
        setArticles(
          articles.concat(res.data.articles)
        );
        setLoading(false);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
      fetchArticles();
  }, [page])

  const loadMoreArticles = () => {
    const moreButton = document.getElementById('more');
    if (isInViewport(moreButton)) {
      setPage(page + 1);  
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', loadMoreArticles)
    return () => {
      window.removeEventListener('scroll', loadMoreArticles)
    }
  })

  return [articles, loading];
}

const Container = styled.div`
  padding: 0px 50px;
  background-color: #FBF8F5;
`

const ArticlesList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const Article = styled.li`
  display: flex;
  padding-bottom: 20px;
`

const ArticleImage = styled.div`
  width: 100%;
  height: 28.75rem;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center 25%;
  background-repeat: no-repeat;
`

const ArticleContent = styled.div`
  margin-left: 30px;
`

const ArticleTitle = styled.div`
  color: rgba(0, 0, 0, 0.88);
  font-family: SofiaProWeb, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.5;
  margin: 25px 0px 25px 0px;
`

const ReadArticle = styled.a.attrs({
  src: props => props.src
})`
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
`

const Divider = styled.div`
  background-color: rgb(238, 226, 215);
  height: 0.125rem;
  width: 100%;
  margin-bottom: 30px;
`

const MorePost = styled.div.attrs({
  id: 'more'
})`
  width: 160px;
  height: 30px;
  margin: auto;
  color: rgba(0,0,0,0.88);
  font-family: SofiaProWeb,Helvetica,Arial,sans-serif;
  border: 1px solid rgba(140, 140, 140, 0.88);
  border-radius: 20px;
  text-align: center;
  font-size: 20px;
`

function App () {
  const [articles, loading] = useArticles();
  const isDisplayMoreButton = !!articles.length;

  return <Container>
      <ArticlesList>
        {articles.map((post) => {
          if (post.image) {
            return <><Article key={post.id}>
              <Row type='flex' style={{ width: '100%' }}>
                <Col xs={24} sm={24} md={24} lg={8}>
                  <ArticleImage src={post.image}/>
                </Col>
                <Col xs={24} sm={24} md={24} lg={16}>
                  <ArticleContent>
                      <ArticleTitle>
                        {post.title}
                      </ArticleTitle>
                      <ReadArticle src={post.url}>
                        Read Article
                      </ReadArticle>
                  </ArticleContent>
                </Col>
              </Row>
            </Article>
              <Divider />
            </>
          }
        })}
      </ArticlesList>
      {  isDisplayMoreButton && <MorePost>
        More Articles
      </MorePost> }
  </Container>
}

ReactDOM.render(
  <App />,
  document.getElementById('blog')
) 