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

    static display_user(user){
        const li = document.createElement("li")
        const email = user.data.attributes.email
        const goals = user.data.attributes.goals
        const income = user.data.attributes.income
        const user_info = document.querySelector("div.user-info")
        console.log(user.data.id)
        $('div.signUp_signIn').transition('horizontal flip')
        if(income){
            user_info.innerHTML = `<h3 user-id ='${user.data.id}'>Email: ${email}</h3> <h3>Income: ${income}</h3> <h3> Goals </h3><ul class = 'user-goals'></ul>` 
        }else {
            user_info.innerHTML = `<h3 user-id ='${user.data.id}'>Email: ${email}</h3> <h3>Income</h3><div class = 'ui floating message'><p>Please define your income</p></div> <h3> Goals </h3> <ul class = 'user-goals'></ul>`
        }

        if(goals.length > 0){
            goals.forEach(e=>{
                li.innerHTML = e 
                $("ul.user-goals").appendChild(li)
            }) 
        }else{
            document.querySelector("ul.user-goals").innerHTML = "<div class = 'ui floating message'><p>You currently have 0 goals</p></div>"
        }
           
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
            }
           Spending.append_spending(json)
        })
        .catch(errors => {
            display_errors(errors)
        })

    }

    static append_spending(spending){
        console.log(spending)
        const div = document.querySelector("div.total_spendings")
        const ul = document.querySelector("ul.spendings")
        const li = document.createElement("li")
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
                        </div>
                    `
  
      ul.appendChild(li)
      
        
    }

    static delete_spending(spenging_id){
        const params = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                category_id: category_id
                
            })

        } 

        fetch("http://localhost:3000/categories",params)
        .then(resp => resp.json())
        .then(json => console.log(json))
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


