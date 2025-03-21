// src/app/api/comments/create.ts
import { prisma } from '../../api/auth/[...nextauth]/prisma'; // Ensure the prisma client is set up correctly
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, postId, content } = req.body;

    try {
      const newComment = await prisma.comment.create({
        data: {
          content,
          userId,
          postId,
        },
      });

      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create comment' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
