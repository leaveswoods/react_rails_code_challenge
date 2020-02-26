import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios';
import {getMetadata, metadataRuleSets} from 'page-metadata-parser';
import { func } from 'prop-types';
import styled from 'styled-components';
import { Row, Col} from 'antd';
import 'antd/es/row/style/css';
import 'antd/es/col/style/css';

const imageRules = {
  rules: [
    ['meta[property="og:image"]', node => node.element.getAttribute('content')],
  ]
};
const FETCH_ARTICLES_URL = 'http://localhost:3000/api/v1/articles'

function usePosts () {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchArticles = async () => {
    try {
      const res = await axios.get(FETCH_ARTICLES_URL);
      
      if (res.data && res.data.articles) {
        setArticles(res.data.articles);
        setLoading(false);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
      fetchArticles()
  }, [])

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
  margin: 0px;
`

function App () {
  const [articles, loading] = usePosts();
  return <Container>
      <ArticlesList>
        {articles.map((post) => {
          if (post.image) {
            return <Article key={post.id}>
              <Row type='flex' style={{ width: '100%' }}>
                <Col xs={24} sm={24} md={24} lg={8}>
                  <ArticleImage src={post.image}/>
                </Col>
                <Col xs={24} sm={24} md={24} lg={16}>
                  <ArticleContent>
                    {post.title}
                  </ArticleContent>
                </Col>
              </Row>
            </Article>
          }
          
        })}
      </ArticlesList>
  </Container>
}

ReactDOM.render(
  <App />,
  document.getElementById('blog')
) 