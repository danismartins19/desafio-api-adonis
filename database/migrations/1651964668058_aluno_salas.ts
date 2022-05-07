import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlunoSalas extends BaseSchema {
  protected tableName = 'aluno_salas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('aluno_matricula').references('alunos.matricula')
      table.string('sala_numero').references('salas.numero')
      table.unique(['aluno_matricula','sala_numero'])
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
