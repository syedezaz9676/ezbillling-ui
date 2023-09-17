import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import UserService from "../../services/ezuser.service"
import axios from 'axios';
import authHeader from '../../services/auth-header';

function Reg() {
  const [content, setContent] = useState("");
  let handleSubmit = async (e) => {
    console.log('clicked');
      e.preventDefault();
      try {
        let res = await fetch("http://localhost:8080/savecompanydetails", {
          method: "POST",
           headers: new Headers({
                  'Accept': 'text/plain;charset=UTF-',
                  'Content-Type': 'application/json; charset=utf-8',
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                  'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
                }),
          body: JSON.stringify({
            // name: name,
            // gstpercentage: gstpercentage
          }),
        });
        let resJson = await res.json();
        if (res.status === 200) {
          // setName("");
          // setGSTPercentage("");
          // setMessage("User created successfully");
        } else {
          // setMessage("Some error occured");
        }
      } catch (err) {
        console.log(err);
      }
    };
  useEffect(() => {
    handleSubmit();
  },[] );
  
  const [allPlayers, setAllPlayers] = useState([
    { name: "", description: "", price: null, rating: null },
  ]);

  const handleAddPlayers = () => {
    const values = [...allPlayers];
    values.push({
      name: "",
      description: "",
      price: null,
      rating: null,
    });
    setAllPlayers(values);
  };

  const handleRemovePlayers = (index) => {
    const values = [...allPlayers];
    values.splice(index, 1);
    setAllPlayers(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...allPlayers];
    const updatedValue = event.target.name;
    values[index][updatedValue] = event.target.value;

    setAllPlayers(values);
  };

  console.log(allPlayers);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="6" className="dynamic-form-headings">
          <h3>Dynamic Form Fields</h3>
          <Button variant="primary" onClick={() => handleAddPlayers()}>
            Add Player
          </Button>
        </Col>
        <Col xs="12">
          <Form>
            <Row className="justify-content-center">
               {allPlayers.length > 0 && (
                <>
                  {allPlayers.map((field, index) => (
                    <Col xs="4">
                      <div className="add-player-div">
                        <h4>Player {index + 1}</h4>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            value={field.name}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            type="text"
                            name="gstno"
                            placeholder="Enter GST No"
                            value={field.gstno}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            type="number"
                            name="phoneNumer"
                            placeholder="Enter Phone Number"
                            value={field.phoneNumer}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            type="text"
                            name="address"
                            placeholder="Enter Address"
                            value={field.address}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                          />
                        </Form.Group>
                        <Button
                          variant="secondary"
                          onClick={() => handleRemovePlayers(index)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Col>
                  ))}
                </>
              )}
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Reg;
