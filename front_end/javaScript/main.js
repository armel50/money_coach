class User{
 
    static create_user (){
        const sign_up_form = document.querySelector("form.sign_up_or_in ")
        const email = document.querySelector("input[name= 'email']")
        const password = document.querySelector("input[name= 'password' ]")
        sign_up_form.addEventListener("submit",e =>{ 
            console.log(email.value)
            console.log(password.value)
            User.create_or_find_user(email.value, password.value)
            email.value = ""
            password.value = ""
            e.preventDefault()
           
        })
    }

    static submit_income(){
        const income_form = document.querySelector("form.income")
        const income_input = document.querySelector("input.income")
        const user_id = document.querySelector("h3[user-id]").getAttribute("user-id")
        income_form.addEventListener("submit",e=>{
            User.update_income(user_id,income_input.value)
            income_input.value = ""
            
            e.preventDefault()
        })
        
    }

    static update_income(user_id,income){
        const params = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
           body: JSON.stringify({income: income})
        }
        fetch(`http://localhost:3000/users/${user_id}`, params)
        .then(resp => resp.json())
        .then(json => {
            const h3 = document.querySelector("h3.income")
           h3.innerHTML = `Income: ${json.income} $`
            $("div.no-income").transition("zoom")
        })
    }

    static display_user(user){
        console.log(user)
        const li = document.createElement("li")
        const email = user.data.attributes.email
        const goals = user.data.attributes.goals
        const income = user.data.attributes.income
        const user_info = document.querySelector("div.user-info")
        console.log(user.data.id)
        $('div.signUp_signIn').transition('horizontal flip')
        if(income){
            user_info.innerHTML = `<h3 user-id ='${user.data.id}'>Email: ${email}</h3> <h3 class ='income'>Income: ${income} $</h3> <h3> Goals </h3><ul class = 'user-goals'></ul>` 
        }else {
            user_info.innerHTML = `<h3 user-id ='${user.data.id}'>Email: ${email}</h3> <h3 class = 'income'>Income</h3><div class = 'no-income ui floating message'><p>Please define your income</p></div> <h3> Goals </h3> <ul class = 'user-goals'></ul>`
        }

        if(goals.length > 0){
            goals.forEach(e=>{
                li.innerHTML = e 
                $("ul.user-goals").appendChild(li)
            }) 
        }else{
            document.querySelector("ul.user-goals").innerHTML = "<div class = 'ui floating message'><p>You currently have 0 goals</p></div>"
        }

        if(user.data.attributes.categories.length > 0){
            Spending.append_spending(user.data.attributes.categories)
        }
        User.submit_income()
    }

    static create_or_find_user(email,password){
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
              })

        }

        fetch("http://localhost:3000/users",params)
        .then(resp => resp.json())
        .then (json => {
            if(json.status && json.status === 400){
                throw json.error
            }
           User.display_user(json)
        })
        .catch(errors => {
            display_errors(errors)
        })
    }   

}

class Spending{
    static submit(){
        const submit_spending = document.querySelector("form.new_spending")
        const name = document.querySelector("input[name='name']")
        const cost = document.querySelector("input[name='cost']")

        submit_spending.addEventListener("submit", e=>{
            Spending.add_spending(document.querySelector("h3[user-id]").getAttribute("user-id"),name.value,cost.value)
            name.value = ""
            cost.value = ""

            e.preventDefault()
        })
    }
    static add_spending(user_id,name,cost){

        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                user_id: user_id,
                name: name,
                cost: cost
            })

        }

        fetch("http://localhost:3000/categories",params)
        .then(resp => resp.json())
        .then (json => {
            if(json.status && json.status === 400){
                throw json.error
            }else{
                Spending.append_spending(json)

            }
        })
        .catch(errors => {
            console.errors
            display_errors(errors)
        })

    }

    static append_spending(spending){
        const div = document.querySelector("div.total_spendings")
        const ul = document.querySelector("ul.spendings")
        const li = document.createElement("li")
        if(!Array.isArray(spending)){
                
                const total = spending.categories.map(e => e.cost).reduce((memo, e)=>e + memo,0)

                div.innerHTML = `Total: ${total} `
                li.innerHTML = `
                                <div class="ui horizontal statistic">
                                    <div class="value">
                                        ${spending.new_category.name}: ${spending.new_category.cost}
                                    </div>
                                    <div class="label">
                                        $
                                    </div>
                                    <button category-id = '${spending.new_category.id}'
                                    class = "ui mini negative button">delete</button>

                                </div>
                            `

        
            ul.appendChild(li)
            document.querySelector(`button[category-id= '${spending.new_category.id}']`).addEventListener("click",()=>{
                $(`button[category-id= '${spending.new_category.id}']`).parent().parent().transition('horizontal flip')
                Spending.delete_spending(spending.new_category.id)
            })
      
        }else{
        
            const total = spending.map(e => e.cost).reduce((memo, e)=>e + memo,0)

            div.innerHTML = `Total: ${total}`
            spending.forEach(e =>{
                const li = document.createElement("li")
                li.innerHTML = `
                <div class="ui horizontal statistic">
                    <div class="value">
                        ${e.name}: ${e.cost}
                    </div>
                    <div class="label">
                        $
                    </div>
                    <button category-id = '${e.id}' class = "ui mini negative button">delete</button>


                </div>
            `
                ul.appendChild(li)
                document.querySelector(`button[category-id= '${e.id}']`).addEventListener("click",()=>{
                    $(`button[category-id= '${e.id}']`).parent().parent().transition('horizontal flip')
                    Spending.delete_spending(e.id)

            })  
            })
           

        }
    }

    static delete_spending(spending_id){
        const params = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                category_id: spending_id
                
            })

        } 

        fetch(`http://localhost:3000/categories/${spending_id}`,params)
        .then(resp => resp.json())
        .then(json => {
           const total = json.categories.map(e => e.cost).reduce((memo, e)=>e + memo,0)
           document.querySelector("div.total_spendings").innerHTML = `Total: ${total}`
        })
    }
}

function display_errors(errors){
    console.log(errors)
    const error_div = document.querySelector("div.errors")
    
    error_div.classList.remove("hidden")
    console.log(error_div)
    const ul = document.querySelector("ul.errors")
    const li = document.createElement("li")
    
    errors.forEach(e => {
        li.innerHTML = e
        ul.appendChild(li)
    })
}

function input_listener (){
    document.querySelectorAll("input").forEach(e=>{
        e.addEventListener("keypress",()=>{
            e.focus()
        })
    })
}


document.addEventListener("DOMContentLoaded",()=>{
    input_listener()
    User.create_user()
    
    Spending.submit()
    
})


