class Post < ActiveRecord::Base
	validates :user, presence: true, strict: true
	belongs_to :user
	has_many :likes
	has_many :users, through: :likes
end
