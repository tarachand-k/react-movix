import React from "react";
import styled from "styled-components";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation, NavLink } from "react-router-dom";

import ContentWrapper from "../content-wrapper";
import { QUERIES } from "../../constants";

const Header = () => {
  const [showNav, setShowNav] = React.useState("top");
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [isSearchBarOpen, setIsSearchBarOpen] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenu(false);
    setIsSearchBarOpen(false);
    setQuery("");
  }, [location]);

  const controlNavbar = React.useCallback(() => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShowNav("hide");
      } else {
        setShowNav("show");
      }
    } else {
      setShowNav("top");
    }

    setLastScrollY(window.scrollY);
  });

  React.useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setMobileMenu((curr) => !curr);
    setIsSearchBarOpen(false);
  };

  const toggleSearchBar = () => {
    setIsSearchBarOpen((curr) => !curr);
    setMobileMenu(false);
  };

  const handleSumbit = (event) => {
    event.preventDefault();
    if (!(query.length > 3)) return;
    navigate(`/search/${query}`);
    setIsSearchBarOpen(false);
    setQuery("");
  };

  return (
    <Wrapper className={`${mobileMenu ? "mobileView" : ""} ${showNav}`}>
      <HeaderContent>
        <Logo>
          <NavLink to="/">
            <Img src="/movix-logo.svg" alt="logo" />
          </NavLink>
        </Logo>

        <DesktopMenu>
          <MenuItems>
            <MenuItem>
              <MenuLink to="/explore/movie">Movies</MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/explore/tv">TV Shows</MenuLink>
            </MenuItem>
            <MenuItem className="searchIcon">
              <HiOutlineSearch onClick={toggleSearchBar} />
            </MenuItem>
          </MenuItems>
        </DesktopMenu>

        <MobileMenu>
          <HiOutlineSearch onClick={toggleSearchBar} />
          {mobileMenu ? (
            <VscChromeClose onClick={toggleMobileMenu} />
          ) : (
            <SlMenu onClick={toggleMobileMenu} />
          )}
        </MobileMenu>
      </HeaderContent>
      {isSearchBarOpen && (
        <SearchBar>
          <ContentWrapper>
            <SearchWrapper onSubmit={handleSumbit}>
              <SearchInput
                type="text"
                placeholder="Search for a movie or tv show..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />

              <VscChromeClose onClick={toggleSearchBar} />
            </SearchWrapper>
          </ContentWrapper>
        </SearchBar>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.header`
  position: fixed;
  width: 100%;
  height: 60px;
  z-index: 2;
  display: flex;
  align-items: center;

  transform: translateY(0);
  transition: all ease 0.5s;

  &.top {
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(3.5px);
    -webkit-backdrop-filter: blur(3.5px);
  }
  &.show {
    background-color: var(--black3);
    backdrop-filter: blur(3.5px);
  }
  &.hide {
    transform: translateY(-80px);
  }

  &.mobileView {
    background-color: var(--black3);
  }
`;

const HeaderContent = styled(ContentWrapper)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  cursor: pointer;
`;

const Img = styled.img`
  height: 50px;
`;

const DesktopMenu = styled.nav``;

const MobileMenu = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;

  svg {
    font-size: ${18 / 16}rem;
    color: white;
    cursor: pointer;
  }

  @media ${QUERIES.tabletAndLarge} {
    display: none;
  }
`;

const MenuItems = styled.ul`
  list-style-type: none;
  display: none;
  align-items: center;

  .mobileView & {
    display: flex;
    flex-direction: column;

    position: absolute;
    top: 60px;
    left: 0;
    background-color: var(--black3);
    width: 100%;
    padding: 20px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    animation: mobileMenu 0.3s ease forwards;
  }

  @media ${QUERIES.tabletAndLarge} {
    display: flex;
  }
`;

const MenuItem = styled.li`
  height: 80px;
  display: flex;
  align-items: center;
  margin: 0 15px;
  color: white;
  font-weight: 500;
  position: relative;

  &.searchIcon {
    margin-right: 0;
  }

  svg {
    font-size: ${18 / 16}rem;
  }

  .mobileView & {
    font-size: ${20 / 16}rem;
    width: 100%;
    height: auto;
    padding: 15px 20px;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    &:last-child {
      display: none;
    }
  }
`;

const MenuLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: var(--pink);
  }

  &.active {
    color: var(--pink);
  }
`;

const SearchBar = styled.div`
  width: 100%;
  height: 60px;
  /* background-color: var(--black); */

  /* background-color: white; */
  position: absolute;
  top: 60px;
  animation: mobileMenu 0.3s ease forwards;
`;

const SearchWrapper = styled.form`
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 40px;
  margin-top: 10px;

  svg {
    font-size: ${20 / 16}rem;
    flex-shrink: 0;
    margin-left: 10px;
    cursor: pointer;
    position: absolute;
    right: 15px;

    @media ${QUERIES.tabletAndLarge} {
      right: 30px;
    }
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 50px;
  background-color: white;
  outline: 0;
  border: 0;
  /* border-radius: 30px; */
  padding: 0 15px;
  font-size: ${14 / 16}rem;

  @media ${QUERIES.tabletAndLarge} {
    height: 60px;
    font-size: ${20 / 16}rem;
    padding: 0 30px;
  }
`;

export default Header;
