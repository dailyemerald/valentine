class Post < ActiveRecord::Base
  attr_accessible :path, :picture_url, :uuid
end
