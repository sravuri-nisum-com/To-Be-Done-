import React from "react";
// import PropTypes from "prop-types";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Card, Button, Icon } from "semantic-ui-react";

export default function ContactCard({ contact, deleteContact }) {
  return <Card>
      <Card.Content>
        <Card.Header>
          <Icon name="user outline" />
          {contact.name.first} {contact.name.last}
        </Card.Header>
        <Card.Description>
          <p>
            <Icon name="phone" />
            {contact.phone}
          </p>
          <p>
            <Icon name="mail outline" />
            {contact.email}
          </p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Link to={`/contacts/edit/${contact._id}`} className="ui basic button green">
            Edit
          </Link>
          <Button basic color="red" onClick={() => deleteContact(contact._id)}>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>;
}
// eslint-disable-next-line
ContactCard.propTypes={
    contact:PropTypes.object.isRequired
};
// ContactCard.propTypes = {
//   contact: React.PropTypes.object.isRequired
// };
// export default ContactCard;
