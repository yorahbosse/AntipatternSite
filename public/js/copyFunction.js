//code by PatoLoco
function Copy(id) {
    var copyText = document.getElementById('copy' + id);
    
    copyText.setSelectionRange(0, 99999)
    copyText.select();

    document.execCommand("copy");
    //alert("Copied the text: " + copyText.value);
}
