class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def add_tip
     @post = Post.new(post_params)
     @post.user = current_user
     @post.save!


     render json: @post
 end

 private

 def post_params
     params.require(:post).permit(:foursquare_id)
 end

end
