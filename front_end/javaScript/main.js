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
    Goal.submit_goal()

})


