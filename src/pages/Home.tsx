import styled from "styled-components";
import { Card } from "../components/Card";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axios";

export const Home = () => {
  interface CardData {
    title: string;
    description: string;
    image: string;
    longDescription: string;
    price: number; // Campo de preço
  }

  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    const fetchCandy = async () => {
      await axiosInstance.get("/api/cards").then((res) => {
        setCards(res.data);
      });
    };
    fetchCandy();
  }, []);

  return (
    <Main>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
        }}
      >
        {Array.isArray(cards) &&
          cards.map((data, index) => (
            <Card
              key={index}
              title={data.title}
              description={data.description}
              image={data.image.replace(/([^:]\/)\/+/g, "$1")}
              longDescription={data.longDescription}
              pricePerUnit={data.price.toString()}
            />
          ))}
      </div>
    </Main>
  );
};

const Main = styled.div``;
