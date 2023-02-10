import algoliasearch from "algoliasearch";

const client = algoliasearch("M9QTOU105A", "042ac9a48708713531fbebcd68b6fc81");
const index = client.initIndex("products");
export { index };
