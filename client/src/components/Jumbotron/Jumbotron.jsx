import React from "react";
import "./Jumbotron.css";

export const Jumbotron = ({ title }) => {
  return (
    <section id="jumbotron">
      <h2>{title}</h2>
    </section>
  );
};
