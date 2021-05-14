import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/users";
import { UsersRepository } from "../repositories/usersRepository"

interface IsUserService {
    email: string;
}

class UserService {

    private usersRepo: Repository<User>

    constructor() {
        this.usersRepo = getCustomRepository(UsersRepository);
    }

    async create( { email } : IsUserService ){

        const usersExists = await this.usersRepo.findOne({
            email
        })

        if(usersExists){
            return usersExists;
        }

        const user = this.usersRepo.create({
            email
        })

        await this.usersRepo.save(user);

        return user;
    }
}

export {UserService}