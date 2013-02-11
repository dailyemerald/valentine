class PostController < ApplicationController
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
