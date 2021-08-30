import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

export const Nav = styled.nav`
  background: transparent;
  display: flex;
  justify-content: center;
  font-weight: 700;
`;
export const NavLink = styled(Link)`
  color: white;
  font-size: 2rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;

  @media screen and (max-width: 400px) {
    position: absolute;
    top: 10px;
    left: 25px;
  }
`;
export const NavIcon = styled.div`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  color: white;

  p {
    color: #e54b4b;
    transform: translate(-130%, 160%);
    font-weight: bold;
  }
`;

export const Bars = styled(IoMenu)`
  color: #e54b4b;
  font-size: 2rem;
  transform: translate(-45%, -10%);
`;
