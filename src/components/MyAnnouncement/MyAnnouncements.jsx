import React, { useEffect, useState } from "react";
import { Row, Col, Image, Button, ListGroup, Card } from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./MyAnnouncements.css";
import { deleteMyAnnouncement, showMyAnnouncements } from "../../services/ApiServices";
import { store } from "../IdUser/IdUser";
import { confirmationMessage, errorMessage, successfulMessage } from "../Messages/Messages";
import { useNavigate } from "react-router-dom";
import { containerLogger } from "../IsLogger/IsLogger";

function MyAnnoucements() {
  const [announcements, setAnnouncements] = useState([]);
  const [idUser] = store.useState("id");
  const navigate = useNavigate();
  const [isLogger] = containerLogger.useState("isLogger");

  useEffect(() => {
    const redirectToPath = (path) => {
      navigate(path);
    };

    const fetchCharacters = async () => {
      if (!isLogger) {
        redirectToPath("/home");
      } else {
        try {
          const response = await showMyAnnouncements(idUser);
          setAnnouncements(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchCharacters();
  }, [isLogger, navigate, idUser, setAnnouncements]);

  const deleteAdoptionAnnouncement = async (
    idAnnouncement,
    nameAnnouncement
  ) => {
    const result = await confirmationMessage(
      `¿Seguro que quieres eliminar el anuncio: "${nameAnnouncement}"?`
    );
    if (result.value) {
      try {
        await deleteMyAnnouncement(idAnnouncement);
        successfulMessage("Se ha eliminado el anuncio correctamente.");
      } catch (error) {
        console.log(error);
        errorMessage("Ha ocurrido un error al eliminar el anuncio.");
      }
    }
  };

  const editAdoptionAnnouncement = async (announcement) => {
    navigate(`/announcement/adoption/editAnnoucement/"${announcement.id}"`, {
      state: { announcement: announcement },
    });
  };

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
                        <Button
                          variant="danger"
                          onClick={() =>
                            deleteAdoptionAnnouncement(
                              announcement.id,
                              announcement.name
                            )
                          }
                        >
                          <AiFillDelete />
                        </Button>
                        <Button
                          variant="info"
                          onClick={() => editAdoptionAnnouncement(announcement)}
                        >
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
