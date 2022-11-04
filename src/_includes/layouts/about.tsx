import type { AboutData } from "#types";

export const layout = "layouts/root.tsx";

export default (
  { blogstacks, icons: { stack }, comp, header, stacks, title }: AboutData,
) => {
  return (
    <section>
      <h1>{title}</h1>
      <hr />
      <p>{header.description}</p>
    </section>
  );
};
