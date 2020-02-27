export const HOST =
  process.env.NODE_ENV === 'production'
    ? 'http://13609476.ngrok.io'
    : 'http://localhost:3000';
export const FETCH_ARTICLES_URL = `${HOST}/api/v1/articles`;
export const ARTICLE_NUMBER_LIMIT = 30;
