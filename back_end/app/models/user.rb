class User < ApplicationRecord
    has_many :goals
    has_many :categories 
    has_secure_password
    validates :email, uniqueness: true
    
end
