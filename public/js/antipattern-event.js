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

//Lista de codigos div
const CodeList = document.querySelector("#CodeList")
Actual_Codes = CodeList.querySelectorAll(".CadCode")
//\Lista de codigos div

//objeto a ser editado
var Object_edit = null

function click_add_btns() {
    Object_edit = null
    CadCodeDiv.classList.toggle("d-none")
}

// ao clicar em um Codigo o elemento dele é passado na variavel event
function click_edit_btn(event) {
    if(!CadCodeDiv.classList.contains("d-none"))
        return
    Object_edit = event.target
    //verificando se a pessoa clicou na imagem, caso sim utilize o elemento pai.
    if(Object_edit.nodeName === "IMG") {
        Object_edit = Object_edit.parentNode
    }
                                                        /*
                        Object_edit.querySelectorAll('span') retorna um vetor que contem todos os spans
                                                            [0] = ID
                                                            [1] = Alteredo_status
                                                            [2] = linguagem utilizada
                                                        */ 
    C_linguagem.value = Object_edit.querySelectorAll('span')[2].innerText
    C_Code.value = Object_edit.querySelector('textarea').innerText 
    CadCodeDiv.classList.toggle("d-none")
}


//atribuindo a função de click aos elementos considerados CadCode
for(let i of document.querySelectorAll(".CadCode")) {
    i.addEventListener('click',click_edit_btn);
}

//atribuindo a função de click ao elemento considerado botão pela id addCodeButton
document.querySelector("#addCodeButton").addEventListener("click",click_add_btns)

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
    div.style.backgroundColor = "rgba(0,0,0,0.01)"
    div.addEventListener('click',click_edit_btn);
    
    let image = document.createElement("img")
    image.src = "/images/file.png"
    image.style.width = "100%"
    image.classList.add("my-4")
    
    //id -1 para indicar que ainda não existe no bd
    let spanID = document.createElement("span")
    spanID.innerText = "-1"
    spanID.classList.add("d-none")

    //para saber se o elemento foi modificado
    let alterado = document.createElement("span")
    alterado.innerText = "false"
    alterado.classList.add("d-none")

    let linguagem = document.createElement("span")
    linguagem.innerText = language
    linguagem.classList.add("d-none")

    let textArea = document.createElement("textarea")
    textArea.textContent = code
    textArea.classList.add("d-none")

    div.appendChild(image)
    div.appendChild(spanID)
    div.appendChild(alterado)
    div.appendChild(linguagem)
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


//Salva os valores em uma nova instancia de Codigo, caso Object_edit tenha algo os dados serão substituidos ao invez de criar uma nova instancia
function saveBtn() {
    if(Object_edit==null){
        const res = GenCodeStrocture(C_linguagem.value,C_Code.value)
        CodeList.appendChild(res)
    }else {
        Object_edit.querySelectorAll('span')[1].innerText = "true"
        Object_edit.querySelectorAll('span')[2].innerText = C_linguagem.value
        Object_edit.querySelector('textarea').innerText = C_Code.value
    }
    Object_edit = null
    CadCodeDiv.classList.toggle("d-none")
    C_clear_inputs();
}

function cancelBtn() {
    Object_edit = null
    CadCodeDiv.classList.toggle("d-none")
    C_clear_inputs();
}

//parte do Antipattern

async function Save() {
    let formulario = new FormData()
    formulario.append("UserId",UserId.value)
    formulario.append("totalsends",TotalEnvios.value)
    formulario.append("IDExercise",IDExercicio.value)
    formulario.append("Eobservation",Obevent.innerText)
}