import React from "react";

import Nav from "./Nav";

// the header
export default function Header( { instance } ) {
  return (
    <header>
      <Nav instance= {instance} />
    </header>
  );
}
