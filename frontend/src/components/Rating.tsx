interface RatingProps {
  rate: number;
}

const Rating = (props: RatingProps) => {
  return (
    <svg
      height="1.2rem"
      viewBox="0 0 70 14"
      fill="currentColor"
      stroke="currentColor"
      className="rating"
      xmlns="http://www.w3.org/2000/svg"
    >
      <symbol id="icon-rating-star" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"></path>
      </symbol>
      <mask id="star-rating-mask--5" data-purpose="star-rating-mask">
        <rect x="0" y="0" width={(props.rate*100/5).toFixed(0).toString() + "%"} height="100%" fill="white"></rect>
      </mask>
      <g mask="url(#star-rating-mask--5)" data-purpose="star-filled">
        <use xlinkHref="#icon-rating-star" width="14" height="14" x="0"></use>
        <use xlinkHref="#icon-rating-star" width="14" height="14" x="14"></use>
        <use xlinkHref="#icon-rating-star" width="14" height="14" x="28"></use>
        <use xlinkHref="#icon-rating-star" width="14" height="14" x="42"></use>
        <use xlinkHref="#icon-rating-star" width="14" height="14" x="56"></use>
      </g>
      <g fill="transparent" strokeWidth="2" data-purpose="star-bordered">
        <use
          xlinkHref="#icon-rating-star"
          width="12"
          height="12"
          x="1"
          y="1"
        ></use>
        <use
          xlinkHref="#icon-rating-star"
          width="12"
          height="12"
          x="15"
          y="1"
        ></use>
        <use
          xlinkHref="#icon-rating-star"
          width="12"
          height="12"
          x="29"
          y="1"
        ></use>
        <use
          xlinkHref="#icon-rating-star"
          width="12"
          height="12"
          x="43"
          y="1"
        ></use>
        <use
          xlinkHref="#icon-rating-star"
          width="12"
          height="12"
          x="57"
          y="1"
        ></use>
      </g>
    </svg>
  );
};

export default Rating;
