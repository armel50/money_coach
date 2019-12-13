const BaseUrl = "https://money-coach-back-end.herokuapp.com"
// const BaseUrl = "http://localhost:3000"
class User{

    static create_user (){
        const sign_up_form = document.querySelector("form.sign_up_or_in ")
        const email = document.querySelector("input[name= 'email']")
        const password = document.querySelector("input[name= 'password' ]")

        sign_up_form.addEventListener("submit",e =>{ 
            User.create_or_find_user(email.value, password.value)
            // form_handler will reset the value of the inputs and prevent the submision of a form
            Application.form_handler(e,[email,password])  
        })
    }

    static submit_income(){
        const income_form = document.querySelector("form.income")
        const income_input = document.querySelector("input.income")
        const user_id = document.querySelector("h3[user-id]").getAttribute("user-id")

        income_form.addEventListener("submit",e=>{
            User.update_income(user_id,income_input.value)
            Application.form_handler(e,[income_input])  

        })
        
    }

    static update_income(user_id,income){
     // Application.params takes a method and data as a hash
        fetch(`${BaseUrl}/users/${user_id}`, Application.params("PATCH",{income: income}))
        .then(resp => resp.json())
        .then(json => {
            const h3 = document.querySelector("h3.income")
           h3.innerHTML = `Income: ${json.income} $`

           if(json.income && document.querySelector("div.no-income")){
                document.querySelector("div.no-income").classList.add("hidden")
           }
        })
    }

    static display_user(user){
        console.log(user)
        const email = user.data.attributes.email
        const goals = user.data.attributes.goals
        const income = user.data.attributes.income
        const user_info = document.querySelector("div.user-info")
        console.log(user.data.id)
        $('div.signUp_signIn').transition('horizontal flip')
        setTimeout(()=>{  $("main.hidden").transition('horizontal flip') }, 800)
       
        if(income){
            user_info.innerHTML = `<h1>Your Info</h1><h3 user-id ='${user.data.id}'>Email: ${email}</h3> <h3 class ='income'>Income: ${income} $</h3> <h3> Goals </h3><div class = 'user-goals scroller' style= "height: 300px"></div>` 
        }else {
            user_info.innerHTML = `<h1>Your Info</h1><h3 user-id ='${user.data.id}'>Email: ${email}</h3> <h3 class = 'income'>Income</h3><div class = 'no-income ui floating message'><p>Please define your income</p></div> <h3> Goals </h3> <div class = 'user-goals scroller' style= "height: 300px"></div>`
        }

        if(goals.length > 0){
            goals.forEach(e=>{
               Goal.append(e)
            }) 
        }else{
            document.querySelector("div.user-goals").innerHTML = "<div class = 'ui floating message no-goals'><p>You currently have 0 goals</p></div>"
        }

        if(user.data.attributes.categories.length > 0){
            Spending.append_spending(user.data.attributes.categories)
        }
        User.submit_income()
        console.log("this is what is about to be sent "+user.data.id )
        Chart_Generator.add_eventlinstener(user.data.id)    

    }

    static create_or_find_user(email,password){
        fetch(`${BaseUrl}/users`,Application.params("POST",{email: email,password: password}))
        .then(resp => resp.json())
        .then (json => {
            if(json.status && json.status === 400){
                throw json.error
            }
            console.log(json)
           User.display_user(json)
        })
        .catch(errors => {
            display_errors(errors)
        })
    }  
    
    static get_user(id){
        fetch(`${BaseUrl}/users/${id}`)
        .then(resp => resp.json())
        .then(json => Chart_Generator.process(json))
    }

}
