class GoalsController < ApplicationController
    def create 
        user = User.find_by(id: goals_params[:user_id])
        new_goal = Goal.create(goals_params)
        user.goals << new_goal
        render json: new_goal

    end

    def destroy 
        binding.pry
    end

    private 
    def goals_params 
        params.permit(:description,:deadline,:cost,:user_id)
    end
end
