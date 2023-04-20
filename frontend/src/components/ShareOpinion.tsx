import { Card, Col, Row } from "react-bootstrap";
import UserIcon from "./UserIcon";

interface ShareOpinionItem {
  firstName: string;
  lastName: string;
  content: string;
  title: string;
  url: string;
}

function getShareOptionItems(items: ShareOpinionItem[]) {
  return items.map((item, i) => (
    <Col key={i}>
      <Card>
        <Card.Body>
          <Card.Text>{item.content}</Card.Text>
          <UserIcon
            firstName={item.firstName}
            lastName={item.lastName}
            size="2rem"
          />
          <span className="ms-2">{item.firstName + " " + item.lastName}</span>
        </Card.Body>
        <Card.Footer>
          <Card.Title>
            <Card.Link href={item.url} className="text-decoration-none">
              {item.title}
            </Card.Link>
          </Card.Title>
        </Card.Footer>
      </Card>
    </Col>
  ));
}

function ShareOpinion() {
  const shareOptions: ShareOpinionItem[] = [
    {
      firstName: "Lorem",
      lastName: "Dolar",
      content:
        "Dolor labore tempore nobis enim eius enim inventore rerum recusandae architecto Delectus quibusdam vel aliquam officia doloremque Illo perspiciatis perferendis",
      title: "Elit recusandae vitae lorem aspernatur",
      url: "#lorem-ipsum",
    },
  ];
  return (
    <div className="share-opinion">
      <h2>How learners like you are achieving their goals</h2>
      <Row
        className="flex-nowrap my-3 py-2 overflow-x-auto"
        xs={1}
        md={2}
        lg={3}
        xl={4}
      >
        {getShareOptionItems(shareOptions)}
        {getShareOptionItems(shareOptions)}
        {getShareOptionItems(shareOptions)}
        {getShareOptionItems(shareOptions)}
        {getShareOptionItems(shareOptions)}
        {getShareOptionItems(shareOptions)}
      </Row>
    </div>
  );
}

export default ShareOpinion;
