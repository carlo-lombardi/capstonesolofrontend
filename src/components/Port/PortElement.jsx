import styled from "styled-components";
import Bgimage from "../../assest/portada2.jpeg";

export const PortContainer = styled.div`
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)),
    url(${Bgimage});
  height: 100vh;
  background-position: center;
  background-size: cover;
`;

export const PortContent = styled.div`
  height: calc(100vh -80px);
  max-height: 100%;
  width: 100vw;
  padding: 0rem calc((100vw - 1300px) / 2);
`;

export const PortItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  max-height: 100%;
  padding: 0 2rem;
  width: 650px;
  color: white;
  text-transform: uppercase;
  line-height: 1;
  font-weight: bold;

  @media screen and (max-width: 650px) {
    width: 100%;
  }
`;

export const PortTitle = styled.h1`
  font-size: clamp(2.5rem, 10vw, 5rem);
  margin-bottom: 2rem;
  box-shadow: 3px 5px red;
  letter-spacing: 3px;
`;
export const PortAboutUs = styled.div`
  font-size: clamp(2rem, 2.5vw, 3rem);
  margin-bottom: 2rem;
`;

export const PortButton = styled.a`
  font-size: 1.4rem;
  padding: 1rem 4rem;
  border: solid white 1px;
  background: transparent;
  color: white;
  transition: 0.2s ease-out;

  &:hover {
    transition: 0ms.1s ease-out;
    border: solid #c6c6c6 1px;
    cursor: pointer;
    color: #c6c6c6;
  }
`;
