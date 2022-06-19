import React, { useState } from 'react';
import {
  Container,
  Grid,
  Button,
  Row,
  Col,
  Panel,
  Modal,
  Form,
  ButtonToolbar,
} from 'rsuite';
import { v4 as UUID } from 'uuid';
import { useSession } from '../context/Auth';
export const SessionCreate = () => {
  const { setSession } = useSession();
  const [isOpen, setIsOpen] = useState();
  const [formData, setFormData] = useState();

  const createSession = () => {
    setIsOpen(true);

    let uuid = UUID();
    let timestamp = new Date();

    const authObj = {
      name: formData.name,
      id: uuid,
      createdAt: timestamp.toLocaleDateString(),
      lastLogin: timestamp.toLocaleString(),
    };

    localStorage.setItem('session', JSON.stringify(authObj));
    setSession({ ...authObj });
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2 align="center" style={{ fontSize: '36px' }}>
                  Welcome to Mock-SQL
                </h2>
                <p align="center">
                  Illustrating and replicating SQL queries in React!
                </p>
                <br />

                <p align="center">
                  <i> Create a new session to begin with the app</i>
                </p>
                <br />
              </div>

              <div className="mt-3">
                <Button
                  block
                  color="blue"
                  appearance="primary"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  Create a new session
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>

      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Form fluid onChange={setFormData}>
          <Form.Group controlId="name-user">
            <Form.ControlLabel>Name of user</Form.ControlLabel>
            <Form.Control name="name" />
          </Form.Group>
          <ButtonToolbar>
            <Button
              block
              appearance="primary"
              color="green"
              onClick={createSession}
            >
              Create
            </Button>
          </ButtonToolbar>
        </Form>
      </Modal>
    </Container>
  );
};
