import { useCallback, useMemo, useRef } from "react";
import { animated, useSpring, to } from "react-spring";
import { keyframes, styled } from "@stitches/react";
// import { useControls } from "leva";

interface MouseFollowingProps {
  children: React.ReactNode;
  cursorTransitionTime?: number;
  borderPadding?: number;
  titleTracingPx?: number;
  titleTracingPy?: number;
}

const MouseFollowing = ({
  children,
  cursorTransitionTime = 0.1,
  borderPadding = 50,
  titleTracingPx = 150,
  titleTracingPy = 100,
}: MouseFollowingProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const Border = useMemo(
    () =>
      styled("div", {
        padding: `${borderPadding}px`,
        // border: "1px solid #000",
      }),
    []
  );

  // leva controls
  // const { color, movingSpeed } = useControls({
  //   color: "#ffffff",
  //   movingSpeed: {
  //     value: 0.1,
  //     min: 0.01,
  //     max: 0.2,
  //     step: 0.01,
  //     label: "transition",
  //   },
  // });

  // spring api
  const [props, api] = useSpring(() => {
    return {
      x: 0,
      y: 0,
      titlex: 0,
      titley: 0,
      config: { mass: 10, tension: 550, friction: 140 },
    };
  });

  // calculate bound and return
  const move = useCallback(
    ({ clientX, clientY }: React.MouseEvent) => {
      if (!ref.current) return;
      let borderTop = ref.current.offsetTop;
      let borderRight = ref.current.offsetLeft + ref.current.offsetWidth;
      let borderBottom = ref.current.offsetTop + ref.current.offsetHeight;
      let borderLeft = ref.current.offsetLeft;

      let returnX: number;
      let returnY: number;

      if (clientX < borderLeft) {
        returnX = borderLeft;
      } else if (clientX < borderRight) {
        returnX = clientX;
      } else {
        returnX = borderRight;
      }

      if (clientY < borderTop) {
        returnY = borderTop;
      } else if (clientY < borderBottom) {
        returnY = clientY;
      } else {
        returnY = borderBottom;
      }

      const normalizeX =
        (returnX - borderRight) / (borderRight - borderLeft) + 0.5;
      const normalizeY =
        (returnY - borderBottom) / (borderBottom - borderTop) + 0.5;

      // change spring values
      api.start({
        x: returnX,
        y: returnY,
        titlex: normalizeX * titleTracingPx,
        titley: normalizeY * titleTracingPy,
      });
    },
    [titleTracingPx, titleTracingPy]
  );

  return (
    <Border ref={ref} onMouseMove={move}>
      <Title
        style={{
          transform: to(
            [props.titlex, props.titley],
            (titlex, titley) => `translate3d(${titlex}px, ${titley}px, 0)`
          ),
        }}
      >
        {children}
      </Title>
      <Cursor
        style={{
          top: props.y.to((value) => `${value}px`),
          left: props.x.to((value) => `${value}px`),
          transition: `${cursorTransitionTime}s`,
        }}
      />
    </Border>
  );
};

export default MouseFollowing;

// change design
const Cursor = styled(animated.div, {
  position: "absolute",
  width: "20px",
  height: "20px",
  border: "2px solid #000",
  boxSizing: "border-box",
  transform: "translate(-50%, -50%)",
  borderRadius: "9999px",
  pointerEvents: "none",
  transition: "0.1s",
});

const spin = keyframes({
  "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
  "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
});

const Title = styled(animated.div, {
  // when hover change cursor style
  [`&:hover ~ ${Cursor}`]: {
    width: "100px",
    height: "100px",
    border: "2px dashed #000",
    animation: `${spin} 5s linear infinite`,
    borderImage: `linear-gradient(
        90deg,
        rgba(255, 0, 0, 1) 0%,
        rgba(255, 154, 0, 1) 10%,
        rgba(208, 222, 33, 1) 20%,
        rgba(79, 220, 74, 1) 30%,
        rgba(63, 218, 216, 1) 40%,
        rgba(47, 201, 226, 1) 50%,
        rgba(28, 127, 238, 1) 60%,
        rgba(95, 21, 242, 1) 70%,
        rgba(186, 12, 248, 1) 80%,
        rgba(251, 7, 217, 1) 90%,
        rgba(255, 0, 0, 1) 100%
    ) 1`,
  },
});
