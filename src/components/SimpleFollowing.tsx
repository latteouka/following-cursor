import { useCallback, useRef } from "react";
import { animated, useSpring, to } from "react-spring";
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
  titleTracingPx = 150,
  titleTracingPy = 100,
}: MouseFollowingProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // spring api
  const [props, api] = useSpring(() => {
    return {
      titlex: 0,
      titley: 0,
      config: { mass: 10, tension: 550, friction: 140 },
    };
  });

  // calculate bound and return
  const move = useCallback(
    ({ clientX, clientY }: React.MouseEvent) => {
      if (!ref.current) return;
      // the real position
      const { x, y } = ref.current.getBoundingClientRect();
      // relative values
      let borderTop = ref.current.offsetTop;
      let borderRight = ref.current.offsetLeft + ref.current.offsetWidth;
      let borderBottom = ref.current.offsetTop + ref.current.offsetHeight;
      let borderLeft = ref.current.offsetLeft;

      // from -0,5 to 0.5
      let normalizeX = (clientX - x) / (borderRight - borderLeft) - 0.5;
      let normalizeY = (clientY - y) / (borderBottom - borderTop) - 0.5;

      // change spring values
      api.start({
        titlex: normalizeX * titleTracingPx,
        titley: normalizeY * titleTracingPy,
      });
    },
    [titleTracingPx, titleTracingPy]
  );

  const out = () => {
    api.start({
      titlex: 0,
      titley: 0,
    });
  };

  return (
    <animated.div
      ref={ref}
      onMouseMove={move}
      onMouseOut={out}
      style={{
        transform: to(
          [props.titlex, props.titley],
          (titlex, titley) => `translate3d(${titlex}px, ${titley}px, 0)`
        ),
      }}
    >
      {children}
    </animated.div>
  );
};

export default MouseFollowing;
