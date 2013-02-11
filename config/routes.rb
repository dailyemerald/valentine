Valentine::Application.routes.draw do
  
  root :to => "posts#index"
  
  post "/generate_uuid" => "posts#generate_uuid"
  post "/update_path" => "posts#update_path"
  post "/update_picture" => "posts#update_picture"
  get "/random" => "posts#random"

end