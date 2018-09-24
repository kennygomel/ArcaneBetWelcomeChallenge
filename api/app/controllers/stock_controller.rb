# frozen_string_literal: true

class StockController < ApplicationController
  before_action :authorize_access_request!
  before_action :set_stock, only: %i[show update destroy]

  # GET /stock
  def index
    @stocks = current_user.stocks

    render json: @stocks
  end

  # GET /stock/1
  def show
    render json: @stock
  end

  # POST /stock
  def create
    @stock = current_user.stocks.build(stock_params)
    if @stock.save
      render json: @stock, status: :created, location: @stock
    else
      render json: @stock.errors, status: :unprocessable_entity
    end
  rescue ActiveRecord::StatementInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  # PATCH/PUT /stock/1
  def update
    if @stock.update(stock_params)
      render json: @stock
    else
      render json: @stock.errors, status: :unprocessable_entity
    end
  rescue ActiveRecord::StatementInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  # DELETE /stock/1
  def destroy
    @stock.destroy
  end

  private

  def set_stock
    @stock = current_user.stocks.find(params[:id])
  end

  def stock_params
    params.require(:stock).permit(:name, :price, :interest, :duration)
  end
end
