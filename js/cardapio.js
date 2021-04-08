function filtrar(id) {
    if (id == "ctudo") {
        document.getElementById("frame").src = "iframe_cardapio.html";
    } else {
        if (id == "csalg") {
            document.getElementById("frame").src = "iframe_salgados.html";
        } else {
            if (id == "cdoce") {
                document.getElementById("frame").src = "iframe_docinhos.html";
            }
        }
    }
}
function adiciona(id) {
    if (id == "menos_doce_azul"|| id== "menos_salgado_azul" ) {
        if(document.getElementById("quant_doce").value >0){
            document.getElementById("quant_doce").value = document.getElementById("quant_doce").value - 1;
        }else{
            if(document.getElementById("quant_salgado").value >0){
                document.getElementById("quant_salgado").value = document.getElementById("quant_salgado").value - 1;
            }
        }
      
    } else {
        if (id == "mais_doce_azul"||id=="mais_salgado_azul") {
            if(document.getElementById("quant_doce").value<=7){
                document.getElementById("quant_doce").value = parseInt(document.getElementById("quant_doce").value) +1;
                
            }else{
                if(document.getElementById("quant_salgado").value<=7){
                    document.getElementById("quant_salgado").value = parseInt(document.getElementById("quant_salgado").value) +1;
                }
            }
         
        }
    }
}
function adicionaLinha(idTabela) {
    var tabela = document.getElementById(idTabela);
    var numeroLinhas = tabela.rows.length;
    var linha = tabela.insertRow(numeroLinhas);
    var celula1 = linha.insertCell(0);
    var celula2 = linha.insertCell(1);   
    var celula3 = linha.insertCell(2); 
    celula1.innerHTML = 'produto '+ Math.floor((Math.random() * 100) + 1); 
    celula2.innerHTML =  Math.floor((Math.random() * 100) + 1); 
    celula3.innerHTML =  "<button onclick='removeLinha(this)'>Remover</button>";
}

// funcao remove uma linha da tabela
function removeLinha(linha) {
  var i=linha.parentNode.parentNode.rowIndex;
  document.getElementById('tbl').deleteRow(i);
}            