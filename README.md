# Contributing

### Atualmente os tipos de Cards são:

- `Tarefa` - Novas funcionalidades ou melhorias são criadas como "tarefas".
- `Erro` - Erros ou Retornos das tarefas para correção.

### Cada card tem uma prioridade, segue as atuais:
  - <img src="https://before.atlassian.net/images/icons/priorities/critical.svg" width="16px" height="16"/> Urgente  
  - <img src="https://before.atlassian.net/images/icons/priorities/major.svg" width="16px" height="16"/> Alta  
  - <img src="https://before.atlassian.net/images/icons/priorities/medium.svg" width="16px" height="16"/> Média  
  - <img src="https://before.atlassian.net/images/icons/priorities/minor.svg" width="16px" height="16"/> Baixa  
  - <img src="https://before.atlassian.net/images/icons/priorities/blocker.svg" width="16px" height="16"/> Nenhuma  

### Regras para pegar as tarefas para desenvolvimento:
  1. Erros naturalmente tem prioridade sobre os outros tipos.  
  2. Cards na coluna **"correção"** tem prioridade sobre as outras colunas.  
  3. Em seguida a prioridade diferencia qual card deve ser feito primeiro.  

### Para cada Card crie uma branch com o `id` do card.
  1. Crie uma branch com o id do card que está desenvolvendo:`[DV-ID]`  
  2. Quando commitar o card que está desenvolvendo utilizar o tipo correspondente:  
  ![](https://placehold.it/15/6EB278/000000?text=+) `[NEW]` - Novas Features e Modulos refatorados.  
  ![](https://placehold.it/15/F2C94C/000000?text=+) `[UPDATE]` - Melhorias, correções e out alteração no code base.  
  ![](https://placehold.it/15/EB5757/000000?text=+) `[BUGFIX]` - Correção de erros.  
  3. Quando submeter um **PULL REQUEST** com as suas alterações seguir o modelo:  
    `[TIPO] DV-ID : Descrição`  
    `[UPDATE] DV-82 : Correção Melhorias Despesa`    

### Enviar PRs
- Crie uma branch na sua maquina com o número do card. Exemplo:
```
git checkout -b DV-123 upstream/homolog
```
- Abra uma PR do seu origin para o tutorar-web
- Mantenha o branch em seu fork
- Recomendado manter o branch localmente como backup até o fechamento do sprint

### Retornos para PR nos card
- Quando uma PR for rejeitada no *Code Review*, comentar no Card, as correção com as alterações necessárias, utilizando o modelo:

  ```text
      # Alterações/correções são necessárias no seu código:
      # https://github.com/Paw-Patrol/tutorar-web/pull/{id}

  ```

  Resumo dos retornos:
  ```
   # Erros corrigidos
  
  ```

  Resultados dos testes:
  ```text
    # Teste aprovado
  ```

  Pendências:
  ```  
  # Pendências foram encontradas:
  
  ```
