
/*
async function main() {
  // ... we write our Prisma Client queries here


  
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })

  console.dir(allUsers, { depth: null });
  const post = await prisma.post.update({
    where: { id: 2 },
    data: { published: true, title: 'This title has been changed'},
  });
  console.log(post);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

  
*/

