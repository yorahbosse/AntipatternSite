// Inputs
const UserId = document.querySelector("#UserId")
const TotalEnvios = document.querySelector("#TotalEnvios")
const IDExercicio = document.querySelector("#IDExercicio")
const Obevent = document.querySelector("#Obevent")
const ObCodeErr = document.querySelector("#ObCodeErr")
const ProbCode = document.querySelector("#ProbCode")
const SolCode = document.querySelector("#SolCode")
const CadCodeDiv = document.querySelector("#CadCode")

//\inputs
const add_btns = document.querySelectorAll(".addButton")

//Lista de codigos div
const CodeList = document.querySelector("#CodeList")
Actual_Codes = CodeList.querySelectorAll(".CadCode")
//\Lista de codigos div

function click_add_btns() {
    CadCodeDiv.classList.toggle("d-none")
}

//atribuindo a função de click aos elementos considerados botão
for(let i of add_btns)
    i.addEventListener("click",click_add_btns)

//gerador de estrotura basica de um codigo, com seus devidos parametros 
function GenCodeStrocture(language,code){
    let empty = language.length*code.length
    
    if(empty===0){
        alert("Err: Algum campo estava vazio")
        return
    }

    let div = document.createElement("div")
    div.classList.add("CadCode")
    div.classList.add("col-md-2")
    div.classList.add("m-4")
    div.classList.add("border")

    let image = document.createElement("img")
    image.src = "/images/file.png"
    image.style.width = "100%"
    image.classList.add("my-4")
    
    let span = document.createElement("span")
    span.innerText = language
    span.classList.add("d-none")

    let textArea = document.createElement("textarea")
    textArea.textContent = code
    textArea.classList.add("d-none")

    div.appendChild(image)
    div.appendChild(span)
    div.appendChild(textArea)
    return div
}


//CadCode Inputs
const C_linguagem = document.querySelector("#linguagem")
const C_Code = document.querySelector("#Code")

//APAGA os inputs
function C_clear_inputs(){
    C_linguagem.value = undefined
    C_Code.value = ""
}



function saveBtn() {
    const res = GenCodeStrocture(C_linguagem.value,C_Code.value)
    console.log(C_linguagem.value,C_Code.value)
    CodeList.appendChild(res)
    CadCodeDiv.classList.toggle("d-none")
    C_clear_inputs();
}

function cancelBtn() {
    CadCodeDiv.classList.toggle("d-none")
    C_clear_inputs();
}