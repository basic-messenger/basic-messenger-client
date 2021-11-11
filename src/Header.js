import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import Navbar from "react-bootstrap/Navbar";
// import LoginButton from "./LoginButton";
// import LogoutButton from "./LogoutButton";
// import { Link } from "react-router-dom";

// import { withAuth0 } from "@auth0/auth0-react";

import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>Basic Messenger</h1>
      </header>
    );
  }
}

export default Header;

// Try if Auth0 work
// class Header extends React.Component {
// render() {
//   const { isAuthenticated, isLoading } = this.props.auth0;

//   if (isLoading) {
//     return <div>Loading ...</div>;
//   }
//   return (
//     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//       <Navbar.Brand>My Favorite Books</Navbar.Brand>
//       <Link to="/">Home</Link>
//       <Link to="/profile">Profile</Link>
//       {/* DONE: if the user is logged in, render the `LogoutButton` - if the user is logged out, render the `LoginButton` */}
//       {isAuthenticated ?
//         <LogoutButton /> :
//         <LoginButton
//         />}
//     </Navbar>
//   );
// }
// }

// export default withAuth0(Header);
