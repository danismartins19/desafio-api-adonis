import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SalasController {
    public async create( ctx : HttpContextContract) {
        return 'Hello World'
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