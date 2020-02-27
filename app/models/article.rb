class Article < ApplicationRecord
  include PgSearch

  pg_search_scope :search_for, against: %i(title)
end
