# frozen_string_literal: true

class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :name, null: false
      t.float :price, null: false
      t.float :interest, null: false
      t.integer :duration, null: false
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
