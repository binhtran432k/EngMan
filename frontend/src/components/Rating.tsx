interface RatingProps {
  id: string;
  rate: number;
  size?: number;
}

const Rating = ({ id, rate, size = 5 }: RatingProps) => {
  const iconId = "icon-rating-star--" + id;
  const maskId = "star-rating-mask--" + id;
  const iconIdUse = "#" + iconId;
  const maskIdUse = `url(#${maskId})`;

  return (
    <svg
      height="1.2rem"
      viewBox={`0 0 ${14 * size} 14`}
      fill="currentColor"
      stroke="currentColor"
      className="Rating"
      xmlns="http://www.w3.org/2000/svg"
    >
      <symbol id={iconId} viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"></path>
      </symbol>
      <mask id={maskId} data-purpose="star-rating-mask">
        <rect
          x="0"
          y="0"
          width={(rate * 100).toFixed(0).toString() + "%"}
          height="100%"
          fill="white"
        ></rect>
      </mask>
      <g mask={maskIdUse} data-purpose="star-filled">
        {[...Array(size).keys()].map((_, i) => (
          <use
            key={i}
            xlinkHref={iconIdUse}
            width="14"
            height="14"
            x={14 * i}
          ></use>
        ))}
      </g>
      <g fill="transparent" strokeWidth="2" data-purpose="star-bordered">
        {[...Array(size).keys()].map((_, i) => (
          <use
            key={i}
            xlinkHref={iconIdUse}
            width="12"
            height="12"
            x={1 + 14 * i}
            y="1"
          ></use>
        ))}
      </g>
    </svg>
  );
};

export default Rating;
