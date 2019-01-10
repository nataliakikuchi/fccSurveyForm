const cepInput = document.querySelector('#zipCode');
cepInput.addEventListener("keyup", function() {

  const cep = cepInput.value;
  console.log(cep);

  if(cep.length == 8) {
    //const URL = 'https://api.postmon.com.br/v1/cep/' + cep;
    //fetch(URL)

    fetch(`https://api.postmon.com.br/v1/cep/${cep}`)
      .then(function(response) {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(function(endereco) { //endereco é a promise (promessa de resposta) response resolvida
        
        const enderecoCompleto = document.querySelector('#address');

        enderecoCompleto.style.display = "block";

        enderecoCompleto.innerHTML = "Seu endereço é " + endereco.logradouro + ", " + endereco.bairro + ", " + endereco.cidade + ", " + endereco.estado + "."
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
      });   
  }
});

//script para inserção do mapa do Google Maps

//Inicia e adiciona o mapa
function initMap() {
  //Localização
  const japao = {lat: 31.681995, lng: 120.3034471};
  //Mapa centralizado na localização. O new constrói o objeto que representa o mapa e o insere no elemento que passei como parâmetro, a div com a classe map
  const map = new google.maps.Map(document.querySelector('.map'), {zoom:4, center: japao});
  //Posicionador na localização. O ícone de localização
  const maker = new google.maps.Marker({position: japao, map: map});
}