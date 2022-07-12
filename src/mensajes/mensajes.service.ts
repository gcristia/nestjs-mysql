import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Mensaje } from './entities/mensaje.entity'
import { Repository } from 'typeorm'
import { CreateMensajeDto } from './dto/create-mensaje-dto'

@Injectable()
export class MensajesService {
    constructor(
        @InjectRepository(Mensaje)
        private mensajeRepository: Repository<Mensaje>
    ) {}

    async findAll(): Promise<Mensaje[]> {
        return await this.mensajeRepository.find()
    }

    async findOne(id: number): Promise<Mensaje> {
        return await this.mensajeRepository.findOneBy({ id })
    }

    async createMessage(mensajeNuevo: CreateMensajeDto): Promise<Mensaje> {
        const mensaje = new Mensaje()
        mensaje.nick = mensajeNuevo.nick
        mensaje.mensaje = mensajeNuevo.mensaje
        return await this.mensajeRepository.save(mensaje)
    }

    async updateMessage(idMessage: number, messageUpdate: CreateMensajeDto): Promise<Mensaje> {
        const message = await this.findOne(idMessage)
        message.nick = messageUpdate.nick
        message.mensaje = messageUpdate.mensaje

        return await this.mensajeRepository.save(message)
    }

    async removeMessage(id: number): Promise<void> {
        await this.mensajeRepository.delete(id)
    }
}
