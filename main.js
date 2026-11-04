/// SISTEMA BUSCA CEP

// variavel para capturar os dados do formulario

const formCEP = document.getElementById("form-cep");
const inputCEP = document.getElementById ("input-cep");
const resultado = document.getElementById("resultado");

// 2 - IDENTIFICAR O ENVIO DO FORMULÁRIO 

// addEventListener() permite escutar acontecimentos dentro da pagina - chamado de eventos

formCEP.addEventListener("submit", function (Event){
    Event.preventDefault();  //impede que a pagina recarregue automaticamente - se caso recarregar os dados somem



// 3 - CAPTURANDO O CEP DO USUARIO
/*value acessa o conteúdo digitado dentro do input e trim( ) remove espaços em branco que o usuario colocar


*/
const cep = inputCEP.value.trim();


// 4 - VALIDAR O CEP

/* - Uma expressão regular é uma forma de definir um padrão que o texto precisa seguir -
^ - indica o inicio do texto
[0-9] - permite qualquer número de 0 até 9
{8} - exige exatamente 8 números
$ - indica o final do texto
só irá aceitar somente CEP´s que tenha 8 números */

const validacaoCep = /^[0-9]{8}$/;

// 5 - VERIFICANDO SE O CEP É VÁLIDO 

/*IF  é uma estrutura condicional que permite executar um bloco de código somente quando a condição for verdadeira
! = NÃO portanto, estamos verificando se o CEP NÃO corresponde o padrão esperado*/

if (!validacaoCep.test(cep)){

    resultado.innerHTML = '<p class="erro"> Por favor, digite um CEP válido com 8 números. </p>';

    // return encerra a execução da função naquele momento. Impedindo o sistema de consultar a API quando não passar pela validação
    return;    
}

// 6 - MENSAGEM DE CARREGAMENTO

resultado.innerHTML ='<p> Buscando...</p>';

// 7 - CONSUMINDO A API VIA CEP

/* API é uma forma de um sistema conversar com o outro para solicitar ou compartilhar as informações
 fetch () é uma função utilizada para requisições externas, nesse caso a API*/
 
 fetch (`https://viacep.com.br/ws/${cep}/json/`)

// 8 - TRANSFORMANDO A RESPOSTA DE API EM JSON
.then(response => response.json())

// 9 - RECEBER OS DADOS DO ENDEREÇO
.then(data => {

// 10 - VERIFICA SE O CEP FOI ENCONTRADO

if (data.erro){
    resultado.innerHTML = '<p class="erro> CEP não encontrado. </p>'
    return
}
// 11 - MOSTRA OS DADOS NA TELA 

resultado.innerHTML = `
<h2>Resultado<h2>
<p><strong>CEP:</strong> ${data.cep}</p>
<p><strong>Logradouro:</strong> ${data.logradouro}</p>
<p><strong>Bairro:</strong> ${data.bairro}</p>
<p><strong>Logradouro:</strong> ${data.logradouro}</p>
<p><strong>Cidade:</strong> ${data.localidade}</p>
<p><strong>UF:</strong> ${data.uf}</p>
`
})

.catch(() =>{
    resultado.innerHTML = '<p> class= "erro"> Erro ao buscar o CEP. Tente novamente mais tarde.'
});

});