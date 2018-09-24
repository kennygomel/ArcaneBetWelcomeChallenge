# frozen_string_literal: true

class SigninController < ApplicationController
  before_action :authorize_access_request!, only: %i[destroy]

  def create
    user = User.find_by!(email: params[:email])
    if user.authenticate(params[:password])
      create_session(user)
    else
      not_authorized
    end
  end

  def destroy
    session = JWTSessions::Session.new(payload: payload)
    session.flush_by_access_payload
    render json: :ok
  end

  private

  def create_session(user)
    session = JWTSessions::Session.new(
      payload: { user_id: user.id },
      refresh_by_access_allowed: true
    )
    tokens = session.login
    authorize(tokens)
  end

  def authorize(tokens)
    response.set_cookie(
      JWTSessions.access_cookie,
      value: tokens[:access],
      httponly: true,
      secure: Rails.env.production?
    )
    render json: { csrf: tokens[:csrf] }
  end

  def not_found
    render json: {
      error: 'Can\'t find such email/password combination'
    }, status: :not_found
  end
end
