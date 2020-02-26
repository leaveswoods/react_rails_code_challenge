# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'httparty'
require 'thread'
require 'thwait'
require 'nokogiri'
require 'open-uri'

# Article here is descripbed as Story in Hacker New API
class FetchArticlesFromHackerNews
  include HTTParty
  GET_NEW_ARTICLE_IDS_URL = 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty'
  GET_ARTICLE_URL_BASE = 'https://hacker-news.firebaseio.com/v0/item'
  @@articles = []
  @@uniq_ids = Set.new
  def initialize
    self.get_articles()
    # self.get_more_500_articles ()

  end

  def generate_get_artical_url(item_id)
    return "#{GET_ARTICLE_URL_BASE}/#{item_id}.json?print=pretty"
  end

  def get_articles()
    # Get the last 500 articles
    article_ids = self.class.get(GET_NEW_ARTICLE_IDS_URL)
    threads_articles= []
    article_ids.each do |article_id|
      threads_articles << Thread.new {
        article = self.class.get(self.generate_get_artical_url(article_id)).parsed_response
        if article
          @@uniq_ids.add(article['id'])
          article['image'] = get_article_preview_image_url(article['url'])
          @@articles << article
          self.print_article_id(article)
        end
      }
    end
    #waiting all threads finish to go on
    ThreadsWait.all_waits(*threads_articles)
  end 

  def get_more_500_articles()
    last_id = @@articles[-1]['id']
    count_backwards = 100
    while @@articles.length() < 1000
      threads_articles = []
      ((last_id - count_backwards)..last_id).each do |id|
        threads_articles << Thread.new {
          item = self.class.get(self.generate_get_artical_url(id)).parsed_response
          if item && item['type'] == 'story' && @@uniq_ids.add?(item['id'])
            @@articles << item
            self.print_article_id(item)
          end
        }
      end
      ThreadsWait.all_waits(*threads_articles)
      last_id -= count_backwards
    end
  end

  def print_article_id(article)
    puts "Got article id #{article['id']} from Hacker News, total #{@@articles.length()}"
  end

  def articles
    @@articles
  end

end

def get_article_preview_image_url(url)
  if url
    begin
      page = Nokogiri::HTML(open(url))
      tag = page.at('meta[property="og:image"]')
      if tag
        return tag.attributes['content'].value
      end
    rescue
      puts "Get image url failed"
    end
    
    
  end
end

def seedArticles()
  fetch = FetchArticlesFromHackerNews.new()
  fetch.articles.each do |article|
    new_a = Article.where(:id => article['id']).first_or_create do |new_a|
      new_a.by = article['by']
      new_a.descendants = article['descendants']
      new_a.score = article['score']
      new_a.title = article['title']
      new_a.item_type = article['type']
      new_a.url = article['url']
      new_a.time = article['time']
      new_a.text = article['text']
      new_a.image = article['image']
      puts "Created article #{new_a['id']}"
    end
  end
end

# Fetch articals from Hacker News
seedArticles()
