Rails.application.routes.draw do
  
  get '/posts/:post_id/like' => 'posts#like'
  resources :likes
  resources :posts
  devise_for :users
  root 'posts#index'
  
end
