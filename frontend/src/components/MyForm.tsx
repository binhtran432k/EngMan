import { ReactNode, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface MyFormGroup<T extends FieldValues> {
  name: Path<T>;
  required?: boolean;
  type?: "text" | "password";
}

interface MyFormProps<T extends FieldValues> {
  className?: string;
  groups: MyFormGroup<T>[][];
  onSubmit?: Parameters<typeof Form>[0]["onSubmit"];
  remain?: ReactNode;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
}

function getFormControl<T extends FieldValues>(
  group: MyFormGroup<T>,
  register: UseFormRegister<T>,
  placeholder?: string,
  message?: string
) {
  const type = group.type ?? "text";

  const inputProps = {
    ...register(group.name, {
      setValueAs: (v) => (v !== "" ? v : undefined),
    }),
    isInvalid: !!message,
    placeholder,
  };
  const feedback = (
    <Form.Control.Feedback type="invalid">{message}</Form.Control.Feedback>
  );

  if (type === "password") {
    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
      <InputGroup hasValidation>
        <Button
          className="btnPasswordToggle"
          tabIndex={-1}
          onClick={() => setIsShowPassword((s) => !s)}
        >
          {isShowPassword ? <FaEye /> : <FaEyeSlash />}
        </Button>
        <Form.Control
          {...inputProps}
          type={isShowPassword ? "text" : "password"}
        />
        {feedback}
      </InputGroup>
    );
  } else {
    return (
      <>
        <Form.Control {...inputProps} />
        {feedback}
      </>
    );
  }
}

function parseMessage(message?: string) {
  if (!message) {
    return null;
  }
  const match = message.match(/^(\w+)\.(\w+)(?:#(.*))?$/);
  if (!match) {
    return null;
  }
  const [_, name, key, params] = match;
  const rtKey = key == "missPattern" ? [name, key].join(".") : key;
  const data = params?.split(",");
  return { key: rtKey, name, data };
}

function MyForm<T extends FieldValues>(props: MyFormProps<T>) {
  const { t } = useTranslation("validation");

  return (
    <Form className={props.className} onSubmit={props.onSubmit} noValidate>
      {props.groups.map((subgroups, i) => (
        <Row key={i} className="mb-3" xs={1} md={subgroups.length || 1}>
          {subgroups.map((group, j) => {
            const label = t([group.name, "label"].join("."));
            const parsedMessage = parseMessage(
              props.errors?.[group.name]?.message as string
            );
            const message =
              parsedMessage && t(parsedMessage.key, parsedMessage);
            return (
              <Form.Group
                key={j}
                className="position-relative"
                data-group={group.name}
                as={Col}
              >
                <Form.Label>
                  {label}
                  {group.required && " (*)"}
                </Form.Label>
                {getFormControl(group, props.register, label, message ?? "")}
              </Form.Group>
            );
          })}
        </Row>
      ))}
      {props.remain}
    </Form>
  );
}

export default MyForm;
