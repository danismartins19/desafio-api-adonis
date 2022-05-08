import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno';
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
            aluno.delete();
            return response.status(200).send({
                mensagem: "Aluno excluído!"
            })
        } else {
            return response.status(400).send({
                erro: "Aluno não encontrado!"
            })
        }
    }
}
