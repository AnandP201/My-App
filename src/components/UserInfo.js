import React from 'react';
import { Panel, Container, Content } from 'rsuite';
import { useSession } from '../context/Auth';

const UserInfo = () => {
  const { session } = useSession();

  return (
    <Panel
      shaded
      style={{
        display: 'inline-block',
        marginTop: '20px',
        marginBottom: '20px',
      }}
    >
      <Container>
        <Content>
          <table cellPadding={4} cellSpacing={5} style={{ fontSize: '18px' }}>
            <tbody>
              <tr>
                <td style={{ textAlign: 'left' }}>
                  <b>Session ID</b>
                </td>
                <td style={{ textAlign: 'right', fontStyle: 'italic' }}>
                  {session.id}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: 'left' }}>
                  <b>Name of User</b>
                </td>
                <td style={{ textAlign: 'right', fontStyle: 'italic' }}>
                  {session.name}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: 'left' }}>
                  <b>Created At</b>
                </td>
                <td style={{ textAlign: 'right', fontStyle: 'italic' }}>
                  {session.createdAt}
                </td>
              </tr>
            </tbody>
          </table>
        </Content>
      </Container>
    </Panel>
  );
};

export default UserInfo;
