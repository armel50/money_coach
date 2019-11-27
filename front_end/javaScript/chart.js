

class Chart_Generator{

    static add_eventlinstener(){
       const chart_btn =  document.querySelector("button.add_chart")
       const user_id = document.querySelector("h3[user-id]").getAttribute("user-id")

       chart_btn.addEventListener("click", () =>{
           
            User.get_user(user_id) 
       })
    }
    //process will analyze the user information and construct a chart if possible
    static process(data){
        console.log(data)
        const user = data.user
        const spending = data.categories
        const new_array = []
        const labels = []
        const colors = []
        if(user.income && spending.length > 0 ){
            new_array.push(user.income)
            labels.push("Income")
            colors.push("rgb(64, 139, 179)")
            spending.forEach(e => {new_array.push(e.cost);   labels.push(e.name)})
            while(colors.length !== labels.length){
               const new_color = `rgb(${Math.floor((Math.random() * 256))}, ${Math.floor((Math.random() * 256))}, ${Math.floor((Math.random() * 256))})`
                if(!colors.includes(new_color)){
                    colors.push(new_color)
                }
            }
            Chart_Generator.create_chart(new_array,labels,colors)
            Chart_Generator.summary(data)
        }
    }

    static summary(data){
        const user = data.user
        const spending = data.categories
        const total_spending = spending.map(e => e.cost).reduce((memo, e)=>e + memo,0)
        const max_spending = Math.max.apply( Math,spending.map( e=>e.cost))
        const category = spending.find(e => e.cost == max_spending)
        const div = document.querySelector("div.myChart")
        div.classList.remove("hidden")
        if(total_spending < user.income){
        div.innerHTML = `
                <h3>Summary</h3
                <p>Great Job!<br> You spend ${user.income - total_spending}$ less than you make, with your highest spending on ${category.name} at ${max_spending}$. Keep up!</p>
        `
        }else{
            div.innerHTML = `
                <h3>Summary</h3
                <p>Warning!<br> You spend ${total_spending - user.income}$ more than you make, with your highest spending on ${category.name} at ${max_spending}$v.<br> Please reduce the cost of your spending.</p>
        `
        }
        
    }
    static create_chart(data,labels,colors){
        const ctx = document.querySelector("canvas.myChart").getContext('2d')
        const myChart = new Chart(ctx,{
             type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: "Budget",
                    data: data,
                    backgroundColor: colors
                    

                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Your Budget Per Month",
                    fontSize: 30
                },
               legend: {
                    position: "bottom"
                }
            }
        })
    }
}