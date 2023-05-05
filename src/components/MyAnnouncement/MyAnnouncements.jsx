import React, { useEffect, useState } from "react";
import { Row, Col, Image, Button, ListGroup, Card } from "react-bootstrap";
import announcementsJSON from "../../announcementsJSON.json";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./MyAnnouncements.css";
import { showMyAnnouncements } from "../../services/ApiServices";
import { store } from "../IdUser/IdUser";


function MyAnnoucements() {
  const [announcements, setAnnouncements] = useState(announcementsJSON);
  const [idUser] = store.useState("id");

  useEffect(() => {
    showMyAnnouncements(idUser)
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="my-announcement-container mt-5 mb-5">
      <Card className="announcement-card">
        <Card.Header className="announcement-card-header">
          <Card.Title>
            <h1 className="myAnnoucements-title mb-3">Mis anuncios</h1>
          </Card.Title>
        </Card.Header>
        <Card.Body className="announcement-card-body">
          {announcements.length === 0 ? (
            <Card.Text>Aún no se ha publicado ningún anuncio.</Card.Text>
          ) : (
            <ListGroup>
              {announcements.map((announcement) => (
                <ListGroup.Item key={announcement.id}>
                  <Row className="announcement-row">
                    <Col md={3} className="image-col">
                      <Image
                        src={announcement.image}
                        thumbnail
                        className="img-announcement"
                      />
                    </Col>
                    <Col md={9}>
                      <h3>{announcement.title}</h3>
                      <p>
                        <strong>Descripción:</strong> {announcement.description}
                      </p>
                      <p>
                        <strong>Edad (años):</strong> {announcement.age}
                      </p>
                      <p>
                        <strong>Tipo:</strong> {announcement.animal}
                      </p>
                      <p>
                        <strong>Género:</strong> {announcement.gender}
                      </p>
                      <div className="button-container">
                        <Button variant="danger">
                          <AiFillDelete />
                        </Button>
                        <Button variant="info">
                          <AiFillEdit />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default MyAnnoucements;
