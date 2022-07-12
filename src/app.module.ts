import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { MessageController } from './messages/message.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Mensaje } from './messages/entities/mensaje.entity'
import { MessageService } from './messages/message.service'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'gcristia',
            database: 'message_nestjs',
            entities: [Mensaje],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Mensaje]),
    ],
    controllers: [AppController, MessageController],
    providers: [MessageService],
})
export class AppModule {}
