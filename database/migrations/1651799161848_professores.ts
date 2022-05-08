import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Professores extends BaseSchema {
  protected tableName = 'professors'

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
