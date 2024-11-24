import Button from "react-bootstrap/Button";
import { Modal as ModalBS } from "react-bootstrap";
import { ReactNode } from "react";
import React from "react";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
interface ModalProps {
  title: string;
  body: ReactNode;
  showInitially: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  primaryActionText?: string;
  secondaryActionText?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  body,
  showInitially = false,
  primaryActionText = "Save Changes",
  secondaryActionText = "Close",
  onPrimaryAction,
  onSecondaryAction,
  setShow,
}) => {
  const handleClose = () => {
    setShow(false);
    if (onSecondaryAction) onSecondaryAction();
  };
  return (
    <>
      <ModalBS show={showInitially} onHide={handleClose}>
        <ModalBS.Header closeButton>
          <ModalBS.Title>{title}</ModalBS.Title>
        </ModalBS.Header>
        <ModalBS.Body>{body}</ModalBS.Body>
        <ModalBS.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {secondaryActionText}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (onPrimaryAction) onPrimaryAction();
              handleClose();
            }}
          >
            {primaryActionText}
          </Button>
        </ModalBS.Footer>
      </ModalBS>
    </>
  );
};

// Definir as props para o componente LoginModal
interface LoginModalProps {
  show: boolean; // Controla a visibilidade do modal
  onClose: () => void; // Função para fechar o modal
  onSubmit: (credentials: { email: string; password: string }) => void; // Callback para o envio do formulário
}

export const LoginModal: React.FC<LoginModalProps> = ({
  show,
  onClose,
  onSubmit,
}) => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Insira um e-mail válido")
      .required("E-mail é obrigatório"),
    password: Yup.string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .required("Senha é obrigatória"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
    },
  });

  return (
    <ModalBS show={show} onHide={onClose}>
      <ModalBS.Header closeButton>
        <ModalBS.Title>Login</ModalBS.Title>
      </ModalBS.Header>
      <ModalBS.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu e-mail"
              {...formik.getFieldProps("email")}
              isInvalid={formik.touched.email && !!formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              {...formik.getFieldProps("password")}
              isInvalid={formik.touched.password && !!formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-4 w-100">
            Entrar
          </Button>
        </Form>
      </ModalBS.Body>
    </ModalBS>
  );
};
