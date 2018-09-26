# frozen_string_literal: true

class UserController < ApplicationController
  before_action :authorize_access_request!
  before_action :set_user, only: %i[show update destroy]

  # GET /user
  def index
    @users = User.all

    render json: UserSerializer.new(@users).serialized_json
  end

  # GET /user/1
  def show
    render json: UserSerializer.new(@user).serialized_json
  end

  # PATCH/PUT /user/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  rescue ActiveRecord::StatementInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  # DELETE /user/1
  def destroy
    @user.destroy
  end

  # GET /me
  def me
    render json: UserSerializer.new(current_user).serialized_json
  end

  private

  def set_user
    @user = params[:id] == '0' ? current_user : User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(
      :email,
      :first,
      :last,
      :dob,
      :password,
      :password_confirmation
    )
  end
end
