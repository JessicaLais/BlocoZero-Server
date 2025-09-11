import prisma from "./connectionModel.js"

export const findUserByEmail = async ({email}) =>{
  return await prisma.user.findUnique({
    where:{
      email
    }
  })
  
}


export const createUser = async ({data}) => {
  return await prisma.user.create({
   data: {
    name: data.name,
    email: data.email,
    password: data.password, 
    enterprise_id: data.enterprise_id, 
    position:data.position, 
    phone: data.phone
  }
  });
};


export const allUsers = async () =>{
  return await prisma.user.findMany()
}
