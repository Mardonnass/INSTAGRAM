// src/app/api/comments/delete.ts
import { prisma } from '../../api/auth/[...nextauth]/prisma'; // Ensure the prisma client is set up correctly
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { userId, commentId } = req.body;

    try {
      const comment = await prisma.comment.findUnique({
        where: { id: commentId },
      });

      if (comment?.userId !== userId) {
        return res.status(403).json({ error: 'You can only delete your own comments' });
      }

      await prisma.comment.delete({
        where: { id: commentId },
      });

      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete comment' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
