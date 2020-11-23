//lista para verificar se um conteudo selecionado ja esta na lista
var lista_verif = []

function remover_conteudo(event){
    let conteudo = event.target
    conteudo = conteudo.parentNode

    //console.log(conteudo.id)

    //removendo o elemento da lista de verificacao para poder ser inserido denovo se necessario
    var index = lista_verif.indexOf(conteudo.id)
    //verificando se o elemento realmente existe
    if(index > -1){
        lista_verif.splice(index, 1)
    }

    //desativando a checkbox correspondente
    var checkbox = document.getElementById(`check${conteudo.id}`)
    console.log(checkbox)
    checkbox.checked = false

    //removendo a partir do pai
    conteudo.parentNode.removeChild(conteudo)

}

function atualizar(event){

    var select = document.getElementById('adicionar')

    var value = select.options[select.selectedIndex].value;
    var text = select.options[select.selectedIndex].text; 
    text += ' '

    //ignorar a opcao "selecione um conteudo"
    if(value == 0)
        return
    //ignorar caso ja esteja na lista
    for(let i of lista_verif){
        if(i == value)
            return
    }

    lista_verif.push(value)

    //console.log(text)

    //ativando a checkbox correspondente
    var checkbox = document.getElementById(`check${value}`)
    checkbox.checked = true


    //document.getElementById('conteudos').classList.remove('d-none')

    let span = document.createElement('span')
    span.classList.add('badge')
    span.classList.add('badge-pill')
    span.classList.add('badge-info')
    span.classList.add('m-1')

    span.innerText = text
    span.id = value

    let span2 = document.createElement('span')
    span2.classList.add('badge')
    span2.classList.add('badge-light')
    span2.classList.add('pb-1')
    span2.classList.add('pr-1')
    span2.title = 'Remover'
    span2.style = 'cursor: pointer'

    span2.innerText = 'x'

    span2.addEventListener('click', remover_conteudo)

    span.appendChild(span2)

    var elementos = document.getElementById('elementos')

    elementos.appendChild(span)

}

$(document).ready(function() {
$('.js-example-basic-single').select2();
});