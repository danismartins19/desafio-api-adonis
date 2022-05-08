import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professor from 'App/Models/Professor';
import { testData } from 'App/Utils/testData';
import { testEmail } from 'App/Utils/testEmail';

export default class ProfessorsController {
    public async create( {request, response} : HttpContextContract) {

        const data = request.only(["matricula", "nome", "email", "data_nasc"]);

        if(!data.matricula || !data.data_nasc ||!data.email ||!data.nome){ //verifica se tem dados vazios
            return response.status(400).send({
                error: "Preencha os dados corretamente!"
            })
        }
        
        const searchProfessor = await Professor.find(data.matricula); //verifica se ja tem cadastrado

        if(searchProfessor){
            return response.status(409).send({
                erro: "Já possui um professor com essa matrícula!"
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

        const professor = await Professor.create(data);
        if(professor){
            response.status(201).send(professor);
        }
    }

    public async read( {request, response} : HttpContextContract) {
        const matricula = request.param('matricula');

        const professor = await Professor.find(matricula);
        if(professor){
            return response.status(200).send(professor)
        } else {
            return response.status(400).send({
                erro: "Professor não encontrado!"
            })
        }
    }

    public async update( {request, response} : HttpContextContract) {
        const matricula = request.param('matricula');
        const data = request.only(['nome', 'email', 'data_nasc']);

        const professor = await Professor.find(matricula);
        if(!professor){
            return response.status(400).send({
                erro: "Professor não encontrado!"
            })
        }

        if(data.data_nasc){
            if(testData(data.data_nasc)){
                professor.data_nasc = data.data_nasc;
            }
        }

        if(data.email){
            if(testEmail(data.email)){
                professor.email = data.email;
            }
        }

        if(data.nome){
            professor.nome = data.nome;
        }

        const result = await professor.save();

        return response.status(200).send(result);
    }

    public async delete( {request, response} : HttpContextContract) {
        const matricula = request.param('matricula');

        const professor = await Professor.find(matricula);
        if(professor){
            await professor.delete();
            return response.status(200).send({
                mensagem: "Professor excluído!"
            })
        } else {
            return response.status(400).send({
                erro: "Professor não encontrado!"
            })
        }
    }
}
