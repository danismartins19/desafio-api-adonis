import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Salas extends BaseSchema {
  protected tableName = 'salas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.increments('id')
      table.integer('numero').notNullable().unsigned().unique().primary()
      table.integer('capacidade').notNullable().unsigned()
      table.boolean('disponivel').defaultTo(true)
      table.string('professor_matricula').notNullable().references('professores.matricula')

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
