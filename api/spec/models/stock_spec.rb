require 'rails_helper'

RSpec.describe Stock, type: :model do

  let(:current_user) { create(:user) }

  it "is valid with all fields" do
    stock = Stock.new({name: 'test stock', price: 10000, interest: 5, duration: 10, user: current_user})
    expect(stock).to be_valid
  end

  it "is not valid without a name" do
    stock = Stock.new({name: nil, price: 10000, interest: 5, duration: 10, user: current_user})
    expect(stock).to_not be_valid
  end

  it "is not valid without a price" do
    stock = Stock.new({name: 'test stock', price: nil, interest: 5, duration: 10, user: current_user})
    expect(stock).to_not be_valid
  end

  it "is not valid without a interest" do
    stock = Stock.new({name: 'test stock', price: 10000, interest: nil, duration: 10, user: current_user})
    expect(stock).to_not be_valid
  end

  it "is not valid without a duration" do
    stock = Stock.new({name: 'test stock', price: 10000, interest: 5, duration: nil, user: current_user})
    expect(stock).to_not be_valid
  end

  it "is not valid without a user" do
    stock = Stock.new({name: 'test stock', price: 10000, interest: 5, duration: 10, user: nil})
    expect(stock).to_not be_valid
  end

end
