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

        const emailIsValid = testEmail(data.email); //verifica se email está correto
        if(!emailIsValid){
            return response.status(400).send({
                erro: "E-mail incorreto"
            })
        }

        const dataIsValid = testData(data.data_nasc);
        if(!dataIsValid){
            return response.status(400).send({
                erro: "Data de Nascimento incorreta!"
            })
        }



        
    }

    public async read( {request} : HttpContextContract) {
        
    }

    public async update( {request} : HttpContextContract) {
        
    }

    public async delete( {request} : HttpContextContract) {
       
    }
}
