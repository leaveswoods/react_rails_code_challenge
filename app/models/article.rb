class Article < ApplicationRecord
  include PgSearch::Model

  pg_search_scope :search_for, against: %i(title)
  paginates_per 30
end
