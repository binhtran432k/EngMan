import MyCarolsel from "@/components/MyCarolsel";
import ShareOpinion from "@/components/ShareOpinion";
import Studying from "@/components/Studying";
import { Container } from "react-bootstrap";

function HomePage() {
  return (
    <div className="home">
      <div className="py-5 bg-body-tertiary">
        <Container>
          <MyCarolsel />
        </Container>
      </div>
      <Container>
        <div className="py-5">
          <ShareOpinion />
        </div>
      </Container>
      <div className="py-5 bg-body-tertiary">
        <Container>
          <Studying />
        </Container>
      </div>
    </div>
  );
}

export default HomePage;
