class StocksController < ApplicationController
  # POST /stocks
  # POST /stocks.json
  def create
    @stock = current_user.stocks.build(params[:stock])

    @stock.save
    @stocks = current_user.stocks
  end
end
