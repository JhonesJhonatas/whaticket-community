## Contexto

Realização de um desafio de implementar duas novas Features no Projeto WhaTicket.

> ⭐ Criar um status Pausado para os Tickets, mostrar isso em uma aba específica no front.

> ⭐ Criar uma página de Logs, mostrando o registro das ações mais importantes dentro do sistema.


## Alterações

* Criei uma nova aba para os tickets com status "paused"
* Criei botões para "pausar" ou "despausar" o ticket, de acordo com o status atual.
  
* Criei uma tabela de logs (passível de melhoria)
  ```js
  id: int(11)
  description: string
  authorId: int
  ```
* Criei a rota para listar os logs
* Implementei o registro de logs no service de UpdateTicketService

## Evidencias

### Tarefa em atendimento com possibilidade de pausar

![Screenshot 2024-09-09 012813](https://github.com/user-attachments/assets/4b4261c3-6d14-427b-8611-bd4f0e646679)

### Tarefa Pausada com possibilidade de despausar

![Screenshot 2024-09-09 012823](https://github.com/user-attachments/assets/37d82883-4633-4133-bc71-119cb9bf530c)

### Tela de Logs

![Screenshot 2024-09-09 012752](https://github.com/user-attachments/assets/d9315375-fa2e-459c-8d1c-6cc0651e899b)
