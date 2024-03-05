import React from "react";
import styled from "styled-components";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../content-wrapper";
import { QUERIES } from "../../constants";

const Footer = () => {
  return (
    <Wrapper>
      <FooterContent>
        <Menu>
          <MenuItems>
            <MenuItem>Terms of Use</MenuItem>
            <MenuItem>Privacy-Policy</MenuItem>
            <MenuItem>About</MenuItem>
            <MenuItem>Blog</MenuItem>
            <MenuItem>FAQ</MenuItem>
          </MenuItems>
        </Menu>
        <Info>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </Info>

        <SocialIcons>
          <Icon>
            <FaFacebookF />
          </Icon>
          <Icon>
            <FaInstagram />
          </Icon>
          <Icon>
            <FaTwitter />
          </Icon>
          <Icon>
            <FaLinkedin />
          </Icon>
        </SocialIcons>
      </FooterContent>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  background-color: var(--black3);
  padding: 50px 0;
  color: white;
  position: relative;

  @media ${QUERIES.tabletAndLarge} {
    margin-top: 140px;
  }
`;

const FooterContent = styled(ContentWrapper)`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Menu = styled.nav``;

const MenuItems = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;

  @media ${QUERIES.tabletAndLarge} {
    margin-bottom: 30px;
    gap: 30px;
  }
`;

const MenuItem = styled.li`
  transition: all ease 0.3s;
  cursor: pointer;
  font-size: ${12 / 16}rem;

  &:hover {
    color: var(--pink);
  }

  @media ${QUERIES.tabletAndLarge} {
    font-size: 1rem;
  }
`;

const Info = styled.div`
  font-size: ${12 / 16}rem;
  line-height: 20px;
  opacity: 0.5;
  text-align: center;
  max-width: 800px;
  margin-bottom: 20px;

  @media ${QUERIES.tabletAndLarge} {
    font-size: ${14 / 16}rem;
    margin-bottom: 30px;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Icon = styled.span`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ease 0.3s;
  &:hover {
    box-shadow: 0 0 0 0.625em var(--pink);
    color: var(--pink);
  }
`;

export default Footer;
