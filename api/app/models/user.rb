# frozen_string_literal: true

class User < ApplicationRecord
  validates :email, :password_digest, presence: true
  has_secure_password
  has_many :stocks
end
