import type { PageData, PageHelpers } from "#types";

export default (
  { comp, icons: { unicons }, site }: PageData,
  { urlFilter }: PageHelpers,
) => (
  <ul className="li-i">
    <li>
      <a
        className="no-ext"
        href={site.github.url}
        target="_blank"
        rel="noopener"
        aria-label="Visit my Github profile"
      >
        <comp.shared.icon
          icon={unicons.github}
          title="Visit my Github profile"
          color="primary-link-color"
        />
      </a>
    </li>
    <li>
      <a
        className="no-ext"
        href={urlFilter!("/feed.xml", true)}
        target="_blank"
        rel="noopener"
        aria-label="Visit my XML Feed"
      >
        <comp.shared.icon
          icon={unicons.rss}
          title="Visit my XML Feed"
          color="primary-link-color"
        />
      </a>
    </li>
  </ul>
);
