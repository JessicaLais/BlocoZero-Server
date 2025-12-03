import Category from "../entitys/categoryEntity.js";
import * as categoryModel from "../models/categoryModel.js";
import { getById } from "../models/typeModel.js";
import { getWorkById } from "./workServices.js";
import { listAllTypesByWorkId } from "./typeService.js";

export const register = async ({ data }) => {
  const searchCategoryByName = await categoryModel.searchCategoryByName({
    data,
  });
  if (searchCategoryByName) {
    throw new Error("Category already exists");
  }
  const searchTypeById = await getById({ id: data.id_type });

  if (!searchTypeById) {
    throw new Error("Type not found");
  }

  const category = new Category(data);

  return categoryModel.register({ data: category });
};

export const listAllCategoryByIdType = async ({ id }) => {
  id = Number(id);
  const searchTypeById = await getById({ id });

  if (!searchTypeById) {
    throw new Error("Type not found");
  }

  const getAllCategoriesByTypeId = await categoryModel.searchCategoryByTypeId({
    id,
  });

  return getAllCategoriesByTypeId.map((category) => new Category(category));
};

export const listAllCategoryByWorkId = async ({ id }) => {
  id = Number(id);

  const searchWorkById = await getWorkById({ id });
  const types = await listAllTypesByWorkId({ id });

  const categories = await Promise.all(
    types.map(async (type) => {
      const result = await categoryModel.searchCategoryByTypeId({
        id: type.id,
      });

      // Caso a query retorne lista
      if (Array.isArray(result)) {
        return result.map((c) => new Category(c));
      }

      // Caso retorne item único
      return new Category(result);
    })
  );

  // Se quiser um array "flat" (sem arrays dentro de arrays)
  return categories.flat();
};

export const getCaterogyById = async ({ id }) => {
  const searchCategoryById = await categoryModel.searchCategoryById({
    id_category: id,
  });

  if (!searchCategoryById) throw new Error("Category not found");

  return new Category(searchCategoryById);
};

export const listAllCategory = async () => {
  const allCategory = await categoryModel.listAllCategory();
  return allCategory.map((item) => new Category(item));
};

export const updateCategory = async ({ id, data }) => {
  id = Number(id);
  const searchCategoryById = await categoryModel.searchCategoryById({
    id_category: id,
  });
  if (!searchCategoryById) {
    throw new Error("Category not found");
  }

  const searchTypeById = await getById({ id: data.id_type });

  if (!searchTypeById) {
    throw new Error("Type not found");
  }

  const category = new Category(data);

  return categoryModel.updateCategory({ id_category: id, data });
};

export const deleteCategoryById = async ({ id }) => {
  id = Number(id);
  const searchCategoryById = await categoryModel.searchCategoryById({
    id_category: id,
  });
  if (!searchCategoryById) {
    throw new Error("Category not found");
  }

  return await categoryModel.deleteCategoryById({ id });
};
