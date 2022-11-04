import type { PageData, PageHelpers } from "#types";

export default ({ comp, site }: PageData, { urlFilter }: PageHelpers) => {
  return (
    <footer className="container">
      <p>
        designed & built by{" "}
        <a href="https://jrson.me" target="_blank">jrson.me</a>
      </p>
      <comp.shared.iconbar />
    </footer>
  );
};
