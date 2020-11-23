//code by PatoLoco
function Copy(id) {
    var copyText = document.getElementById('copy' + id);
    
    copyText.setSelectionRange(0, 99999)
    copyText.select();

    document.execCommand("copy");
    //alert("Copied the text: " + copyText.value);

    $('#tooltip' + id).tooltip('hide')
    
}

//Codigo para ativar tooltips do bootstrap para os itens com o data-toggle especifico
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
