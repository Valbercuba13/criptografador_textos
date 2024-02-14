document.addEventListener('DOMContentLoaded', function () {
    const inputTexto = document.getElementById('inputTexto');
    const outputCriptografado = document.getElementById('outputCriptografado');
    const btnCriptografar = document.getElementById('btnCriptografar');
    const btnDescriptografar = document.getElementById('btnDescriptografar');
    const btnCopiar = document.getElementById('btnCopiar');
    const btnLimpar = document.getElementById('btnLimpar');
    const alerta = document.getElementById('alerta');
    const mensagemNaoEncontrada = document.getElementById('mensagemNaoEncontrada');

    let textoCriptografado = '';

    function criptografarTexto(texto, deslocamento) {
        return texto.split('').map(char => {
            if (char.match(/[a-zA-Z]/)) {
                const isUpperCase = char === char.toUpperCase();
                const codeA = isUpperCase ? 65 : 97;
                const alphabetSize = 26;
                const charCode = char.charCodeAt(0);
                const encryptedCharCode = (charCode - codeA + deslocamento) % alphabetSize + codeA;
                return String.fromCharCode(encryptedCharCode);
            } else {
                return char;
            }
        }).join('');
    }

    function descriptografarTexto(textoCriptografado, deslocamento) {
        return criptografarTexto(textoCriptografado, -deslocamento);
    }

    inputTexto.addEventListener('paste', function (event) {
        const clipboardData = event.clipboardData || window.clipboardData;
        const pastedText = clipboardData.getData('text');

        const isCriptografado = /[^\w\s]/.test(pastedText);

        if (isCriptografado) {
            btnCriptografar.disabled = true;
        } else {
            btnCriptografar.disabled = false;
        }
    });

    btnCriptografar.addEventListener('click', function () {
        const textoOriginal = inputTexto.value.trim();

        if (textoOriginal === '') {
            alerta.innerText = 'Digite um texto antes de criptografar!';
            alerta.style.display = 'block';
        } else {
            const isTextoColado = /[^\w\s]/.test(textoOriginal);

            if (isTextoColado) {
                alert('Você está tentando criptografar um texto colado. Por favor, digite manualmente.');
            } else {
                const deslocamento = 3;
                textoCriptografado = criptografarTexto(textoOriginal, deslocamento);
                outputCriptografado.value = textoCriptografado;
                alerta.style.display = 'none';
                mensagemNaoEncontrada.style.display = 'none';
                btnDescriptografar.style.display = 'inline-block';
                btnCopiar.style.display = 'inline-block';
                btnLimpar.style.display = 'inline-block';
            }
        }
    });

    btnDescriptografar.addEventListener('click', function () {
        if (textoCriptografado === '') {
            alerta.innerText = 'Não há texto criptografado para descriptografar!';
            alerta.style.display = 'block';
        } else {
            const deslocamento = 3;
            const textoDescriptografado = descriptografarTexto(textoCriptografado, deslocamento);
            outputCriptografado.value = textoDescriptografado;
            alerta.style.display = 'none';
            mensagemNaoEncontrada.style.display = 'none';
        }
    });

    btnCopiar.addEventListener('click', function () {
        outputCriptografado.select();
        document.execCommand('copy');
        alert('Texto criptografado copiado para a área de transferência!');
    });

    btnLimpar.addEventListener('click', function () {
        inputTexto.value = '';
        outputCriptografado.value = '';
        alerta.style.display = 'none';
        mensagemNaoEncontrada.style.display = 'none';
    });

    inputTexto.addEventListener('input', function () {
        mensagemNaoEncontrada.style.display = inputTexto.value.trim() === '' ? 'block' : 'none';
    });
});