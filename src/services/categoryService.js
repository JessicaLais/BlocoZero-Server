import Category from "../entitys/categoryEntity.js";
import * as categoryModel from "../models/categoryModel.js";

export const register = async ({ data }) => {
  const searchCategoryByName = await categoryModel.searchCategoryByName({
    data,
  });
  if (searchCategoryByName) {
    throw new Error("Category already exists");
  }

  const category = new Category(data);

  return categoryModel.register({ data: category });
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

  const category = new Category(data);

  return categoryModel.updateCategory({ id_category: id, data });
};
