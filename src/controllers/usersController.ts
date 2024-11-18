import { Request, Response } from "express";
import { User } from "../models/User";
import asyncHandler from 'express-async-handler';

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(await User.getAll());
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.getById(parseInt(req.params.userId));
  res.status(200).json(user);
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email }: { name: string; email: string } = req.body;
  res.status(201).json(await User.create({ name: name.trim(), email: email.trim() }));
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email }: { name: string; email: string } = req.body;
  const id = parseInt(req.params.userId);
  res.status(200).json(await User.update({ id, name: name.trim(), email: email.trim() }));
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  await User.deleteById(parseInt(req.params.userId));
  res.status(204).send();
});