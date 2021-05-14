import {getCustomRepository, Repository} from 'typeorm';
import { Settings } from '../entities/settings';
import {SettingsRepository} from '../repositories/settingsRepository';

interface IsSettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService {
    private settingsRepo: Repository<Settings>

    constructor() {
        this.settingsRepo = getCustomRepository(SettingsRepository);
    }

    async create( { chat, username } : IsSettingsCreate ){

        const userAlreadyExists  = await this.settingsRepo.findOne({
            username
        });

        if(userAlreadyExists){
            throw new Error("Usuário existe.");
        }

        const settings = this.settingsRepo.create({
            chat,
            username
        })

        await this.settingsRepo.save(settings)

        return settings;
    }
}

export {SettingsService}