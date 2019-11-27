class GoalsController < ApplicationController
    def create 
        user = User.find_by(id: goals_params[:user_id])
        new_goal = Goal.create(goals_params)
        user.goals << new_goal
        render json: new_goal

    end

    def destroy 
        user = User.find_by(id: params.permit(:user_id)[:user_id])
        goal = Goal.find_by(id: params.permit(:goal_id)[:goal_id])
        goal.delete 
        render json: {goals: user.goals}
    end

    private 
    def goals_params 
        params.permit(:description,:deadline,:cost,:user_id)
    end
end
