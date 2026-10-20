document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const inputTelefone = document.getElementById('telefone');
    const inputNome = document.getElementById('nome');
    const inputEmail = document.getElementById('email');

    // 1. Máscara automática para o campo de telefone
    if (inputTelefone) {
        inputTelefone.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) value = value.slice(0, 11);

            if (value.length > 6) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            } else if (value.length > 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else if (value.length > 0) {
                value = `(${value}`;
            }
            
            e.target.value = value;
        });
    }

    // 2. Interceptação do Envio do Formulário
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!inputNome.value.trim() || !inputEmail.value.trim() || !inputTelefone.value.trim()) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            const btnSubmit = form.querySelector('.btn-submit');
            
            btnSubmit.textContent = 'Enviando...';
            btnSubmit.style.opacity = '0.7';
            btnSubmit.disabled = true;

            setTimeout(() => {
                const container = document.querySelector('.form-container');
                
                container.innerHTML = `
                    <div style="text-align: center; padding: 20px 0;">
                        <div style="font-size: 50px; color: #10b981; margin-bottom: 15px;">✓</div>
                        <h2 style="color: #1e3a8a; margin-bottom: 10px;">Obrigado, ${inputNome.value.split(' ')[0]}!</h2>
                        <p style="color: #666; font-size: 14px; margin-bottom: 25px;">Recebemos seu interesse. Em breve entraremos em contato pelo e-mail <strong>${inputEmail.value}</strong>.</p>
                        <a href="index.html" style="display: inline-block; padding: 10px 20px; background: #1e3a8a; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600;">Voltar para o Início</a>
                    </div>
                `;
            }, 1500);
        });
    }
});