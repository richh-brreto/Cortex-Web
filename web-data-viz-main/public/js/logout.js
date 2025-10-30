// Função para fazer logout do usuário
function logout() {
    sessionStorage.clear();
    localStorage.clear();
    
    window.location.href = "../login.html";
}