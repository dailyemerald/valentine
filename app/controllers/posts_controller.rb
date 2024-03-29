class PostsController < ApplicationController

  before_filter :cors_preflight_check
  after_filter :cors_set_access_control_headers

  # For all responses in this controller, return the CORS access control headers.

  def cors_set_access_control_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
    headers['Access-Control-Max-Age'] = "1728000"
  end

  # If this is a preflight OPTIONS request, then short-circuit the
  # request, return only the necessary headers and return an empty
  # text/plain.

  def cors_preflight_check
    if request.method == :options
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
      headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-Prototype-Version'
      headers['Access-Control-Max-Age'] = '1728000'
      render :text => '', :content_type => 'text/plain'
    end
  end

  ## real stuffs

  def index

  end

  def show

  end

  def generate_uuid
    render :json => SecureRandom.hex(16)
  end

  def update_path
    @post = Post.find_or_create_by_uuid(params[:uuid])
    @post.path = params[:path]
    render :json => @post.save
  end

  def update_picture
    @post = Post.find_or_create_by_uuid(params[:uuid])
    @post.path = params[:path]
    render :json => @post.save
  end

  def random
    redirect_to Post.all.shuffle.first
  end
end
