"use client";
import Link from "next/link";
import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathName = usePathname();
  return (
    <Navbar
      data-bs-theme="dark"
      bg="primary"
      sticky="top"
      variant="dark"
      collapseOnSelect
      expand="sm"
    >
      <Container>
        <Navbar.Brand as={Link} href="/">
          Nextjs Image Gallery
        </Navbar.Brand>
        {/* <Navbar.Brand href="/">
          <Link href="/">Kums's</Link>
        </Navbar.Brand> */}
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar" className=" justify-content-end">
          <Nav>
            <Nav.Link as={Link} href="/static" active={pathName === "/static"}>
              Static
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/dynamic"
              active={pathName === "/dynamic"}
            >
              Dynamic
            </Nav.Link>
            <Nav.Link as={Link} href="/isr" active={pathName === "/isr"}>
              Isr
            </Nav.Link>
            <NavDropdown title="Topics" id="topics-dropdown">
              <NavDropdown.Item as={Link} href="/topics/health">
                Health
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/topics/sports">
                Sports
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/topics/coding">
                Coading
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
