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
            user_info.innerHTML = `<h3 user-id ='${user.data.id}'>Email: ${email}</h3> <h3 class ='income'>Income: ${income} $</h3> <h3> Goals </h3><div class = 'user-goals'></div>` 
        }else {
            user_info.innerHTML = `<h3 user-id ='${user.data.id}'>Email: ${email}</h3> <h3 class = 'income'>Income</h3><div class = 'no-income ui floating message'><p>Please define your income</p></div> <h3> Goals </h3> <div class = 'user-goals'></div>`
        }

        if(goals.length > 0){
            goals.forEach(e=>{
               Goal.append(e)
            }) 
        }else{
            document.querySelector("ul.user-goals").innerHTML = "<div class = 'ui floating message'><p>You currently have 0 goals</p></div>"
        }

        if(user.data.attributes.categories.length > 0){
            Spending.append_spending(user.data.attributes.categories)
        }
        User.submit_income()
        
        Chart_Generator.add_eventlinstener()    

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
    
    static get_user(id){
        fetch(`http://localhost:3000/users/${id}`)
        .then(resp => resp.json())
        .then(json => Chart_Generator.process(json))
    }

}
// module.exports = User