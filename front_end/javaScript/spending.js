class Spending{
    static submit(){
        const submit_spending = document.querySelector("form.new_spending")
        const name = submit_spending.querySelector("input[name='name']")
        const cost = submit_spending.querySelector("input[name='cost']")

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
                                <br>
                                <br>
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
                <br>
                <br>
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