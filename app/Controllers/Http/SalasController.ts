import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno';
import Professor from 'App/Models/Professor';
import Sala from 'App/Models/Sala';

export default class SalasController {
    public async create( {request, response}: HttpContextContract) {
        const data = request.only(['numero', 'capacidade', 'disponivel', 'professor']);

        if(!data.numero || !data.capacidade || !data.professor){
            return response.status(400).send({
                erro: "Preencha todos os dados corretamente!"
            })
        }

        const searchSala = await Sala.find(data.numero);
        if(searchSala){
            return response.status(400).send({
                erro: "Já existe uma sala com esse número!"
            })
        }

        const professor = await Professor.find(data.professor);
        if(!professor){
            return response.status(400).send({
                erro: "Não foi encontrado um professor com essa matricula!"
            })
        }

        const sala = await Sala.create({
            numero : data.numero,
            capacidade: data.capacidade,
            disponivel: data.disponivel,
            professorMatricula: data.professor 
        });
        if(sala){
            return response.status(201).send(sala)
        }


    }

    public async read( {request, response} : HttpContextContract) {
        const numero = request.param('num');

        const sala = await Sala.find(numero);
        if(sala){
            return response.status(200).send(sala);
        } else {
            return response.status(400).send({
                erro: "Nao foi localizada uma sala com esse numero"
            })
        }
    }

    public async update( {request, response} : HttpContextContract) {
        const data = request.only(['capacidade', 'disponivel']);
        const numero = request.param('num');

        const sala = await Sala.find(numero);
        if(!sala){
            return response.status(400).send({
                erro: "Não foi localizada nenhuma sala com esse número!"
            })
        }

        if(data.capacidade){
            sala.capacidade = data.capacidade
        }

        if(data.disponivel === true || data.disponivel === 1){
            sala.disponivel = true
        } else if (data.disponivel === false || data.disponivel === 0){
            sala.disponivel = false
        } else {
            console.log('')
        }

        const result = await sala.save()
        return response.status(200).send(result);
        
    }

    public async delete( {request, response} : HttpContextContract) {
        const numero = request.param('num');

        const sala = await Sala.find(numero);
        if(!sala){
            return response.status(400).send({
                erro: "Não foi localizada nenhuma sala com esse número"
            })
        }
        await sala.delete()
        return response.status(200).send({
            mensagem: "Sala excluída com sucesso!"
        })
        
    }


    public async addAluno({request,response}: HttpContextContract){
        const { num , matricula} = request.params();
        const data = request.only(['professor'])

        const professorInstance = await Professor.find(data.professor);
        if(!professorInstance){
            return response.status(400).send({
                erro: "Não existe um professor com essa matrícula"
            })
        }

        const sala = await Sala.find(num);

        if(!sala){
            return response.status(400).send({
                erro: "Não existe uma sala com esse número"
            })
        }

        if(!sala.disponivel){
            return response.send({
                message: "Esta sala não está disponivel no momento!"
            })
        }

        const aluno = await Aluno.find(matricula);
        if(!aluno){
            return response.status(400).send({
                erro: "Não existe um aluno com essa matrícula"
            })
        }

        if(sala.professorMatricula !== professorInstance.matricula){
            return response.status(400).send({
                erro: "Esse professor não pode adicionar um aluno a esta sala"
            })
        }

        const salaLenght = await sala.related('alunos').query();
        if(salaLenght.length >= sala.capacidade){
            return { message: "A sala está cheia!"}
        }

        try{
          await sala.related('alunos').attach([aluno.matricula]);
          const alunoAdded = await sala.related('alunos').query().where('matricula', aluno.matricula)
          return alunoAdded;
        } 
        catch(err) {
            return response.status(400).send({
                erro: "Não foi possivel vincular o aluno a essa sala"
            })
        }
    }

    public async delAluno({request, response}: HttpContextContract){
       const {num , matricula} = request.params();

       const sala = await Sala.find(num);
       if(!sala){
           return response.status(400).send({
               erro: "Não foi encontrada nenhuma sala com esse número"
           })
       }

       const aluno = await Aluno.find(matricula);
       if(!aluno){
           return response.status(400).send({
               erro: "Não foi encontrado nenhum aluno com essa matrícula"
           })
       }

       try{
            await sala.related('alunos').detach([aluno.matricula]);
            return response.status(200).send({
                message: "Aluno removido da sala"
            })
       } catch (err){
            return response.status(400).send({
                erro: "Algo deu errado!"
            })
       }
       
        // 
    }

    public async verAlunos({request, response}: HttpContextContract){
        const {num} = request.params();

        const sala = await Sala.find(num);
        if(!sala){
            return response.status(400).send({
                erro: "Não foi encontrada nenhuma sala com esse número"
            })
        }

        const alunosSala = await sala.related('alunos').query();
        if(alunosSala.length == 0){
            return response.status(200).send({
                message: "Essa sala não possui alunos!"
            })
        } else {
            return response.status(200).send(alunosSala)
        }


    }
}
