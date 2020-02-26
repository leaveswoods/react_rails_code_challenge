class CreateArticles < ActiveRecord::Migration[6.0]
  def change
    create_table :articles do |t|
      t.string :by
      t.integer :descendants
      t.integer :score
      t.string :title
      t.string :item_type
      t.string :url
      t.bigint :time
      t.string :image
      t.text :text
      t.timestamps
    end
  end
end
