// src/app/api/comments/[postId].ts
import { prisma } from '../../api/auth/[...nextauth]/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.query;

  if (req.method === 'GET') {
    try {
      const comments = await prisma.comment.findMany({
        where: { postId: String(postId) },
        include: {
          user: true, // Include user details in response
          likes: true, // Include likes on each comment
          replies: true, // Include replies if any
        },
      });

      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch comments' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
