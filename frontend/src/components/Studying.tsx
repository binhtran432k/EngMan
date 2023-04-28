import { Card, Col, Row } from "react-bootstrap";
import Rating from "./Rating";

interface StudyingItem {
  author: string;
  rate: number;
  totalRate: number;
  title: string;
  image: string;
  url: string;
}

function getStudyingItems(items: StudyingItem[]) {
  return items.map((item, i) => (
    <Col key={i}>
      <Card>
        <Card.Link href={item.url}>
          <Card.Img
            src={item.image}
            alt={item.title}
            style={{ height: "10rem", width: "16rem", objectFit: "cover" }}
          />
        </Card.Link>
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text className="text-body-secondary small fw-normal">
            {item.author}
          </Card.Text>
          <div className="d-flex gap-1 small">
            <div className="text-warning-emphasis fs-6 d-flex align-items-center">
              {item.rate.toFixed(1)}
            </div>
            <div className="text-warning">
              <Rating id={"StudyingItem" + i} rate={item.rate / 5} size={5} />
            </div>
            <div className="text-body-tertiary">
              ({item.totalRate.toLocaleString("en-US")})
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ));
}

function Studying() {
  const shareOptions: StudyingItem[] = [
    {
      author: "Lorem Ipsum",
      rate: 3.5,
      totalRate: 1324,
      title: "Elit dolor cumque ducimus quo.",
      image: "/fakes/Podcast.svg",
      url: "#test",
    },
  ];
  return (
    <div className="share-opinion">
      <h2>Students are viewing</h2>
      <Row className="flex-nowrap my-3 py-2 overflow-x-auto">
        {getStudyingItems(shareOptions)}
        {getStudyingItems(shareOptions)}
        {getStudyingItems(shareOptions)}
        {getStudyingItems(shareOptions)}
        {getStudyingItems(shareOptions)}
        {getStudyingItems(shareOptions)}
      </Row>
    </div>
  );
}

export default Studying;
