import { getRepository, Repository } from "typeorm";

import Specification from "../../entities/Specification";
import {
  ICreatepecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationRepository";

class SpecificationRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreatepecificationDTO): Promise<void> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ where: { name } });

    if (!specification) {
      throw new Error("Specification not found.");
    }

    return specification;
  }
}

export default SpecificationRepository;
