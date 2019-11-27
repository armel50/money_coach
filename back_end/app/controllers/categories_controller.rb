class CategoriesController < ApplicationController
    def create 
        user = User.find_by(id: category_params[:user_id])
        if !user.categories.find_by(name: category_params[:name])
            new_category = Category.create(category_params)
            user.categories << new_category
            render json: {new_category: new_category,categories: user.categories}
        else
            render json: {error: ["The #{category_params[:name]} already exists!"], status: 400}
        end

    end

    def destroy 
        binding.pry
    end
    private 
    def category_params 
        params.permit(:user_id,:name,:cost)
    end
end
