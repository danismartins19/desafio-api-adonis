import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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

        if(data.disponivel){
            sala.disponivel = data.disponivel
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
}
