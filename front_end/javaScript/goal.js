class Goal{
    static submit_goal(){
        const form = document.querySelector("form.goals") 
        const description = form.querySelector("input[name='description']")
        const deadline = form.querySelector("input[name='deadline']")
        const cost = form.querySelector("input[name = 'cost']")

        form.addEventListener("submit", e =>{
            Goal.add_new(description.value ,deadline.value ,cost.value)
            Application.form_handler(e,[description,deadline,cost])  
        })

    }

    static add_new(desc,deadline,cost){
        fetch(`${BaseUrl}/goals`,Application.params("POST",{description: desc, deadline: deadline, cost: cost, user_id: document.querySelector("h3[user-id]").getAttribute("user-id")}))
        .then(resp => resp.json())
        .then(json => {
            if(json.status && json.status === 400){
                throw json.error
            }
            Goal.append(json)
        })
        .catch(errors => {
            display_errors(errors)
        })
    }

    static append(goal){
        const div = document.querySelector("div.user-goals")
        const new_div = document.createElement("div")
        const date = new Date(goal.deadline)
        new_div.innerHTML = `<div class = 'ui tall stacked segment'>
                            <div class = 'ui container'>
                                <div class="ui horizontal statistic">
                                <div class="value">
                                    Cost: ${goal.cost}
                                </div>
                                <div class="label">
                                    $
                                </div>
                            

                                </div>
                                    <p>${goal.description}</p>

                                    <p>Deadline: ${date}</p>
                                    <button goal-id = '${goal.id}'class = "ui mini negative button fluid">delete</button>
                            </div>
                        </div>
                        <br>
                        <br>
                            `
        div.appendChild(new_div)
        document.querySelector(`button[goal-id='${goal.id}']`).addEventListener("click",()=>{
            $(`button[goal-id='${goal.id}']`).parent().parent().transition("scale")
            Goal.delete_goal(document.querySelector(`button[goal-id='${goal.id}']`).getAttribute("goal-id"), document.querySelector(`h3[user-id='${goal.user_id}']`).getAttribute("user-id"))
        })
    }

    static delete_goal(goal_id,user_id){
     fetch(`${BaseUrl}/goals/${goal_id}`,Application.params("DELETE", {goal_id: goal_id, user_id: user_id}))
        .then(resp => resp.json())
        .then(json => {
            console.log(json)
        })

    }
    
}