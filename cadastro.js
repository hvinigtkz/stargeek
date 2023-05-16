const mensagem = document.querySelector(".mensagem");
const formulario = document.getElementById("formulario");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmarsenha = document.getElementById("confirmarsenha");


formulario.onsubmit = (evento) =>{
    if(nome.value == ""){
        evento.preventDefault();
        mensagem.innerHTML ="<p> Digite Seu Nome! </p>";
        nome.focus();
        return null;
    }

    if(email.value == ""){
        evento.preventDefault();
        mensagem.innerHTML = "<p> Digite seu email! </p>";
        email.focus();
        return null;
    }

    if(password.value == ""){
        evento.preventDefault();
        mensagem.innerHTML = "<p> Digite sua senha! </p>";
        password.focus();
        return null;
    }

    if(confirmarsenha.value == ""){
        evento.preventDefault();
        mensagem.innerHTML = "<p> Confirmar sua senha </p>";
        confirmarsenha.focus();
        return null;
    }
    
    if(confirmarsenha.value != password.value ){
        evento.preventDefault();
        mensagem.innerHTML = "<p> senhas não compativéis </p>";
        confirmarsenha.focus();
        return null;
    }

    
    let dados = JSON.parse(localStorage.getItem("dados")) || [];
    dados.push({
        nome : nome.value,
        email : email.value,
        password : password.value
    })
    localStorage.setItem("dados", JSON.stringify(dados));  
    evento.preventDefault();
    mensagem.innerHTML="<p> Parabens Cadastro Feito com sucesso! </p>";

    setTimeout(()=>{
        window.location.assign("login.html");
    }, 3000);
}