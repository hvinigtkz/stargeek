const mensagem = document.querySelector(".mensagem");
const email = document.getElementById("email");
const senha = document.getElementById("password");
const formulario =  document.getElementById("formulario");

formulario.onsubmit = (eveto) =>{
    let dados = JSON.parse(localStorage.getItem("dados"));
    
    dados.forEach(elemento => {
        if(elemento.email === email.value && elemento.password === password.value){
            eveto.preventDefault();
            mensagem.innerHTML="Aguarde redirecionando...";
            let dados = JSON.parse(sessionStorage.getItem("logado")) || [];
            dados.push(
                {
                    email : email.value
                }
            )
            sessionStorage.setItem("logado", JSON.stringify(dados));
            setTimeout(()=>{
                window.location.assign("catalogodoclient.html");
            }, 3000)
            return true;


        } else{
            mensagem.innerHTML ="Senha ou Email Incorreto";
            eveto.preventDefault();
        }

    });
}
