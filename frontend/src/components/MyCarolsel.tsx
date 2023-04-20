import { Carousel as CarouselBS } from "react-bootstrap";
import welcomeImgSrc from "@/assets/illustrations/Welcome.svg";
import onlineImgSrc from "@/assets/illustrations/Online.svg";

interface CarouselItem {
  image: string;
  title: string;
  body: string;
}

function getCarolselItems(items: CarouselItem[]) {
  return items.map((item, i) => (
    <CarouselBS.Item key={i}>
      <img
        className="d-block w-100"
        src={item.image}
        alt={item.title}
        style={{ height: "20rem", objectFit: "contain" }}
      />
      <CarouselBS.Caption>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </CarouselBS.Caption>
    </CarouselBS.Item>
  ));
}

function MyCarolsel() {
  return (
    <CarouselBS className="my-carousel mx-auto">
      {getCarolselItems([
        {
          image: welcomeImgSrc,
          title: "Learning that gets you",
          body: "Skills for your present (and your future). Get started with us.",
        },
        {
          image: onlineImgSrc,
          title: "Come teach with us",
          body: "Become an instructor and change lives — including your own",
        },
      ])}
    </CarouselBS>
  );
}

export default MyCarolsel;
