import React from "react";
import Container from "react-bootstrap/Container";

function About() {
  return (
    <Container className="d-flex">
      <img
        src="https://as1.ftcdn.net/v2/jpg/11/61/70/72/1000_F_1161707250_ephNG9ldnLJ7ZebvGnFqXLyuxiFrCrfN.jpg" //can I use this image instead? Found it online
        alt="About"
        width="550"
        height="400"
        className="p-3 align-left"
      />

      <div className="p-3 text-right">
        <h1>Welcome to Libby's Smoothie Bar!</h1>
        Macaroon cheesecake jelly pastry sweet roll danish gummies. Liquorice
        icing liquorice cotton candy pastry tootsie roll gingerbread lollipop.
        Sweet liquorice shortbread cotton candy gingerbread. Donut gummies
        croissant halvah halvah bonbon. Cotton candy dragée ice cream
        marshmallow caramels gummies bear claw shortbread. Pie donut pie
        lollipop gingerbread lollipop danish. Caramels liquorice lollipop jelly
        chocolate cake apple pie jujubes. Cupcake muffin croissant soufflé
        toffee. Fruitcake cheesecake liquorice brownie carrot cake powder jelly
        danish. Tart gummi bears chocolate bar wafer gummies lemon drops.
        Liquorice caramels cupcake bonbon chupa chups danish sesame snaps.
        Biscuit pastry pastry dragée macaroon soufflé.
      </div>
    </Container>
  );
}

export default About;
