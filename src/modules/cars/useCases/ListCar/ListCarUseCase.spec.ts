import { CarRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarRepositoryInMemory";
import { ListCarUseCase } from "./ListCarUseCase";

let listCarUseCase: ListCarUseCase;
let carsRepository: CarRepositoryInMemory;

describe("List cars", () => {
  beforeEach(async () => {
    carsRepository = new CarRepositoryInMemory();
    listCarUseCase = new ListCarUseCase(carsRepository);
  });

  it("Shoud be able to list all available cars", async () => {
    const car = await carsRepository.create({
      name: "Car",
      description: "descriptionCar",
      license_plate: "license_plateCar",
      fine_amount: 100,
      daily_rate: 60,
      brand: "brandCar",
      category_id: "category",
    });

    const cars = await listCarUseCase.execute({
      brand: "",
      name: "",
      category_id: "",
    });

    expect(cars).toEqual([car]);
  });

  it("Shoud be able to list all available cars with category_id", async () => {
    await carsRepository.create({
      name: "Car",
      description: "descriptionCar",
      license_plate: "license_plateCar",
      fine_amount: 100,
      daily_rate: 60,
      brand: "brandCar",
      category_id: "category",
    });

    await carsRepository.create({
      name: "Car2",
      description: "descriptionCar",
      license_plate: "license_plateCar",
      fine_amount: 100,
      daily_rate: 60,
      brand: "brandCar",
      category_id: "category2",
    });

    await carsRepository.create({
      name: "Car3",
      description: "descriptionCar",
      license_plate: "license_plateCar",
      fine_amount: 100,
      daily_rate: 60,
      brand: "brandCar",
      category_id: "category2",
    });

    const cars = await listCarUseCase.execute({
      brand: "",
      name: "",
      category_id: "category2",
    });

    console.log(cars)

  });
});
