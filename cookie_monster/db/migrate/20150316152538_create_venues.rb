class CreateVenues < ActiveRecord::Migration
  def change
    create_table :venues do |t|
      t.string :foursquare_id
      t.text :data

      t.timestamps null: false
    end
  end
end
