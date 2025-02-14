const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

async function exportData() {
  const users = await prisma.user.findMany();
  const posts = await prisma.post.findMany();
  const comments = await prisma.comment.findMany();
  const likes = await prisma.like.findMany();
  const follows = await prisma.follow.findMany();
  const notifications = await prisma.notification.findMany();

  const data = {
    users,
    posts,
    comments,
    likes,
    follows,
    notifications,
  };

  fs.writeFileSync("backup.json", JSON.stringify(data, null, 2));
}

exportData()
  .then(() => console.log("Data exported"))
  .catch(console.error);
