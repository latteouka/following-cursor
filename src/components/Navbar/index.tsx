import { styled } from "@stitches/react";
import SimpleFollowing from "../SimpleFollowing";

const Index = () => {
  return (
    <NavbarWrapper>
      <Logo>This a navbar</Logo>
      <NavbarBody>
        <SimpleFollowing titleTracingPx={30} titleTracingPy={30}>
          <NavbarItem>
            <NavbarContent>
              <NavbarTitlePrimary>Item1</NavbarTitlePrimary>
              <NavbarTitleSecondaryWrapper>
                <NavbarTitleSecondary>Subtitle</NavbarTitleSecondary>
              </NavbarTitleSecondaryWrapper>
            </NavbarContent>
          </NavbarItem>
        </SimpleFollowing>
        <SimpleFollowing titleTracingPx={30} titleTracingPy={30}>
          <NavbarItem>
            <NavbarContent>
              <NavbarTitlePrimary>Item2</NavbarTitlePrimary>
              <NavbarTitleSecondaryWrapper>
                <NavbarTitleSecondary>Subtitle</NavbarTitleSecondary>
              </NavbarTitleSecondaryWrapper>
            </NavbarContent>
          </NavbarItem>
        </SimpleFollowing>
        <SimpleFollowing titleTracingPx={30} titleTracingPy={30}>
          <NavbarItem>
            <NavbarContent>
              <NavbarTitlePrimary>Item3</NavbarTitlePrimary>
              <NavbarTitleSecondaryWrapper>
                <NavbarTitleSecondary>Subtitle</NavbarTitleSecondary>
              </NavbarTitleSecondaryWrapper>
            </NavbarContent>
          </NavbarItem>
        </SimpleFollowing>
      </NavbarBody>
    </NavbarWrapper>
  );
};
export default Index;

const NavbarWrapper = styled("div", {
  position: "fixed",
  width: "100%",
  top: 0,
  left: 0,
  height: 120,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Logo = styled("div", {
  padding: "30px",
});

const NavbarBody = styled("ul", {
  display: "flex",
  listStyle: "none",
  position: "relative",
  gap: "1rem",
  padding: "40px 20px",
  justifyContent: "space-between",
});

const NavbarTitleSecondary = styled("div", {
  transition: "all 0.7s",
  opacity: 0,
  transform: "translateY(-100%)",
});

const NavbarItem = styled("li", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px 30px",

  [`&:hover ${NavbarTitleSecondary}`]: {
    transform: "translateY(0%)",
    opacity: 1,
  },
});

const NavbarTitleSecondaryWrapper = styled("div", {
  position: "absolute",
  display: "flex",
  overflow: "hidden",
});

const NavbarContent = styled("div", {
  position: "relative",
  // overflow: "hidden",
});

const NavbarTitlePrimary = styled("div", {
  display: "flex",
  flexDirection: "column",
  textDecoration: "none",
});
