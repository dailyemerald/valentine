class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :uuid
      t.text :path
      t.string :picture_url

      t.timestamps
    end
  end
end
