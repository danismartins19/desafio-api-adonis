import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Alunos extends BaseSchema {
  protected tableName = 'alunos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.integer('matricula').primary().unique().notNullable().unsigned()
      table.string('nome').notNullable()
      table.string('email').notNullable()
      table.string('data_nasc').notNullable()

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
