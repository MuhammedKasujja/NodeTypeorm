import { Like } from "typeorm"
import { AppDataSource } from "../data-source"
import { User } from "../entity"
import { IQuery, IRepository, Paginate } from "../types"

const userRepository = AppDataSource.getRepository(User)

class UsersRepository implements IRepository<User>{
    async save(firstname: string, lastname: string, age: number) {
        const user = new User()
        user.firstName = firstname
        user.lastName = lastname
        user.age = age
        return await userRepository.save(user)
    }

    async find(id: number) {
        return await userRepository.findOneBy({ id })
    }

    async delete(id: number) {
        const user = await userRepository.findOneBy({ id })
        if (user) {
            return await userRepository.remove(user)
        }
        throw new Error('User not found')
    }

    fetch: () => Promise<User[]> = async () => {
        return await userRepository.find()
    }

    paginate: (query?: IQuery) => Promise<Paginate<User>> = async (query) => {
        const take = query?.take ||  10
        const page = query?.page || 1;
        const skip = (page - 1) * take;
        const keyword = query?.keyword ||'kas'

        const [result, total] = await userRepository.findAndCount(
            {
                where: { firstName: Like('%' + keyword + '%') }, order: { firstName: "DESC" },
                take: take,
                skip: skip
            }
        );

        return {
            data: result,
            count: total,
            take: take,
            page: page
        }
    }

    findAll: (query?: IQuery) => Promise<Paginate<User>> = async (query) => {
        const take =  10
        const page =  1;
        const skip = (page - 1) * take;
        const keyword ='kas'

        const users = await userRepository.find(
            {
                where: { firstName: Like('%' + keyword + '%') }, order: { firstName: "DESC" },
                take: take,
                skip: skip
            }
        );

        return {
            data: users,
            count: take,
            take: take,
            page: page
        }
    }

    findBy: (query: Record<string, any>) => Promise<User[]> = async (query) => {
        return await userRepository.findBy({ firstName: query.firstName })
    }

}

export default new UsersRepository()
