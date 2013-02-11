require 'test_helper'

class PostControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get show" do
    get :show
    assert_response :success
  end

  test "should get update_path" do
    get :update_path
    assert_response :success
  end

  test "should get update_picture" do
    get :update_picture
    assert_response :success
  end

  test "should get random" do
    get :random
    assert_response :success
  end

end
