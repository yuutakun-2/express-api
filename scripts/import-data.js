const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();
const data = JSON.parse(fs.readFileSync("backup.json", "utf-8"));

async function importData() {
  // Import users first
  for (const user of data.users) {
    await prisma.user.create({
      data: {
        ...user,
        created: new Date(user.created),
      },
    });
  }

  // Then posts
  for (const post of data.posts) {
    await prisma.post.create({
      data: {
        ...post,
        created: new Date(post.created),
      },
    });
  }

  // Then comments, likes, follows, notifications
  for (const comment of data.comments) {
    await prisma.comment.create({
      data: {
        ...comment,
        created: new Date(comment.created),
      },
    });
  }
  // ... similar for other models
}

importData()
  .then(() => console.log("Data imported"))
  .catch(console.error);
