import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common'
import { CreateMessageDto } from './dto/create-message-dto'
import { MessageService } from './message.service'

@Controller('messages')
export class MessageController {
    constructor(private messageService: MessageService) {}

    @Post()
    create(@Body() createMessageDto: CreateMessageDto, @Res() response) {
        this.messageService
            .createMessage(createMessageDto)
            .then((message) => {
                response.status(HttpStatus.CREATED).json(message)
            })
            .catch(() => {
                response.status(HttpStatus.FORBIDDEN).json({ message: 'message creation error !!' })
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
                response.status(HttpStatus.FORBIDDEN).json({ message: 'error in the retention of the messages !!' })
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
                response.status(HttpStatus.FORBIDDEN).json({ message: `error get message with id ID:${idMessage}` })
            })
    }

    @Put(':id')
    update(@Body() updateMessageDto: CreateMessageDto, @Res() response, @Param('id') idMessage: number) {
        this.messageService
            .updateMessage(idMessage, updateMessageDto)
            .then((messageUpdated) => {
                response.status(HttpStatus.OK).json(messageUpdated)
            })
            .catch(() => {
                response.status(HttpStatus.FORBIDDEN).json({ message: 'error updating message' })
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
                response.status(HttpStatus.FORBIDDEN).json({ message: 'error deleting message' })
            })
    }
}
