import type { Page, PageData } from "#types";

export const renderOrder = 1;

export const title = "Home";
export const layout = "layouts/root.tsx";

export default ({ comp, search }: PageData) => {
  const posts = search?.pages("type=post", "date=desc", 3) as Page[];

  return (
    <>
      <section>
        <p>
          This blog built by{" "}
          <a
            href="https://lume.land/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            Lume
          </a>{" "}
          &{" "}
          <a
            href="https://deno.land/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            Deno
          </a>.
        </p>
        <comp.shared.iconbar />
      </section>
      <hr />
      <h2>Recent posts</h2>
      <section itemScope itemType="http://schema.org/Blog">
        {posts.map(({ data }, index) => (
          <comp.blog.post index={index.toString()} {...data} />
        ))}
        {posts?.length === 0 && <p>Sorry, no posts matched your criteria.</p>}
      </section>
    </>
  );
};
