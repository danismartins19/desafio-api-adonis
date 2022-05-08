import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Professor from './Professor'

export default class Sala extends BaseModel {
  @column({ isPrimary: true })
  public numero: number

  @column()
  public capacidade: number

  @column()
  public disponivel: boolean

  @hasOne(() => Professor)
  public professor_matricula: HasOne<typeof Professor>

}
