import prisma from "./connectionModel.js"

export const findUserByEmail = async ({email}) =>{
  return await prisma.user.findUnique({
    where:{
      email
    }
  })
  
}


export const createUser = async ({name, email, password, enterprise_id, position, phone}) => {
  return await prisma.user.create({
   data: {name, email, password, enterprise_id, position, phone}
  });
};


export const allUsers = async () =>{
  return await prisma.user.findMany()
}
