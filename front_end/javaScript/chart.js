

class Chart_Generator{

    static add_eventlinstener(id){
       const chart_btn =  document.querySelector("button.add_chart")
       const user_id = id
        console.log("thisiiii the user id " + user_id)
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

            // new_array.push(user.income)
            // labels.push("Income")
            // colors.push("rgb(64, 139, 179)")
            spending.forEach(e => {new_array.push(e.cost);   labels.push(e.name)})
            while(colors.length !== labels.length){
               const new_color = `rgb(${Math.floor((Math.random() * 256))}, ${Math.floor((Math.random() * 256))}, ${Math.floor((Math.random() * 256))})`
                if(!colors.includes(new_color)){
                    colors.push(new_color)
                }
            }
            if (!document.querySelector("div.chart-info").classList.contains("hidden")){
                document.querySelector("div.chart-info").classList.add("hidden")
            }
            Chart_Generator.create_chart(user.income,new_array,labels,colors)
            Chart_Generator.summary(data)
        }else{
            document.querySelector("canvas").style.display = ""
            if (document.querySelector("div.chart-info").classList.contains("hidden")){
                document.querySelector("div.chart-info").classList.remove("hidden")
            }

            
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
                <p>Warning!<br> You spend ${total_spending - user.income}$ more than you make, with your highest spending on ${category.name} at ${max_spending}$.<br> Please reduce the cost of your spending.</p>
        `
        }
        
    }
    static create_chart(income,data,labels,colors){
//Basic configuration to have a text in the center of the doughnut
        Chart.pluginService.register({
            beforeDraw: function (chart) {
              if (chart.config.options.elements.center) {
                //Get ctx from string
                var ctx = chart.chart.ctx;
          
                //Get options from the center object in options
                var centerConfig = chart.config.options.elements.center;
                var fontStyle = centerConfig.fontStyle || 'Arial';
                var txt = centerConfig.text;
                var color = centerConfig.color || '#000';
                var sidePadding = centerConfig.sidePadding || 20;
                var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
                //Start with a base font of 30px
                ctx.font = "30px " + fontStyle;
          
                //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                var stringWidth = ctx.measureText(txt).width;
                var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
          
                // Find out how much the font can grow in width.
                var widthRatio = elementWidth / stringWidth;
                var newFontSize = Math.floor(30 * widthRatio);
                var elementHeight = (chart.innerRadius * 2);
          
                // Pick a new font size so it will not be larger than the height of label.
                var fontSizeToUse = Math.min(newFontSize, elementHeight);
          
                //Set font settings to draw it correctly.
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
                ctx.font = fontSizeToUse+"px " + fontStyle;
                ctx.fillStyle = color;
          
                //Draw text in center
                ctx.fillText(txt, centerX, centerY);
              }
            }
          });


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
                cutoutPercentage: 70,
                title: {
                    display: true,
                    text: "Your Budget Per Month",
                    fontSize: 30
                },
               legend: {
                    position: "bottom"
                },
                //elments is responsible for the display of the text in the center of the doughnut
                elements: {
                    center: {
                    text: `Income: ${income} $`,
                    color: '#36A2EB', //Default black
                    fontStyle: 'Helvetica', //Default Arial
                    sidePadding: 15 //Default 20 (as a percentage)
                  }
                }
            }
        })
    }
}