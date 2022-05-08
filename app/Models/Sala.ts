import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Aluno from './Aluno';
import Professor from './Professor';

export default class Sala extends BaseModel {
  @column({ isPrimary: true })
  public numero: number

  @column()
  public capacidade: number

  @column()
  public disponivel: boolean

  @column()
  public professorMatricula: number

  @belongsTo(() => Professor)
  public professor: BelongsTo<typeof Professor>

  @manyToMany(() => Aluno, {
    localKey: 'numero',
    pivotForeignKey: 'sala_numero',
    relatedKey: 'matricula',
    pivotRelatedForeignKey: 'aluno_matricula',
    pivotTable: 'aluno_sala'
  })
  public aluno: ManyToMany<typeof Aluno>
}
