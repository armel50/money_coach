class Goal{
    static submit_goal(){
        const form = document.querySelector("form.goals") 
        const description = form.querySelector("input[name='description']")
        const deadline = form.querySelector("input[name='deadline']")
        const cost = form.querySelector("input[name = 'cost']")
        form.addEventListener("submit", e =>{
            Goal.add_new(description.value ,deadline.value ,cost.value)
            description.value = ""
            deadline.value = "" 
            cost.value = ""
            e.preventDefault()

        })

    }

    static add_new(desc,deadline,cost){
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({description: desc, deadline: deadline, cost: cost, user_id: document.querySelector("h3[user-id]").getAttribute("user-id")})
        }

        fetch(`http://localhost:3000/goals`,params)
        .then(resp => resp.json())
        .then(json => Goal.append(json))
        
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
        const params  = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({goal_id: goal_id, user_id: user_id})
        }

        fetch(`http://localhost:3000/goals/${goal_id}`,params)
        .then(resp => resp.json())
        .then(json => {
            console.log(json)
        })

    }
    
}