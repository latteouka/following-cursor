import { styled } from "@stitches/react";
import MouseFollowing from "./MouseFollowing";

const Cursor = () => {
  return (
    <Container>
      <MouseFollowing
        cursorTransitionTime={0.05}
        borderPadding={200}
        titleTracingPx={200}
        titleTracingPy={100}
      >
        <div style={{ fontSize: "100px" }}>Follow the cursor</div>
      </MouseFollowing>
    </Container>
  );
};

export default Cursor;

const Container = styled("div", {
  width: "100vw",
  margin: 0,
  padding: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#ffffff",
  fontFamily: "sans-serif",
});
