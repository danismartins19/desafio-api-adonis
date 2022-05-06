/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'AlunoController.create')
  Route.get('/:id', 'AlunoController.read')
  Route.put('/:id', 'AlunoController.update')
  Route.delete('/:id', 'AlunoController.delete')
}).prefix('/aluno')

Route.group(() => {
  Route.post('/', 'ProfessorController.create')
  Route.get('/:id', 'ProfessorController.read')
  Route.put('/:id', 'ProfessorController.update')
  Route.delete('/:id', 'ProfessorController.delete')
}).prefix('/professor')

Route.group(() => {
  Route.post('/', 'SalaController.create')
  Route.get('/:id', 'SalaController.read')
  Route.put('/:id', 'SalaController.update')
  Route.delete('/:id', 'SalaController.delete')
}).prefix('/sala')
