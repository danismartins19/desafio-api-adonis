import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'AlunosController.create')
  Route.get('/:matricula', 'AlunosController.read')
  Route.put('/:matricula', 'AlunosController.update')
  Route.delete('/:matricula', 'AlunosController.delete')
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
}).prefix('/sala')
