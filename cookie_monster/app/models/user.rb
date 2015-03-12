class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :posts
  has_many :likes

	def toggle_like(post)
		like = Like.find_or_initialize_by(user_id: self.id, post_id: post.id)
		
		if (like.persisted?)
			like.destroy
		else
			like.save
		end
	end

end
