import { PrismaClient, Prisma } from '@prisma/client';
import { createError } from '@/lib/errors';


const prisma = new PrismaClient();

export type ActionError = {
  message: string;
  statusCode?: number;
};

export type SelectUser = Prisma.UserSelect;

// Create a new user
export const createUser = async (email: string, password: string, isAdmin: boolean = false) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        isAdmin,
      },
    });
    return newUser;
  } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw createError('network', `Error creating user: ${error.message}`, 400, );
      }
      throw createError('network', `Error creating user: ${error.message}`, 500, error.meta?.cause || 'Unknown error');
    }
};

// Get a user by email
export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw createError('validation', `User not found with email: ${email}`, 404, 'The user with the provided email does not exist.');
    }
    return user;
  } catch (error: any) {
    throw createError('network', `Error fetching user: ${error.message}`, 500, error.meta?.cause || 'Unknown error');
  }
};

// Update a user's password
export const updateUserPassword = async (email: string, newPassword: string) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { password: newPassword },
    });
    return updatedUser;
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw {
        message: `Error updating user password: ${error.message}`,
        statusCode: 400,
      } as ActionError;
    }
    throw {
      message: `Error updating user password: ${error.message}`,
      statusCode: 500,
    } as ActionError;
  }
};

// Delete a user by email
export const deleteUser = async (email: string) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { email },
    });
    return deletedUser;
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw {
        message: `Error deleting user: ${error.message}`,
        statusCode: 400,
      } as ActionError;
    }
    throw {
      message: `Error deleting user: ${error.message}`,
      statusCode: 500,
    } as ActionError;
  }
};
