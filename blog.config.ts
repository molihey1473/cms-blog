export const config = {
  defaultMeta: { title: "MoliHey", description: "MoliHeyのblog" },
  siteRoot:
    process.env.NODE_ENV === "production"
      ? "https://blog-sage-nine.vercel.app/"
      : "http://localhost:3000",
};
