import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'AlunosController.create')
  Route.get('/:matricula', 'AlunosController.read')
  Route.put('/:matricula', 'AlunosController.update')
  Route.delete('/:matricula', 'AlunosController.delete')
  Route.get('/:matricula/listarSalas', 'AlunosController.listarSalas')
}).prefix('/aluno')

Route.group(() => {
  Route.post('/', 'ProfessorsController.create')
  Route.get('/:matricula', 'ProfessorsController.read')
  Route.put('/:matricula', 'ProfessorsController.update')
  Route.delete('/:matricula', 'ProfessorsController.delete')
}).prefix('/professor')

Route.group(() => {
  Route.post('/', 'SalasController.create')
  Route.get('/:num', 'SalasController.read')
  Route.put('/:num', 'SalasController.update')
  Route.delete('/:num', 'SalasController.delete')
  Route.post('/:num/addAluno/:matricula', 'SalasController.addAluno')
  Route.delete('/:num/delAluno/:matricula', 'SalasController.delAluno')
  Route.get('/:num/verAlunos','SalasController.verAlunos')
}).prefix('/sala')

