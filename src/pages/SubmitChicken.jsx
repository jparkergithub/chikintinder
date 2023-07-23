import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import { submitChicken } from "../utils/api";

const emptyForm = {
  name: "",
  location: "",
  imgUrl: "",
  description: "",
};

function SubmitChicken() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const navigate = useNavigate();

  function submitForm() {
    setLoading(true);
    submitChicken(form).then(() => {
      setLoading(false);
      navigate("/view");
    });
  }

  return (
    <div>
      <Header />
      <h2 className="ms-2">Submit a Chicken</h2>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Form className="p-3">
            <FormGroup>
              <Label>Name: </Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label>Location: </Label>
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label>Image URL: </Label>
              <Input
                value={form.imgUrl}
                onChange={(e) => setForm({ ...form, imgUrl: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label>Description: </Label>
              <Input
                type="textarea"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </FormGroup>
            <Button color="primary" size="lg" onClick={submitForm}>
              Submit 🐔
            </Button>
          </Form>
        </>
      )}
    </div>
  );
}

export default SubmitChicken;
