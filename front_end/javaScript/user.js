export class User{
 
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
     console.log(user)
     $('div.signUp_signIn').transition('horizontal flip')
     if(income){
         user_info.innerHTML = `<h3 user-id = ${user.id}>Email: ${email}</h3> <h3>Income: ${income}</h3> <h3> Goals </h3><ul class = 'user-goals'></ul>` 
     }else {
         user_info.innerHTML = `<h3 user-id = ${user.id}>Email: ${email}</h3> <h3>Income</h3><div class = 'ui floating message'><p>Please define your income</p></div> <h3> Goals </h3> <ul class = 'user-goals'></ul>`
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
     .then(resp => {
       
         return resp.json()
     })
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

module.exports = User