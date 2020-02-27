module Api
  module V1
    class ArticlesController < ApplicationController
      before_action :sanitize_page_params
      def show
        @article = Article.find(params[:id])
        render json: { article: @article }
      end
    
      def index
        page = params[:page]
        limit = params[:limit]
        query = params[:query]
        offset = page * limit
        if query
          @articles = Article.search_for(query).limit(limit)
        else
          @articles = Article.all.limit(limit).offset(offset)
        end
        render json: { articles: @articles }
      end

      private
      def sanitize_page_params
        params[:page] = params[:page].to_i
        params[:limit] = params[:limit].to_i
      end
    end
  end
end