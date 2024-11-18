import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import { Post } from "../models/Post";

export const getPosts = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(await Post.getAll());
});

export const getPost = asyncHandler(async (req: Request, res: Response) => {
  const post = await Post.getById(parseInt(req.params.id));
  res.status(200).json(post);
});

export const createPost = asyncHandler(async (req: Request, res: Response) => {
  const { title, content, user_id }: { title: string; content: string; user_id: number } = req.body;
  res.status(201).json(await Post.create({ title: title.trim(), content: content.trim(), user_id }));
});

export const updatePost = asyncHandler(async (req: Request, res: Response) => {
  const { title, content, user_id }: { title: string; content: string; user_id: number } = req.body;
  const id = parseInt(req.params.id);
  res.status(200).json(await Post.update({ id, title: title.trim(), content: content.trim(), user_id }));
});

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  await Post.deleteById(parseInt(req.params.id));
  res.status(204).send();
});
