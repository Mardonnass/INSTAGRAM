// npm install --save-dev tsx
// npx tsx prisma/seedData/dbInject.ts

import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const seedData = JSON.parse(fs.readFileSync('prisma/seedData/seed-data.json', 'utf8'));
  const users = seedData.users || [];
  const follows = seedData.follows || [];
  const likes = seedData.likes || [];
  const commentLikes = seedData.commentLikes || [];
  const bookmarks = seedData.bookmarks || [];

  console.log(`Starting database seed with ${users.length} users...`);

  try {
    // Create users
    for (const item of users) {
      console.log(`Creating user: ${item.name}`);
      try {
        await prisma.user.upsert({
          where: { id: item.id },
          update: {
            name: item.name,
            email: item.email,
            emailVerified: item.emailVerified ? new Date(item.emailVerified) : null,
            image: item.image,
            updatedAt: new Date(item.updatedAt)
          },
          create: {
            id: item.id,
            name: item.name,
            email: item.email,
            emailVerified: item.emailVerified ? new Date(item.emailVerified) : null,
            image: item.image,
            createdAt: new Date(item.createdAt || new Date()),
            updatedAt: new Date(item.updatedAt)
          }
        });
      } catch (error: unknown) {
        if ((error as any).code === 'P2002') {
          console.warn(`User ${item.id} already exists. Skipping.`);
        } else {
          console.error(`Error creating user ${item.id}:`, error);
        }
      }

      // Create profile
      if (item.profile) {
        console.log(`Creating profile for: ${item.name}`);
        try {
          await prisma.profile.upsert({
            where: { userId: item.id },
            update: {
              bio: item.profile.bio,
              avatarUrl: item.profile.avatarUrl,
              location: item.profile.location,
              interests: item.profile.interests || [],
              updatedAt: new Date(item.profile.updatedAt)
            },
            create: {
              userId: item.id,
              bio: item.profile.bio,
              avatarUrl: item.profile.avatarUrl,
              location: item.profile.location,
              interests: item.profile.interests || [],
              createdAt: new Date(item.profile.createdAt || new Date()),
              updatedAt: new Date(item.profile.updatedAt)
            }
          });
        } catch (error: unknown) {
          if ((error as any).code === 'P2002') {
            console.warn(`Profile for user ${item.id} already exists. Skipping.`);
          } else {
            console.error(`Error creating profile for user ${item.id}:`, error);
          }
        }
      }

      // Create posts
      if (item.posts && item.posts.length > 0) {
        for (const post of item.posts) {
          try {
            await prisma.post.upsert({
              where: { id: post.id },
              update: {
                imageUrl: post.imageUrl,
                caption: post.caption,
                tags: post.tags || [],
                updatedAt: new Date(post.updatedAt)
              },
              create: {
                id: post.id,
                userId: item.id,
                imageUrl: post.imageUrl,
                caption: post.caption,
                tags: post.tags || [],
                createdAt: new Date(post.createdAt || new Date()),
                updatedAt: new Date(post.updatedAt)
              }
            });
          } catch (error: unknown) {
            if ((error as any).code === 'P2002') {
              console.warn(`Post ${post.id} already exists. Skipping.`);
            } else {
              console.error(`Error creating post ${post.id}:`, error);
            }
          }
        }
      }
    }

    // Create follows
    for (const follow of follows) {
      try {
        await prisma.follow.upsert({
          where: {
            followerId_followingId: {
              followerId: follow.followerId,
              followingId: follow.followingId
            }
          },
          update: {},
          create: {
            id: follow.id,
            followerId: follow.followerId,
            followingId: follow.followingId,
            createdAt: new Date(follow.createdAt || new Date())
          }
        });
      } catch (error: unknown) {
        if ((error as any).code === 'P2002') {
          console.warn(`Follow relationship ${follow.id} already exists. Skipping.`);
        } else {
          console.error(`Error creating follow ${follow.id}:`, error);
        }
      }
    }

    // Create likes
    for (const like of likes) {
      try {
        await prisma.like.upsert({
          where: {
            userId_postId: {
              userId: like.userId,
              postId: like.postId
            }
          },
          update: {},
          create: {
            id: like.id,
            userId: like.userId,
            postId: like.postId,
            createdAt: new Date(like.createdAt || new Date())
          }
        });
      } catch (error: unknown) {
        if ((error as any).code === 'P2002') {
          console.warn(`Like ${like.id} already exists. Skipping.`);
        } else {
          console.error(`Error creating like ${like.id}:`, error);
        }
      }
    }

    // Create comment likes
    for (const commentLike of commentLikes) {
      try {
        await prisma.commentLike.upsert({
          where: {
            userId_commentId: {
              userId: commentLike.userId,
              commentId: commentLike.commentId
            }
          },
          update: {},
          create: {
            id: commentLike.id,
            userId: commentLike.userId,
            commentId: commentLike.commentId,
            createdAt: new Date(commentLike.createdAt || new Date())
          }
        });
      } catch (error: unknown) {
        if ((error as any).code === 'P2002') {
          console.warn(`Comment like ${commentLike.id} already exists. Skipping.`);
        } else {
          console.error(`Error creating comment like ${commentLike.id}:`, error);
        }
      }
    }

    // Create bookmarks
    for (const bookmark of bookmarks) {
      try {
        await prisma.bookmark.upsert({
          where: {
            userId_postId: {
              userId: bookmark.userId,
              postId: bookmark.postId
            }
          },
          update: {},
          create: {
            id: bookmark.id,
            userId: bookmark.userId,
            postId: bookmark.postId,
            createdAt: new Date(bookmark.createdAt || new Date())
          }
        });
      } catch (error: unknown) {
        if ((error as any).code === 'P2002') {
          console.warn(`Bookmark ${bookmark.id} already exists. Skipping.`);
        } else {
          console.error(`Error creating bookmark ${bookmark.id}:`, error);
        }
      }
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
