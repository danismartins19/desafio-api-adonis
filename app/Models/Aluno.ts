import {
  BaseModel,
  column,
  ManyToMany,
  manyToMany
} from '@ioc:Adonis/Lucid/Orm'
import Sala from './Sala'

export default class Aluno extends BaseModel {
  @column({ isPrimary: true })
  public matricula: number

  @column()
  public nome: string

  @column()
  public email: string

  @column()
  public data_nasc: string

  @manyToMany(() => Sala,{
    localKey: 'matricula',
    pivotForeignKey: 'aluno_matricula',
    relatedKey: 'numero',
    pivotRelatedForeignKey: 'sala_numero',
    pivotTable: 'aluno_sala'
  })
  public salas: ManyToMany<typeof Sala>

}
