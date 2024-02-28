import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalAuthContext } from "../context/authContext";
import { useGlobalPairsContext } from "../context/pairsContext";

const Test = () => {
  const { pairsState, dispatchForPairs } = useGlobalPairsContext();
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
      fetch("https://moringapair-tx15.onrender.com/api/create_pairs", {
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
          toast.error(err);
        });
    },
  });
  return (
    <div>
      <Row className="justify-content-center">
        <Col md={3}>
          <Form onSubmit={formik.handleSubmit}>
            <Button
              variant="primary"
              type="submit"
              block
              className="mt-3 btn-gen-pair"
              disabled={!formik.isValid}
            >
              Generate Pairs
            </Button>
            <FloatingLabel label="Week Number" className="mb-3">
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
            {formik.touched.weeknumber && formik.errors.weeknumber ? (
              <div className="error">{formik.errors.weeknumber}</div>
            ) : null}
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Test;
