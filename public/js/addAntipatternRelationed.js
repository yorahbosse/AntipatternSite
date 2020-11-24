const antipattern_B = document.getElementById("inputIDAntipattern")
const relatedText = document.getElementById("relatedText")

function register(){
    $.ajax({
        type: "post",
        url: "Antipattern/addRelationed",
        dataType: "json",
        contentType: "application/json",
        success:(response)=>{
            
        },
        data: JSON.stringify()
    })
}