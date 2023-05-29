const cadastro = document.getElementById("cadastro");
const cards = document.querySelector(".cards");
const cadmodal = document.querySelector(".cadmodal");
const formulario = document.getElementById("formulario");
const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const foto = document.getElementById("foto");
const botaocadastrar = document.querySelector(".btncadastrar");
const botaoeditar = document.querySelector(".btneditar");
const botaofechar = document.querySelector(".btnclose");
const idelemento = document.getElementById("idalterar");
const botaomodal = document.getElementById("botaomodal");


var emiallogado;
femaillogado();


function carregarCatalogo(){
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    let divcard = document.createElement("div");
    if(dados == null){
        divcard.innerHTML = "<p>Nenhum item cadsatrado</p>";
        cards.appendChild(divcard);
        return null;
    }

    dados.forEach((elemento, indice) => {
        if(elemento.email == emiallogado){
        let divcard = document.createElement("div");
        divcard.innerHTML = `<div class="cardimagem"> <img src="imagens/${elemento.foto}"> </div> <div class="cardnome">${elemento.nome} <p>${elemento.descricao}</p></div> <div class="cardinfo">
        <div class="editar"><i class="bi bi-pencil-fill" onclick="editar(${indice})"></i></div>
        <div class="excluir"><i class="bi bi-trash3-fill" onclick="excluir(${indice})"></i></div>
        </div>`;

        cards.appendChild(divcard);}
        
    });
}

carregarCatalogo();

botaomodal.onclick = ()=>{
    cadmodal.style.display = "flex";
    botaoeditar.style.display = "none";
    salvaEdicao.style.display = "none";
}

function fechar(){
    cadmodal.style.display = "none";
}


function excluir(indice){
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    if(dados.length == 1)
    {localStorage.clear("catalogo");}
    else{
    dados.splice(indice,1);
    localStorage.setItem("catalogo", JSON.stringify(dados));
    }
    window.location.reload();
}


function editar(indice){
    nome.value = "";
    descricao.value = "";
    foto.files[0] = null;
    cadmodal.style.display = "flex";
    botaocadastrar.style.display = "none";
    botaoeditar.style.display = "block";
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    nome.value = dados[indice].nome;
    descricao.value = dados[indice].descricao;
    idelemento.value = indice;
    fotoa = dados[indice].foto;
}


var fotoa;


botaoeditar.onclick = (evento) =>{
    if ((fotoa != foto.value)&&(foto.value != "")){
    evento.preventDefault();
    fenvio()
    .then(result =>{
                     if(result){
                        salvaEdicao(nomeArq);
                        }
                    });
    }
    else
    {
        salvaEdicao(fotoa);
    } 
}




function salvaEdicao(fotoa){
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    dados[idelemento.value].nome = nome.value;
    dados[idelemento.value].descricao = descricao.value;
    dados[idelemento.value].foto = fotoa;
    dados[idelemento.value].emial = emiallogado;
    localStorage.setItem("catalogo", JSON.stringify(dados));

}


var nomeArq;
async function fenvio() { 
    const url = 'http://localhost:3005/upload';
    const arquivo = document.getElementById("foto").files[0];
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    console.log(JSON.stringify(formData.values[0]));
    console.log(JSON.stringify(formData.values[1]));
    try{
         
         var resp = await fetch(url, {
                                       method: 'POST',
                                       body: formData,
                                     }
                               ) 
         console.log(resp);
         if (resp.ok){
           let respText = await resp.text();
           nomeArq = respText;
           return true;
         }
         else{
              return false;
         }
       }
    catch (error) {
        console.error(error);
        return false;
      }
}

function femaillogado(){
    let dados = JSON.parse(sessionStorage.getItem("logado"));
    if (dados == null){
      window.location.assign("login.html");
    }else{
      emiallogado = dados[0].email;
    }
  }