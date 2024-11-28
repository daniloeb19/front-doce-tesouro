import React, { useState } from "react";
import { Button, ButtonProps, Card as CardBootstrap } from "react-bootstrap";
import { Modal } from "./Modal";
import { theme } from "../styles/theme";
import styled from "styled-components";
import { ajustColor } from "../utils/color";

const StyledCard = styled(CardBootstrap)`
  width: 18rem;
  display: flex;
  flex-direction: column;
  min-height: 30rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const CardImage = styled(CardBootstrap.Img)`
  object-fit: cover;
  max-width: 286px;
  max-height: 286px;
  width: 286px;
  height: 286px;
`;

const CardBody = styled(CardBootstrap.Body)`
  position: relative;
  padding-bottom: 3rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const CardTitle = styled(CardBootstrap.Title)`
  max-height: 40px;
  height: 40px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const CardText = styled(CardBootstrap.Text)`
  height: 40px;
  min-height: 40px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const PriceText = styled(CardBootstrap.Text)`
  strong {
    font-weight: bold;
  }
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  bottom: 6px;
  left: 6px;
  right: 6px;
  position: absolute;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const StyledButton = styled(Button)<ButtonProps>`
  background-color: ${theme.colors.darkBrown};
  &:hover {
    background-color: ${ajustColor(theme.colors.darkBrown, 0.95)};
  }
  border: 1px solid white;
  width: 100%;
  border-radius: 0px 0px 6px 6px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

interface CardProps {
  title: string;
  description: string;
  image: string | File;
  longDescription: string;
  pricePerUnit: string;
  noBtn?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  longDescription,
  pricePerUnit,
  noBtn,
}) => {
  let numberPhone = 5581987741179;
  const [show, setShow] = useState(false);

  const handleMessage = () => {
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numberPhone}&text=Opa%20me%20interessei%20nesse%20produto%20aqui%20%22${title}%22%2C%20t%C3%A1%20dispon%C3%ADvel%20ainda%3F`;

    window.open(linkWhatsApp, "_blank");
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <StyledCard>
        <CardImage
          variant="top"
          src={typeof image === "string" ? image : URL.createObjectURL(image)}
          alt="Card image"
        />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardText>{description}</CardText>
          <PriceText>
            <strong>Preço por unidade:</strong> {pricePerUnit}
          </PriceText>
          {!noBtn && (
            <ButtonContainer>
              <StyledButton onClick={() => setShow(true)}>
                Ver mais
              </StyledButton>
            </ButtonContainer>
          )}
        </CardBody>
      </StyledCard>
      <Modal
        title={title}
        body={longDescription}
        primaryActionText="Me interesso!"
        secondaryActionText="Fechar"
        onPrimaryAction={handleMessage}
        onSecondaryAction={handleClose}
        showInitially={show}
        setShow={setShow}
      />
    </>
  );
};
