import algoliasearch from "algoliasearch";

const client = algoliasearch(
  process.env.ALGOLIA_CLIENT,
  process.env.ALGOLIA_PASS
);
const index = client.initIndex("products");
export { index };
