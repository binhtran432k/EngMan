interface UserIconProps {
  username: string;
  firstName?: string;
  lastName?: string;
  size: string;
}

function UserIcon(props: UserIconProps) {
  const name =
    [props.firstName?.[0], props.lastName?.[0]].filter(Boolean).join("") ||
    props.username[0];
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      width={props.size}
      height={props.size}
      className="user-icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(50, 50)">
        <circle r="50" />
        <text
          style={{ fill: "var(--bs-body-bg)" }}
          fontWeight="bold"
          fontSize="50"
          dominantBaseline="central"
          textAnchor="middle"
        >
          {name.toUpperCase()}
        </text>
      </g>
    </svg>
  );
}

export default UserIcon;
