import _ from "lodash";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Button, Container, Row } from "reactstrap";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import { downdootChicken, getAllChickens, updootChicken } from "../utils/api";

function RateChickens() {
  const [loading, setLoading] = useState(false);
  const [chickens, setChickens] = useState([]);
  const [index, setIndex] = useState(0);

  const chicken = chickens[index] ?? {};

  function getNewChicken() {
    setLoading(true);
    getAllChickens().then((data) => {
      console.log(data);
      setChickens(_.shuffle(data));
      setLoading(false);
    });
  }

  useEffect(getNewChicken, []);

  return (
    <div>
      <Header />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Container>
          {index <= chickens.length - 1 ? (
            <Row>
              <div className="p-2 bg-light d-flex align-items-center justify-content-center">
                <div className="chikn-img d-flex align-items-center justify-content-center">
                  <img src={chicken.imgurl} />
                </div>
              </div>
              <div style={{ height: "220px" }}>
                <h2 className="mt-3 d-flex align-items-baseline">
                  {chicken.name}
                  <small className="text-sm text-muted ms-3 d-flex align-items-center">
                    <FaMapMarkerAlt style={{ width: 20 }} className="me-2" />
                    {chicken.location}
                  </small>
                </h2>
                <hr />
                <h6>Description</h6>
                <p>{chicken.description}</p>
              </div>
              <div className="d-flex justify-content-between px-2 py-4">
                <Button
                  outline
                  color="primary"
                  size="lg"
                  className="shadow-sm"
                  onClick={() => {
                    downdootChicken(chicken.id);
                    setIndex(index + 1);
                  }}
                >
                  🚫 Cool Ranch 🥶
                </Button>
                <Button
                  outline
                  color="danger"
                  size="lg"
                  className="shadow-sm"
                  onClick={() => {
                    updootChicken(chicken.id);
                    setIndex(index + 1);
                  }}
                >
                  ❤️ Spicy Buffalo 🥵
                </Button>
              </div>
            </Row>
          ) : (
            "No more chickens to rate."
          )}
        </Container>
      )}
    </div>
  );
}

export default RateChickens;
