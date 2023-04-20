import { Button, Form, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
  const { t } = useTranslation();
  return (
    <InputGroup>
      <Form.Control placeholder={t("searching")!} />
      <Button className="d-flex align-items-center">
        <FaSearch />
      </Button>
    </InputGroup>
  );
};

export default SearchBox;
