import { RentalRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import dayjs from "dayjs";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalRepositoryInMemory;
let dateProvider: DayJsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dateProvider
    );
  });

  it("Should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "123456",
      car_id: "121212",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should be not able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      rentalRepositoryInMemory.create({
        user_id: "123456",
        car_id: "123212",
        expected_return_date: dayAdd24Hours,
      });

      const rental = await createRentalUseCase.execute({
        user_id: "123456",
        car_id: "121212",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be not able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      rentalRepositoryInMemory.create({
        user_id: "124456",
        car_id: "121212",
        expected_return_date: dayAdd24Hours,
      });

      const rental = await createRentalUseCase.execute({
        user_id: "123456",
        car_id: "121212",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be not able to create a new rental if there is expected_return_date less then 24 hours ", async () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        user_id: "123456",
        car_id: "121212",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
