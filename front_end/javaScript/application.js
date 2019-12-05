
class Application {
    static form_handler(submission_event,array_of_input){
        array_of_input.forEach(e => {
            e.value = ""
        })
        submission_event.preventDefault()
    }

    static params(method,data_hash){
        return {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
           body: JSON.stringify(data_hash)
        }
    }
}