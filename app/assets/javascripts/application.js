// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require_tree .

function selecionarCpfCliente(cpf){

    var cpfCliente = document.getElementById("cliente");
    cpfCliente.value = cpf;
}

function selecionarCpfFuncionario(cpf){

    var cpfCliente = document.getElementById("funcionario");
    cpfCliente.value = cpf;
}

let valorContaDevendo = 0;
let valorContaAtrasada = 0;
let valorContaPagas = 0;

function setValorContaDevendo(valor) {
    valorContaDevendo = valor;
    document.getElementById("contasDevendo").innerHTML = "Contas Devendo = 0";
    document.getElementById("valorContas").value = "0";
}

function removeridsContasDevendo(ids, conta) {
    var resultado = ids.value.split("-");
    var result = "";
    for(var i = 0; i < resultado.length; i++){
        if(resultado[i].toString() !== "" && conta.toString() !== resultado[i].toString()){
            result += "-" + resultado[i].toString();
        }
    }
    return result;
}
function contasDevendoSelecionadas(conta, flag) {
    var ids = document.getElementById("idsContasDevendoSelecionadas");
    if(flag){
        ids.value += "-" + conta;
    }
    else{
        ids.value = removeridsContasDevendo(ids.value, conta);
    }
}

function somarContasDevendo(conta, valor) {
    valorContaDevendo += valor;
    document.getElementById("contasDevendo").innerHTML = "Contas Devendo = " + valorContaDevendo;
    document.getElementById("valorContas").value = valorContaDevendo + valorContaAtrasada;
    contasDevendoSelecionadas(conta, true);
}

function selecionarContaDevendo(clickedid, valor) {
    if (document.getElementById(clickedid).checked) { // deixar ele true
        valorContaDevendo += valor;
        document.getElementById("contasDevendo").innerHTML = "Contas Devendo = " + valorContaDevendo;
        contasDevendoSelecionadas(clickedid, true);
    } else {  // deixar ele falso
        valorContaDevendo -= valor;
        var resultado = "Contas Devendo = " + valorContaDevendo.toString();
        document.getElementById("contasDevendo").innerHTML = resultado;
        contasDevendoSelecionadas(clickedid, false);
    }
    document.getElementById("valorContas").value = valorContaDevendo + valorContaAtrasada;
}

function setValorContaAtrasada(valor) {
    valorContaAtrasada = valor;
    document.getElementById("contasAtrasada").innerHTML = "Contas Atrasadas = 0";
    document.getElementById("valorContas").value = "0";
}

function removeridsContasAtrasada(ids, conta) {
    var resultad = ids.value.split("-");
    var result = "";
    for(var i = 0; i < resultad.length; i++){
        if(resultad[i].toString() !== "" && conta.toString() !== resultad[i].toString()){
            result += "-" + resultad[i].toString();
        }
    }
    return result;
}
function contasAtrasadaSelecionadas(conta, flag) {
    var ids = document.getElementById("idsContasAtrasadaSelecionadas");
    if(flag){
        ids.value += "-" + conta;
    }
    else{
        ids.value = removeridsContasAtrasada(ids.value, conta);
    }
}

function somarContasAtrasada(conta, valor) {
    valorContaAtrasada += valor;
    document.getElementById("contasAtrasada").innerHTML = "Contas Atrasadas = " + valorContaAtrasada;
    document.getElementById("valorContas").value = valorContaDevendo + valorContaAtrasada;
    contasAtrasadaSelecionadas(conta, true);
}

function selecionarContaAtrasada(clickedid, valor) {
    if (document.getElementById(clickedid).checked) { // deixar ele true
        valorContaAtrasada += valor;
        document.getElementById("contasAtrasada").innerHTML = "Contas Atrasadas = " + valorContaAtrasada;
        contasAtrasadaSelecionadas(clickedid, true);
    } else {  // deixar ele falso
        valorContaAtrasada -= valor;
        document.getElementById("contasAtrasada").innerHTML = "Contas Atrasadas = " + valorContaAtrasada;
        contasAtrasadaSelecionadas(clickedid, false);
    }
    document.getElementById("valorContas").value = valorContaDevendo + valorContaAtrasada;
}

function selecionarCpfNomeCliente(nome, cpf) {
    document.getElementById("cpf").value = cpf;
    document.getElementById("nome").value = nome;
}

function somarContasPagasCliente(valor) {
    valorContaPagas += valor;
    document.getElementById("contasPagas").innerHTML = "Contas Pagas = " + valorContaPagas;
}
function selecionarContaPagasCliente(clickedid, valor) {
    if (document.getElementById(clickedid).checked) { // deixar ele true
        valorContaPagas += valor;
        document.getElementById("contasPagas").innerHTML = "Contas Pagas = " + valorContaPagas;
    } else {  // deixar ele falso
        valorContaPagas -= valor;
        document.getElementById("contasPagas").innerHTML = "Contas Pagas = " + valorContaPagas;
    }
}

function somarContasDevendoCliente(valor) {
    valorContaDevendo += valor;
    document.getElementById("contasDevendoCliente").innerHTML = "Contas Devendo = " + valorContaDevendo;
}
function selecionarContaDevendoCliente(clickedid, valor) {
    if (document.getElementById(clickedid).checked) {
        valorContaDevendo += valor;
        document.getElementById("contasDevendoCliente").innerHTML = "Contas Devendo = " + valorContaDevendo;
    } else {
        valorContaDevendo -= valor;
        document.getElementById("contasDevendoCliente").innerHTML = "Contas Devendo = " + valorContaDevendo;
    }
}

function somarContasAtrasadasCliente(valor) {
    valorContaAtrasada += valor;
    document.getElementById("contasAtrasada").innerHTML = "Contas Atrasadas = " + valorContaAtrasada;
}
function selecionarContaAtrasadaCliente(clickedid, valor) {
    if (document.getElementById(clickedid).checked) {
        valorContaAtrasada += valor;
        document.getElementById("contasAtrasada").innerHTML = "Contas Atrasadas = " + valorContaAtrasada;
    } else {
        valorContaAtrasada -= valor;
        document.getElementById("contasAtrasada").innerHTML = "Contas Atrasadas = " + valorContaAtrasada;
    }
}