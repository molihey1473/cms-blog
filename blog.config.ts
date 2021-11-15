export const config = {
  defaultMeta: { title: "MoliHey", description: "MoliHeyのblog" },
  siteRoot:
    process.env.NODE_ENV === "production"
      ? "https://blog-roy1473.vercel.app"
      : "http://localhost:3000",
};
