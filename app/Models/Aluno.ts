import {
  BaseModel,
  column
} from '@ioc:Adonis/Lucid/Orm'

export default class Aluno extends BaseModel {
  @column({ isPrimary: true })
  public matricula: number

  @column()
  public nome: string

  @column()
  public email: string

  @column()
  public data_nasc: string

}
