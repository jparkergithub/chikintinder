import _ from "lodash";
import { useEffect, useState } from "react";
import { Col, Form, Input, Label, Row, Table } from "reactstrap";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import { getAllChickens } from "../utils/api";

function ViewChickens() {
  const [loading, setLoading] = useState(false);
  const [chickens, setChickens] = useState();

  function refreshChickens() {
    setLoading(true);
    getAllChickens().then((data) => {
      setChickens(data);
      setLoading(false);
    });
  }

  useEffect(refreshChickens, []);

  return (
    <div>
      <Header />
      <h2 className="ms-2">All Chickens</h2>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Form className="p-3">
            <Row>
              <Col md={3}>
                <Label>Sort By: </Label>
              </Col>
              <Col md={9}>
                <Input type="select" bsSize="sm" />
              </Col>
            </Row>
          </Form>
          <Table hover>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Location</th>
                <th>👎</th>
                <th>👍</th>
                <th>Total Score</th>
              </tr>
            </thead>
            <tbody>
              {_.map(chickens, (c) => (
                <tr key={c.id}>
                  <td>
                    <img
                      src={c.imgurl}
                      style={{
                        height: "48px",
                        width: "48px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td
                    className={
                      "fw-bold " + (c.score > 0 ? "text-danger" : "text-muted")
                    }
                  >
                    {c.name}
                  </td>
                  <td>{c.location}</td>
                  <td>{c.updoots}</td>
                  <td>{c.downdoots}</td>
                  <td
                    className={
                      "fw-bold " + (c.score > 0 ? "text-danger" : "text-muted")
                    }
                  >
                    {c.score} {c.score > 0 ? "🔥" : "❄️"}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}

export default ViewChickens;
