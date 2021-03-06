class UsersController < ApplicationController
    def create 
        user = User.find_by(email: params.permit(:email)["email"])
        if !user 
            user = User.create(email: params.permit(:email)["email"], password: params.permit(:password)["password"] )

        end
       if user.errors.any?
        render json: {:error => user.errors.full_messages,status: 400 }
       else
        render json: UserSerializer.new(user)

       end 
    end

    def update
        user = User.find_by(id: user_params[:id])
        user.update(income:  user_params[:income]) if !user_params[:income].empty?
       
        render json: {income: user.income}
    end

    def show 
        user = User.find_by(id: params[:id])
        render json: {user: user, categories: user.categories} if user
    end

    private 
    def user_params 
        params.permit(:id,:income,:user)
    end
end
