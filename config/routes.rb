WdiTradr::Application.routes.draw do
  resources :stocks, :only => [:create]

  resources :user_sessions
  resources :users

  match 'login' => 'user_sessions#new', :as => :login
  match 'logout' => 'user_sessions#destroy', :as => :logout

  root :to => 'users#show'
end
