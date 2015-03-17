class Post < ActiveRecord::Base
	validates :user, presence: true, strict: true
	belongs_to :user
	has_many :likes
	has_many :users, through: :likes
	# validates :foursquare_id, presence: true

	# def venue
 #        Venue.find_by(foursquare_id: self.foursquare_id)
 #    end
end
