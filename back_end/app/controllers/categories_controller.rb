class CategoriesController < ApplicationController
    def create 
        user = User.find_by(id: category_params[:user_id])
        if !user.categories.find_by(name: category_params[:name])
            new_category = Category.create(category_params)
            user.categories << new_category
            if new_category.errors.any?
                render json: {:error => new_category.errors.full_messages,status: 400 }
            else
                render json: {new_category: new_category,categories: user.categories}
            end        
         else
           
            render json: {error: ["The #{category_params[:name]} already exists!"], status: 400}
        end

    end

    def destroy 
        category = Category.find_by(id: params.permit(:category_id)["category_id"])
        user = category.user
        category.delete
        render json: {message: "success",categories: user.categories }
    end
    private 
    def category_params 
        params.permit(:user_id,:name,:cost)
    end
end
