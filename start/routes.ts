import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'AlunosController.create')
  Route.get('/:id', 'AlunosController.read')
  Route.put('/:id', 'AlunosController.update')
  Route.delete('/:id', 'AlunosController.delete')
}).prefix('/aluno')

Route.group(() => {
  Route.post('/', 'ProfessorsController.create')
  Route.get('/:id', 'ProfessorsController.read')
  Route.put('/:id', 'ProfessorsController.update')
  Route.delete('/:id', 'ProfessorsController.delete')
}).prefix('/professor')

Route.group(() => {
  Route.post('/', 'SalasController.create')
  Route.get('/:id', 'SalasController.read')
  Route.put('/:id', 'SalasController.update')
  Route.delete('/:id', 'SalasController.delete')
}).prefix('/sala')
