function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
      console.log("************************* deu rui")

        return false;
    }

    // Verifica se todos os dígitos são iguais
    const todosDigitosIguais = /^(.)\1+$/.test(cpf);
    if (todosDigitosIguais) {
        return false;
    }

    // Calcula os dígitos verificadores
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(9))) {
        return false;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(10))) {
        return false;
    }

    return true;
}

module.exports = { validarCPF };