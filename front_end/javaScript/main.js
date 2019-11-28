function display_errors(errors){
    console.log(errors)
    const error_div = document.querySelector("div.errors")
    
    $("div.errors").transition('fade down')
    console.log(error_div)
    const ul = document.querySelector("ul.errors")
    
    
    errors.forEach(e => {
        const li = document.createElement("li")
        li.innerHTML = e
        ul.appendChild(li)
    })

    
    setTimeout(()=>{   $("div.errors").transition('fade down'); ul.innerHTML="" },5000)
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
    document.querySelector("button.logout").addEventListener("click",()=>{
        $("main").transition('horizontal flip')
        setTimeout(()=> { $('div.signUp_signIn').transition('horizontal flip')}, 800)
        setTimeout(()=>{location.reload()}, 1800) 
    })
})


