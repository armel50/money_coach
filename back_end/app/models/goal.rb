class Goal < ApplicationRecord
    belongs_to :user
    validates :description, presence: true
    validates :deadline, presence: true
    validates :cost,presence: true
end
