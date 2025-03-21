// src/app/api/comments/like.ts
import { prisma } from '../../api/auth/[...nextauth]/prisma'; // Ensure the prisma client is set up correctly
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, commentId } = req.body;

    try {
      const existingLike = await prisma.commentLike.findFirst({
        where: { userId, commentId },
      });

      if (existingLike) {
        // Unlike the comment
        await prisma.commentLike.delete({
          where: { id: existingLike.id },
        });
        res.status(200).json({ message: 'Comment unliked' });
      } else {
        // Like the comment
        await prisma.commentLike.create({
          data: {
            userId,
            commentId,
          },
        });
        res.status(200).json({ message: 'Comment liked' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Unable to toggle comment like' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
