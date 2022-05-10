import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno';
import Professor from 'App/Models/Professor';
import { testData } from 'App/Utils/testData';
import { testEmail } from 'App/Utils/testEmail';

export default class AlunosController {
    public async create( {request, response}: HttpContextContract) {
        const data = request.only(["matricula", "nome", "email", "data_nasc"]);

        if(!data.matricula || !data.data_nasc ||!data.email ||!data.nome){ //verifica se tem dados vazios
            return response.status(400).send({
                error: "Preencha os dados corretamente!"
            })
        }
        
        const searchAluno = await Aluno.find(data.matricula); //verifica se ja tem cadastrado
        if(searchAluno){
            return response.status(409).send({
                erro: "Já possui um aluno com essa matrícula!"
            })
        }

        if(!testEmail(data.email)){
            return response.status(400).send({
                erro: "E-mail incorreto"
            })
        }

        if(!testData(data.data_nasc)){
            return response.status(400).send({
                erro: "Data de Nascimento incorreta!"
            })
        }

        const aluno = await Aluno.create(data);
        if(aluno){
            return response.status(201).send(aluno);
        }

        
    }

    public async read( {request, response} : HttpContextContract) {
        const matricula = request.param('matricula');

        const aluno = await Aluno.find(matricula);
        if(aluno){
            return response.status(200).send(aluno)
        } else {
            return response.status(400).send({
                erro: "Aluno não encontrado!"
            })
        }
    }

    public async update( {request, response} : HttpContextContract) {
        const matricula = request.param('matricula');
        const data = request.only(['nome', 'email', 'data_nasc']);

        const aluno = await Aluno.find(matricula);
        if(!aluno){
            return response.status(400).send({
                erro: "Aluno não encontrado!"
            })
        }

        if(data.data_nasc){
            if(testData(data.data_nasc)){
                aluno.data_nasc = data.data_nasc;
            }
        }

        if(data.email){
            if(testEmail(data.email)){
                aluno.email = data.email;
            }
        }

        if(data.nome){
            aluno.nome = data.nome;
        }

        const result = await aluno.save();

        return response.status(200).send(result);


    }

    public async delete( {request, response} : HttpContextContract) {
        const matricula = request.param('matricula');

        const aluno = await Aluno.find(matricula);
        if(aluno){
            await aluno.delete();
            return response.status(200).send({
                mensagem: "Aluno excluído!"
            })
        } else {
            return response.status(400).send({
                erro: "Aluno não encontrado!"
            })
        }
    }

    public async listarSalas ({request, response}:HttpContextContract){
        const { matricula } = request.params();

        const aluno = await Aluno.find(matricula);
        if(!aluno){
            return response.status(400).send({
                erro: "Não foi encontrado um aluno com essa matrícula!"
            })
        }

        let salas = await aluno.related('salas').query().select('numero', 'professor_matricula')
        if(salas.length == 0){
            return response.status(200).send({
                message: "Esse aluno não está em nenhuma sala no momento!"
            })
        }

        let newSalas : any[] = [] ;
        for(let sala of salas){
            let professor = await Professor.find(sala.$attributes.professorMatricula);
                newSalas.push({
                    "numero": sala.$attributes.numero,
                    "professor": professor?.nome
                })
        }
        return newSalas;

    }

}
