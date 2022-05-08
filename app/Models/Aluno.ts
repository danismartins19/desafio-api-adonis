import Sala from './Sala';
import {
  BaseModel,
  column, 
  manyToMany,
  ManyToMany
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


  @manyToMany(() => Sala, {
    localKey: 'matricula',
    pivotForeignKey: 'aluno_matricula',
    relatedKey: 'numero',
    pivotRelatedForeignKey: 'sala_numero',
    pivotTable: 'aluno_sala'
  })
  public salas: ManyToMany<typeof Sala>
}
