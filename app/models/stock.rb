class Stock < ActiveRecord::Base
  belongs_to :user
  attr_accessible :quantity, :starting_price, :symbol

  before_create :set_current_price

  def set_current_price
    quote = StockQuote::Stock.quote(symbol)

    self.starting_price = quote.last
  end
end
