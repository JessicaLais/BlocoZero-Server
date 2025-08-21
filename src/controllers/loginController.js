//import bcrypt from "bcrypt";

let users = [
  { id: 1, username: "joao@blocozero.com", password: "BlocoZero@2025a" },
  { id: 2, username: "maria@blocozero.com", password: "BlocoZero@2025a" }
];

// Rota auxiliar para exibição de usuários cadastrados no sistema 
export const getAllUsers = (req, res) => {
  res.json(users);
};

// lógica de login/autenticação
export const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

/*
bcrypt.compare(password, user.password, (error, hashValido) => {
  if (error) {
    console.error("Erro ao comparar senhas:", error);
    return;
  }
  if (!hashValido) {
    console.error("Senha inválida");
    return;
  }
  console.log("Senha válida");
});
*/
  
  

  if (user) {
    return res.status(200).json({ message: "Authenticated User" });
  }

  res.status(401).json({ error: "Invalid username or password" });
};
