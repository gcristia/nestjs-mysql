import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common'
import { CreateMensajeDto } from './dto/create-mensaje-dto'
import { MensajesService } from './mensajes.service'

@Controller('mensajes')
export class MensajesController {
    constructor(private messageService: MensajesService) {}

    @Post()
    create(@Body() createMessageDto: CreateMensajeDto, @Res() response) {
        this.messageService
            .createMessage(createMessageDto)
            .then((message) => {
                response.status(HttpStatus.CREATED).json(message)
            })
            .catch(() => {
                response.status(HttpStatus.FORBIDDEN).json({ message: 'error en la creación del mensaje' })
            })
    }

    @Get()
    getAll(@Res() response) {
        this.messageService
            .findAll()
            .then((messageList) => {
                response.status(HttpStatus.OK).json(messageList)
            })
            .catch(() => {
                response.status(HttpStatus.FORBIDDEN).json({ message: 'error en la ontención de los mensajes' })
            })
    }

    @Get(':id')
    getById(@Res() response, @Param('id') idMessage: number) {
        this.messageService
            .findOne(idMessage)
            .then((message) => {
                response.status(HttpStatus.OK).json(message)
            })
            .catch(() => {
                response.status(HttpStatus.FORBIDDEN).json({ message: `error obtener el mensaje con ID:${idMessage}` })
            })
    }

    @Put(':id')
    update(@Body() updateMessageDto: CreateMensajeDto, @Res() response, @Param('id') idMessage: number) {
        this.messageService
            .updateMessage(idMessage, updateMessageDto)
            .then((messageUpdated) => {
                response.status(HttpStatus.OK).json(messageUpdated)
            })
            .catch(() => {
                response.status(HttpStatus.FORBIDDEN).json({ message: 'error al actualizar el mensaje' })
            })
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idMessage: number) {
        this.messageService
            .removeMessage(idMessage)
            .then(() => {
                response.status(HttpStatus.OK).json()
            })
            .catch(() => {
                response.status(HttpStatus.FORBIDDEN).json({ message: 'error al eliminar el mensaje' })
            })
    }
}
