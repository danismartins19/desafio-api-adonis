import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Professores extends BaseSchema {
  protected tableName = 'professores'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.increments('id')
      table.string('nome').notNullable()
      table.string('email').notNullable()
      table.string('matricula').primary().notNullable()
      table.date('data_nasc').notNullable()
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
