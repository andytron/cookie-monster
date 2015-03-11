Rails.application.routes.draw do
  resources :likes
  resources :posts
  devise_for :users
  root 'posts#index'
  
end
