import React from "react";
import Pair from "../components/Pair";
import LinearColor from "../components/LinearProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalPairsContext } from "../context/pairsContext";
import { Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const Pairs = () => {
  // provide PairsContext
  const { pairsState, dispatchForPairs } = useGlobalPairsContext();

  const notify = () => toast("Generating Pairs 👨‍🎓👩‍🎓");

  // formik
  const formik = useFormik({
    // initialValues
    initialValues: {
      week_number: "",
    },

    // validationSchema
    validationSchema: Yup.object({
      week_number: Yup.string().required("Week number required"),
    }),

    // onSubmit
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      // loading
      dispatchForPairs({ type: "FETCH_REQUEST" });

      // fetch API
      fetch("http://127.0.0.1:5555/api/create_pairs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            resetForm();
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
          if (data.pairs) {
            setTimeout(() => {
              // data
              dispatchForPairs({ type: "FETCH_SUCCESS", payload: data.pairs });
            }, 1500);
          }
        })
        .catch((err) => {
          console.log("Error in generating random pairs", err);
          // error
          dispatchForPairs({ type: "FETCH_FAILURE", payload: err });
        });
    },
  });

  if (pairsState.loading) {
    return <LinearColor />;
  }

  return (
    <div className="pairs-container">
      <Row className="justify-content-center">
        <Col md={12}>
          <Form onSubmit={formik.handleSubmit} className="week-input-form">
            <Button
              variant="primary"
              type="submit"
              block
              className="mt-3 btn-gen-pair"
              disabled={!formik.isValid}
            >
              Generate Pairs
            </Button>
            <FloatingLabel label="Week Number" className="week-form-control">
              <Form.Control
                type="number"
                placeholder="Enter week number"
                size="lg"
                name="week_number"
                id="week_number"
                value={formik.values.weeknumber}
                onChange={formik.handleChange}
                autoFocus
              />
            </FloatingLabel>
            {formik.touched.week_number && formik.errors.week_number ? (
              <div className="error">{formik.errors.week_number}</div>
            ) : null}
          </Form>
        </Col>
      </Row>
      <ToastContainer />

      <div className="pair-cards">
        {pairsState.pairs &&
          pairsState.pairs.map((pair) => {
            return <Pair key={pair.id} {...pair} />;
          })}
      </div>
    </div>
  );
};

export default Pairs;
