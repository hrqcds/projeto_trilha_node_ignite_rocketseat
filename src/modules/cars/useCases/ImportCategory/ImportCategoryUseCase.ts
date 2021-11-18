import { inject, injectable } from "tsyringe";
import { iCategoryRepository } from "../../repositories/iCategoryRepository";
import fs from "fs";
import { parse } from "csv-parse";

interface iRequest {
  file: Express.Multer.File;
}

interface iFileCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private repository: iCategoryRepository
  ) {}

  loadingCSV({ file }: iRequest): Promise<iFileCategory[]> {
    return new Promise((resolve, reject) => {
      const fileCategories: iFileCategory[] = [];

      const stream = fs.createReadStream(file.path);

      const csv = parse();

      stream.pipe(csv);

      csv.on("data", async (item) => {
        const [name, description] = item;

        const FileCategory = { name, description } as iFileCategory;

        fileCategories.push(FileCategory);
      });

      csv.on("end", () => {
        resolve(fileCategories);
      });

      csv.on("error", (err) => {
        reject(err);
      });
    });
  }

  async service({ file }: iRequest): Promise<void> {
    const fileCategory = await this.loadingCSV({ file });

    fileCategory.map(async ({ name, description }) => {
      const category = await this.repository.findByName(name);

      if (!category) {
        await this.repository.create({ name, description });
      }
    });
    
    fs.unlink(file.path, (err) => {});
  }
}

export { ImportCategoryUseCase };
