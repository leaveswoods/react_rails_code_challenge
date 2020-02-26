module Api
  module V1
    class ArticlesController < ApplicationController
      def show
        @article = Article.find(params[:id])
        render json: { article: @article }
      end
    
      def index
        @articles = Article.all.limit(100)
        render json: { articles: @articles }
      end

      private
      def post_params
        params.permit(:title, :description)
      end
      
    end
  end
end