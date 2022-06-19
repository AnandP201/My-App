import React, { useState } from 'react';

import {
  Container,
  Content,
  Panel,
  SelectPicker,
  PanelGroup,
  Stack,
  Divider,
  Whisper,
  Button,
  Notification,
  Popover,
} from 'rsuite';
import { useSession } from '../context/Auth';
import { useToaster } from 'rsuite/toaster';

import customers from '../data/customers.json';
import orders from '../data/orders.json';

const cellStyle = {
  textAlign: 'left',
  padding: '5px',
  fontSize: '15px',
};

const items = [
  {
    label: 'Customers',
    value: 'customers',
    role: 'Master',
  },
  {
    label: 'Orders',
    value: 'orders',
    role: 'Master',
  },
];

const queries = [
  {
    label: 'CREATE',
    value: 'create',
    role: 'Master',
  },
  {
    label: 'UPDATE',
    value: 'update',
    role: 'Master',
  },
  {
    label: 'SHOW',
    value: 'show',
    role: 'Master',
  },
  {
    label: 'DELETE',
    value: 'del',
    role: 'Master',
  },
];

const header1 = [
  'S.No.',
  'CustomerID',
  'CustomerName',
  'CompanyName',
  'JobTitle',
  'Address',
  'Country',
  'Phone',
];

const header2 = [
  'S.No',
  'OrderID',
  'CustID',
  'ProductID(s)',
  'ProductQuant(s)',
  'GrossPrice',
  'ShippingName',
  'OrderDate',
  'ShippingDate',
];

const cdata = [];
const odata = [];

const Main = () => {
  const { session, setSession } = useSession();
  const [global, setGlobal] = useState([]);
  const [header, setHeader] = useState([]);

  const toaster = useToaster();

  const transformData = (v) => {
    if (v === 'customers') {
      customers.forEach((val, index) => {
        const arr = [
          index,
          val.customerID,
          val.contactName,
          val.companyName,
          val.contactTitle,
          val.address.street + '-' + val.address.city,
          val.address.country,
          val.address.phone,
        ];
        cdata.push(arr);
      });

      setGlobal(cdata);
      setHeader(header1);
    } else if (v === 'orders') {
      orders.forEach((val, index) => {
        const ids = [];
        const unitPrice = [];
        let quantity = [];

        let price = 0;

        val.details.forEach((v) => {
          ids.push(v.productID);
          unitPrice.push(v.unitPrice);
          quantity.push(v.quantity);

          price += v.unitPrice * v.quantity;
        });

        for (let i = 0; i < unitPrice.length; i++) {}

        const arr = [
          index,
          val.orderID,
          val.customerID,
          ids.toString(),
          quantity.toString(),
          price.toFixed(2),
          val.shipName,
          val.orderDate,
          val.shippedDate,
        ];

        odata.push(arr);
      });

      setGlobal(odata);
      setHeader(header2);
    } else {
      setGlobal([]);
      setHeader([]);
    }
  };

  const Message = (msg) => {
    toaster.push(
      <Notification type="info" header="Success">
        {msg}
      </Notification>
    );
  };

  const handleCreate = () => {
    setGlobal(global.slice(0, 30));
    Message('Table after some insertions!');
  };

  const handleRead = () => {
    setGlobal(global.slice(35, 50));
    Message('Table with some filtered rows!');
  };

  const handleUpdate = () => {
    setGlobal(global.slice(3, 7));
    Message('Table with updates values!');
  };

  const handleDelete = () => {
    setGlobal(global.slice(1, 6));
    Message('Result-set after truncating some values!');
  };

  const handleQuerySelect = (v) => {
    switch (v) {
      case 'create':
        handleCreate();
        break;
      case 'show':
        handleRead();
        break;
      case 'update':
        handleUpdate();
        break;
      case 'del':
        handleDelete();
        break;
      default:
        transformData([]);
        break;
    }
  };

  if (session == null) {
    return <div style={{ backgroundColor: 'wheat' }}></div>;
  }

  return (
    <Container style={{ backgroundColor: '#9A7B4F', padding: '10px' }}>
      <Content style={{ textAlign: 'center' }}>
        <PanelGroup>
          <Panel bordered style={{ backgroundColor: 'white' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '10px',
              }}
            >
              <Stack
                divider={<Divider vertical />}
                style={{ overflow: 'hidden' }}
              >
                <Whisper
                  placement="bottom"
                  trigger="click"
                  speaker={
                    <Popover title={session.id}>
                      <p>
                        <b>User Name : </b>
                        {session.name}
                      </p>
                      <p>
                        <b>Created On : </b>
                        {session.createdAt}
                      </p>
                    </Popover>
                  }
                >
                  <Button color="blue" appearance="primary">
                    Show Session
                  </Button>
                </Whisper>
                <Button
                  color="red"
                  appearance="primary"
                  onClick={() => {
                    setSession(null);
                    setGlobal([]);

                    localStorage.removeItem('session');
                  }}
                >
                  Clear session
                </Button>
              </Stack>
            </div>
            <table align="center" style={{ padding: '5px', fontSize: '16px' }}>
              <tbody>
                <tr>
                  <td style={cellStyle}>Dataset to display</td>
                  <td></td>
                  <td>
                    <SelectPicker
                      searchable={false}
                      data={items}
                      size="sm"
                      style={{ width: 180 }}
                      onSelect={(v) => {
                        transformData(v);
                      }}
                      onChange={(v) => {
                        if (v === null) {
                          setGlobal([]);
                        }
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={cellStyle}>Queries to work</td>
                  <td></td>
                  <td>
                    <SelectPicker
                      disabled={global.length === 0 ? true : false}
                      searchable={false}
                      size="sm"
                      style={{ width: 180 }}
                      data={queries}
                      id="picker"
                      onSelect={(v) => {
                        handleQuerySelect(v);
                      }}
                      onChange={(v) => {
                        if (v == null) {
                          setGlobal();
                        }
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Panel>
          <Panel
            style={{
              backgroundColor: 'white',
              marginTop: '5px',
            }}
          >
            <Panel
              shaded
              style={{
                height: '75vh',
                overflow: 'auto',
                backgroundColor: 'wheat',
              }}
            >
              <div className="display-table">
                {global.length === 0 ? (
                  <span style={{ fontSize: '20px', fontStyle: 'oblique' }}>
                    Select a dataset to begin...
                  </span>
                ) : (
                  <table border={1} align="center" style={{ color: 'black' }}>
                    <thead>
                      <tr>
                        {header.map((value, index) => {
                          return (
                            <td key={index} style={{ fontStyle: 'oblique' }}>
                              <b>{value}</b>
                            </td>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {global.map((val, index) => {
                        return (
                          <tr key={index}>
                            {val.map((v, idx) => {
                              return <td key={idx}>{v}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </Panel>
          </Panel>
        </PanelGroup>
      </Content>
    </Container>
  );
};

export default Main;
