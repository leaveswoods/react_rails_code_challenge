import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FETCH_ARTICLES_URL, ARTICLE_NUMBER_LIMIT } from '../constants/api';
import { isInViewport } from '../helpers/utils';

export function useArticles(searchQuery) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const fetchArticles = async () => {
    try {
      let url = `${FETCH_ARTICLES_URL}?limit=${ARTICLE_NUMBER_LIMIT}&page=${page}`;
      if (searchQuery) {
        url += `&query=${searchQuery}`;
      }
      const res = await axios.get(url);
      if (res.data && res.data.articles) {
        if (page === 1) {
          setArticles(res.data.articles);
        } else {
          setArticles(articles.concat(res.data.articles));
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [page, searchQuery]);

  const loadMoreArticles = () => {
    const moreButton = document.getElementById('more');
    if (isInViewport(moreButton)) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', loadMoreArticles);
    return () => {
      window.removeEventListener('scroll', loadMoreArticles);
    };
  });

  return [articles, loading, setPage];
}
