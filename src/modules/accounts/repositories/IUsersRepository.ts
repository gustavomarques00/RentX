import { ICreateUserDTO } from "../dtos/ICreateUSerDTO";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>
}

export {IUsersRepository}