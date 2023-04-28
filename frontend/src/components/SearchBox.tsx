import { Button, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

interface SearchBoxProps {
  placeholder: string;
}

const SearchBox = (props: SearchBoxProps) => {
  return (
    <InputGroup>
      <Form.Control placeholder={props.placeholder} />
      <Button className="d-flex align-items-center">
        <FaSearch />
      </Button>
    </InputGroup>
  );
};

export default SearchBox;
