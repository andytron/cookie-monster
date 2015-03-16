class Venue < ActiveRecord::Base
	has_many :posts
	serialize :data
end