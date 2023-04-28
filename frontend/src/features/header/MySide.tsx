import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { ReactNode } from "react";

interface MySideSectionItem {
  icon?: ReactNode;
  className?: string;
  label?: ReactNode;
  link?: string;
  onClick?: () => void;
}

interface MySideSection {
  title?: string | null;
  items?: MySideSectionItem[];
  remain?: ReactNode;
}

interface SidebarProps {
  sections: MySideSection[];
  onClick?: () => void;
}

function getSideItem({
  item,
  key,
  as,
  globalOnClick: globalToggle,
}: {
  item: MySideSectionItem;
  key?: number | string;
  as?: Parameters<typeof Nav.Link>[0]["as"];
  globalOnClick?: () => void;
}) {
  const element = (
    <Nav.Link
      key={key}
      className={[item.className, `d-flex align-items-center gap-2`]
        .filter(Boolean)
        .join(" ")}
      as={as}
      onClick={() => {
        globalToggle && globalToggle();
        !item.link && item.onClick && item.onClick();
      }}
    >
      {item.icon}
      {item.label && <span>{item.label}</span>}
    </Nav.Link>
  );
  return item.link ? (
    <LinkContainer to={item.link}>{element}</LinkContainer>
  ) : (
    element
  );
}

function getSideSections(sections: MySideSection[], onClick?: () => void) {
  return sections.map((section, i) => (
    <div key={i}>
      {section.title && (
        <div className="text-uppercase text-secondary small">
          {section.title}
        </div>
      )}
      {section.items?.map((item, i) =>
        getSideItem({ item, key: i, globalOnClick: onClick })
      )}
      {section.remain}
    </div>
  ));
}

function MySide(props: SidebarProps) {
  return (
    <Nav className="flex-column" variant="pills" style={{ minWidth: "16rem" }}>
      {getSideSections(props.sections, props.onClick)}
    </Nav>
  );
}

export { getSideItem };
export type { MySideSection, MySideSectionItem };
export default MySide;
