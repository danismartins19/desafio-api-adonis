import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlunoSalas extends BaseSchema {
  protected tableName = 'aluno_sala'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('aluno_matricula').references('alunos.matricula').onDelete('CASCADE');
      table.integer('sala_numero').references('salas.numero').onDelete('CASCADE');
      table.unique(['aluno_matricula','sala_numero'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
