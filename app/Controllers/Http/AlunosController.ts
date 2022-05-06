import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AlunosController {
    public async create( {request}: HttpContextContract) {
        const data = request.only(["nome"]);
        return data;
    }

    public async read( ctx : HttpContextContract) {
        return 'Hello World'
    }

    public async update( ctx : HttpContextContract) {
        return 'Hello World'
    }

    public async delete( ctx : HttpContextContract) {
        return 'Hello World'
    }
}
