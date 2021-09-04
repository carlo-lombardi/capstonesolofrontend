import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

export const Nav = styled.nav`
  background: transparent;
  display: flex;
  justify-content: center;
  font-weight: 700;
  height: 80px;
  z-index: 999;
  border-bottom: 1px solid #fff;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5),
    rgba(102, 102, 102, 0)
  );
  & {
    @media screen and (max-height: 600px) {
      top: -160px;
    }
  }
`;
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 100px;
`;
export const NavLink = styled(Link)`
  color: #fff;
  font-size: 1.5rem;
  align-self: center;
  text-decoration: none;
  cursor: pointer;
  flex: 1;
`;
export const NavLogin = styled.div`
  cursor: pointer;
  color: white;
  align-self: center;
`;
export const NavIcon = styled.div`
  align-self: center;
  cursor: pointer;
  color: white;
  padding-left: 30px;

  p {
    color: #e54b4b;
    transform: translate(-130%, 160%);
    font-weight: bold;
  }
`;
export const Burger = styled(IoMenu)`
  //color: #e54b4b;
  color: #fff;
  font-size: 2rem;
  transform: translate(-45%, -10%);
`;
