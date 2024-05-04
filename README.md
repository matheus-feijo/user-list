# Iniciar projeto

* Instalar dependencias do projeto
```
npm i
```

* Iniciar aplicação no ambiente de desenvolvimento
```

npm run dev
```

* Iniciar o Json server
```
npx json-server db.json
```

* Link Deploy: https://user-list-lime.vercel.app/

### Requisitos Funcionais

- [x] Deve ser possivel listar usuarios cadastrados
- [x] Deve ser possivel editar usuario
- [x] Deve ser possivel filtrar usuarios pelo nome
- [x] Deve ser possivel criar/ativar/desativar outros usuarios
- [x] Deve ser possivel se autenticar
- [x] Deve ser possivel criar usuario

### Regra de Negócio

- [x] Somente ADMIN podera criar/desativar/ativar outros usuarios
- [x] Usuario Padrão deve ter acesso somente a lista e aos detalhes dos usuários cadastrados, mas não
deve conseguir executar alterações
