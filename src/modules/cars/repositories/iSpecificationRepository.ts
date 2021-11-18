import { Specification } from "../entities/Specification";

interface iCreateSpecificationRequestDTO {
  name: string;
  description: string;
}

interface iSpecificationRepository {
  create({ name, description }: iCreateSpecificationRequestDTO): Promise<void>;
  list(): Promise<Specification[]>;
  findByName(name:string):Promise<Specification>
}

export { iSpecificationRepository, iCreateSpecificationRequestDTO };
