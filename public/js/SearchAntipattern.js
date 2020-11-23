
const id = document.getElementById("inputIDAntipattern")
const textArea = document.getElementById("relatedText")
const buttonCad = document.getElementById("cadAntRelated")

function search(){
    
    const input = {
        input: id.value
    }
    $.ajax({
        type: "post",
        url: "Antipattern/search",
        dataType: "json",
        contentType: "application/json",
        success:(response)=>{
            if(response.exists === true){
                //Mostrando q é válido
                if(id.classList.contains('is-invalid')){
                    id.classList.remove('is-invalid')
                }
                id.classList.add('is-valid')
                //Habilitando os 2 campos
                textArea.removeAttribute("disabled")
                buttonCad.removeAttribute("disabled")
                
            }
            else{
                //Mostrando q é invalido
                if(id.classList.contains('is-valid')){
                    id.classList.remove('is-valid')
                }
                id.classList.add('is-invalid')
                //Desabilitando os 2 campos
                textArea.setAttribute("disabled","disabled")
                buttonCad.setAttribute("disabled","disabled")
            }
               
        },
        data: JSON.stringify(input)
    })
}

// function cadRelatedAntipattern(){

// }
