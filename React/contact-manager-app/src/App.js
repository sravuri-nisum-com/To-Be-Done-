import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import ContactListPage from "./pages/contactList.page";
import ContactFormPage from "./pages/contactForm.page";


class App extends Component {
  render() {
    return (
      <Container>
        <header className="bs-header">
          <div className="container">
            <h1>Contact Manager</h1>
            <p>Simple React+Redux application</p>
          </div>
        </header>
        <h3></h3>
        <NavLink className="page-header text-center" activeClassName="active" exact to="/">
          <h1>Contacts List</h1>
        </NavLink>
         <h3></h3>
        <NavLink  activeClassName="active" exact to="/contacts/new">
          <p className="text-center">
            <a className="btn btn-lg btn-outline">
              Add Contact
            </a>
          </p>
        </NavLink>

        <Route exact path="/" component={ContactListPage} />
        <Route path="/contacts/new" component={ContactFormPage} />
        <Route path="/contacts/edit/:_id" component={ContactFormPage} />
      </Container>
    );
   
  }
}

export default App;
