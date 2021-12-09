import { RentalRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalRepositoryInMemory;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory);
  });

  it("Should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "123456",
      car_id: "121212",
      expected_return_date: new Date(),
    });

    console.log(rental);

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should be not able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      rentalRepositoryInMemory.create({
        user_id: "123456",
        car_id: "123212",
        expected_return_date: new Date(),
      });

      const rental = await createRentalUseCase.execute({
        user_id: "123456",
        car_id: "121212",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be not able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      rentalRepositoryInMemory.create({
        user_id: "124456",
        car_id: "121212",
        expected_return_date: new Date(),
      });

      const rental = await createRentalUseCase.execute({
        user_id: "123456",
        car_id: "121212",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
