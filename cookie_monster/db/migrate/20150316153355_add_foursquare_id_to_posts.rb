class AddFoursquareIdToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :foursquare_id, :string
  end
end
