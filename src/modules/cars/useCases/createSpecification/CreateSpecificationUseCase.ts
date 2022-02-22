import { ISpecificationRepository } from "../../repositories/ISpecificationRepository"

interface IRequest {
    name: string,
    description: string
}

class CreateSpecificationUseCase{

    constructor(private speficationsRepository: ISpecificationRepository){}

    execute({name,description}: IRequest): void{
        const specificationAlreadyExists = this.speficationsRepository.findByName(name)

        if (specificationAlreadyExists) {
            throw new Error("Specification Already Exists!")
        }

        this.speficationsRepository.create({
            name,
            description
        })
    }
}

export {CreateSpecificationUseCase}