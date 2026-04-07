
const testCreateUser = async () => {
  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Teste Local',
        email: 'local@test.com',
        passwordHash: 'senha123'
      })
    });
    const data = await response.json();
    console.log('Usuário criado:', data);
  } catch (err) {
    console.error('Erro:', err);
  }
};

testCreateUser();