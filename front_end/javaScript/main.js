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
        $('div.signUp_signIn').transition('horizontal flip')
        
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
})


