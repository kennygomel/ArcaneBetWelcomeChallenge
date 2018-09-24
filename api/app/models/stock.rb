# frozen_string_literal: true

class Stock < ApplicationRecord
  validates :name, :price, :interest, :duration, presence: true
  belongs_to :user
end
