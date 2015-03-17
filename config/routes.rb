Rails.application.routes.draw do
  
  get '/posts/:post_id/like' => 'posts#like'
  get '/venues' => 'application#create_venue'
  post '/venues' => 
  resources :likes
  resources :posts
  devise_for :users
  root 'posts#index'
  
end
