class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :created_at, :goals, :email,:income, :categories
end
