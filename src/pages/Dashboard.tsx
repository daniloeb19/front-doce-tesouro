import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Row, Col, Container } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card } from "../components/Card"; // Substitua pelo seu componente de exibição de produtos
import { axiosInstance } from "../config/axios"; // Substitua pela sua instância configurada do Axios
import useCounterStore from "../zustand"; // Substitua pelo seu hook para gerenciar o token ou estado global
import { useNavigate } from "react-router-dom";

interface Product {
  _id?: string;
  title: string;
  description: string;
  image: File | string;
  longDescription: string;
  price: string;
}

export const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { token } = useCounterStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    setEditingProduct(null); // Limpa o produto para novo
    formik.resetForm(); // Reseta o formulário
    setShowModal(true); // Abre o modal
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/api/cards");
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const createProduct = async (values: Product) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("longDescription", values.longDescription);
    formData.append("price", values.price);

    if (values.image instanceof File) {
      formData.append("image", values.image); // Adiciona o arquivo de imagem
    }

    try {
      const response = await axiosInstance.post("/api/cards", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts([...products, response.data]); // Atualiza a lista de produtos
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao criar o produto:", error);
    }
  };

  const updateProduct = async (values: Product) => {
    if (!editingProduct) return;

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("longDescription", values.longDescription);
    formData.append("price", values.price);

    if (values.image instanceof File) {
      formData.append("image", values.image); // Adiciona o arquivo de imagem
    }

    try {
      const response = await axiosInstance.put(
        `/api/cards/${editingProduct._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedProducts = products.map((product) =>
        product._id === editingProduct._id ? response.data : product
      );
      setProducts(updatedProducts); // Atualiza a lista de produtos
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await axiosInstance.delete(`/api/cards/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter((product) => product._id !== id)); // Remove produto da lista
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const validationSchema = Yup.object({
    title: Yup.string().required("Título é obrigatório"),
    description: Yup.string().required("Descrição é obrigatória"),
    image: Yup.mixed().required("Imagem é obrigatória"),
    longDescription: Yup.string().required("Descrição longa é obrigatória"),
    price: Yup.number()
      .required("Preço é obrigatório")
      .positive("Preço deve ser positivo"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "", // Inicialize com string vazia
      longDescription: "",
      price: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (editingProduct) {
        updateProduct(values);
      } else {
        createProduct(values);
      }
    },
  });

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);

    formik.setValues({
      title: product.title,
      description: product.description,
      image: typeof product.image === "string" ? product.image : "", // Se a imagem for string, passa ela, senão, passa uma string vazia
      longDescription: product.longDescription,
      price: product.price,
    });

    setShowModal(true);
  };

  return (
    <Container>
      <Button variant="primary" onClick={handleShowModal}>
        Adicionar Produto
      </Button>
      <Row className="mt-4">
        {Array.isArray(products) &&
          products.map((product, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="mb-4">
              <Card
                title={product.title}
                description={product.description}
                image={product.image}
                longDescription={product.longDescription}
                pricePerUnit={product.price}
                noBtn={true}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  width: 286,
                }}
              >
                <Button
                  variant="primary"
                  onClick={() => handleEditProduct(product)}
                  style={{
                    width: "100%",
                    borderRadius: "0px 0px 0px 10px",
                    color: "#fff",
                  }}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  style={{
                    width: "100%",
                    borderRadius: "0px 0px 10px 0px",
                  }}
                  onClick={() => deleteProduct(product._id || "")}
                >
                  Excluir
                </Button>
              </div>
            </Col>
          ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct
              ? `Editar Produto: ${editingProduct.title}`
              : "Novo Produto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Label>Título</Form.Label>
              <Form.Control
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.description}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Descrição Longa</Form.Label>
              <Form.Control
                name="longDescription"
                value={formik.values.longDescription}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.longDescription}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.longDescription}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Preço</Form.Label>
              <Form.Control
                name="price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.price}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Imagem</Form.Label>
              <Form.Control
                name="image"
                type="file"
                onChange={(event) => {
                  const target = event.currentTarget as HTMLInputElement;
                  if (target.files && target.files[0]) {
                    formik.setFieldValue("image", target.files[0]);
                  }
                }}
                isInvalid={!!formik.errors.image}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.image}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Exibindo a imagem selecionada ou já existente */}
            {formik.values.image && (
              <div className="mt-3">
                <img
                  src={
                    typeof formik.values.image === "string"
                      ? `${formik.values.image}`
                      : URL.createObjectURL(formik.values.image)
                  }
                  alt="Imagem do produto"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            )}

            <Button type="submit" variant="primary" className="mt-3">
              {editingProduct ? "Atualizar Produto" : "Criar Produto"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
