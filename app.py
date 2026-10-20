import sqlite3
from flask import Flask, render_template, request

app = Flask(__name__)

# Função que cria o banco de dados e a tabela automaticamente
def init_db():
    conn = sqlite3.connect('dados.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS interessados (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            telefone TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Executa a criação da tabela ao iniciar
init_db()

# Rota para carregar o formulário (interesse.html)
@app.route('/')
def index():
    return render_template('interesse.html')

# Rota para receber os dados do formulário e salvar no banco
@app.route('/enviar', methods=['POST'])
def enviar():
    nome = request.form['nome']
    email = request.form['email']
    telefone = request.form['telefone']

    # Conecta e insere no banco de dados SQLite
    conn = sqlite3.connect('dados.db')
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO interessados (nome, email, telefone) 
        VALUES (?, ?, ?)
    ''', (nome, email, telefone))
    conn.commit()
    conn.close()

    return f"<h1>Obrigado, {nome}! Seus dados foram salvos com sucesso.</h1><a href='/'>Voltar</a>"

if __name__ == '__main__':
    app.run(debug=True)