import React from "react";
import { Card, Image, Button, Table } from "semantic-ui-react";
import gravatarURL from "gravatar-url";
import { useStore } from "../../store/useStore";

const StaffCard = props => {
  const { state } = useStore();
  console.log(props.data);
  const {
    email_address,
    first_name,
    last_name,
    role_name,
    confirmed,
    dil_length
  } = props.data;

  const isAdmin = state.user.admin;

  return (
    <Card>
      <Card.Content>
        <Image
          avatar
          floated="right"
          size="large"
          src={gravatarURL(email_address)}
        />
        <Card.Header>{`${first_name} ${last_name}`}</Card.Header>
        <Card.Description>{role_name}</Card.Description>
      </Card.Content>

      <Card.Content extra>
        <div>
          <Table definition>
            <Table.Body>
              <Table.Row>
                <Table.Cell>DIL Length</Table.Cell>
                <Table.Cell>{dil_length}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        <br />
        <div className="ui two buttons">
          {isAdmin ? (
            confirmed === 1 ? (
              <React.Fragment>
                <Button color="green">Confirmed</Button>
                <Button color="red">Edit</Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Button basic color="green">
                  Confirm
                </Button>
                <Button color="red">Edit</Button>
              </React.Fragment>
            )
          ) : (
            ""
          )}
        </div>
      </Card.Content>
    </Card>
  );
};

export default StaffCard;
