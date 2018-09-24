require 'rails_helper'

RSpec.describe User, type: :model do

  it "is valid with email and password_digest" do
    user = User.new({email: "rspec@email.com", password_digest: "$2a$04$wo14ucnAbdYIIW979WAj1.b9zdU8n9sAKnVchX6S0nYXj5pjpNJke"})
    expect(user).to be_valid
  end

  it "is not valid without email" do
    user = User.new({email: nil, password_digest: "$2a$04$wo14ucnAbdYIIW979WAj1.b9zdU8n9sAKnVchX6S0nYXj5pjpNJke"})
    expect(user).to_not be_valid
  end

  it "is not valid without password" do
    user = User.new({email: "rspec@email.com", password_digest: nil})
    expect(user).to_not be_valid
  end

end
