import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/message";
import { MessagesRepository } from "../repositories/messagesRepository";

interface IMessageCreate {
    admin_id?: string;
    text: string;
    user_id: string;
}

class MessagesService {
    private messageRepo: Repository<Message>

    constructor() {
        this.messageRepo = getCustomRepository(MessagesRepository);
    }

    async create( {admin_id, text, user_id } : IMessageCreate ) {

        const message = this.messageRepo.create({
            admin_id,
            text,
            user_id
        })

        await this.messageRepo.save(message);

        return message;
    }

    async listByUser(user_id: string){

        const list = await this.messageRepo.find({
            where: {user_id},
            relations: ["user"]
        })

        return list;
    }
}

export {MessagesService}