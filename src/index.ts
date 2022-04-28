import express from 'express';
const app = express();
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
app.use(express.json());

app.get(`/`, async (_req, res) => {
    const users = await prisma.user.findMany()

    res.json({ users });
});

app.post(`/`, async (req, res) => {
    const { name, email } = req.body;

    const user = await prisma.user.create({
        data: {
            name, 
            email
        }
    });

    res.json({ user });
});

app.post(`/post`, async (req, res) => {
    const { authorId, title, content } = req.body;

    const post = await prisma.post.create({
        data: {
            authorId,
            title, 
            content
        }
    });

    res.json({ post });
});

app.get(`/post`, async (_req, res) => {
    const posts = await prisma.post.findMany({
        include: {
            author: {
                select: {
                    id: true,
                    email: true
                }
            }
        },
        where: {
            authorId: {
                gt: 3
            }
        }
    });

    res.json({ posts });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
