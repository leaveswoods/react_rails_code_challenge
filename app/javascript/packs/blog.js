import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getMetadata, metadataRuleSets } from 'page-metadata-parser';
import { func } from 'prop-types';
import { Row, Col } from 'antd';
import 'antd/es/row/style/css';
import 'antd/es/col/style/css';
import 'antd/es/input/style/css';
import './global.scss';
import { Input } from 'antd';
const { Search } = Input;
import {
  Container,
  ArticlesList,
  Article,
  ArticleImage,
  ArticleContent,
  ArticleTitle,
  ReadArticle,
  Divider,
  MorePost,
  SearchBar,
  ArticleContainer
} from '../components/index';

import { useArticles } from '../hooks/index';

function App() {
  const [isSearchAll, setIsSearchAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, loading, setPage] = useArticles(searchQuery);
  const isDisplayMoreButton = !!articles.length;

  const onSearch = value => {
    setSearchQuery(value);
    setPage(1);
  };

  return (
    <Container>
      <SearchBar>
        <Row style={{ width: '100%' }}>
          <Col xs={16}>
            <Search placeholder='Search....' onSearch={onSearch} />
          </Col>
        </Row>
      </SearchBar>
      <ArticlesList>
        {articles.map(post => {
          if (post.image) {
            return (
              <ArticleContainer key={post.id}>
                <Article>
                  <Row type='flex' style={{ width: '100%' }}>
                    <Col xs={24} sm={24} md={24} lg={8}>
                      <ArticleImage src={post.image} />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={16}>
                      <ArticleContent>
                        <ArticleTitle>{post.title}</ArticleTitle>
                        <ReadArticle href={post.url}>Read Article</ReadArticle>
                      </ArticleContent>
                    </Col>
                  </Row>
                </Article>
                <Divider />
              </ArticleContainer>
            );
          }
        })}
      </ArticlesList>
      {isDisplayMoreButton && <MorePost>More Articles</MorePost>}
    </Container>
  );
}

ReactDOM.render(<App />, document.getElementById('blog'));
