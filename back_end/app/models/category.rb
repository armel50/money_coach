class Category < ApplicationRecord
    belongs_to :user
    validates :cost, presence: true 
    validates :name, presence: true
end
