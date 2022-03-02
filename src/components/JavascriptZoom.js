import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";
import { renderer } from "./zoomRenderer";

const Wrapper = styled.div`
  width: ${(p) => p.width || "90vw"};
  height: ${(p) => p.height || "90vh"};
  background: ${(p) => p.background || "default"};
  box-shadow: ${(p) =>
    p.boxShadow ||
    "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)"};
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;
const ZoomPan = styled.div`
  width: ${(p) => p.width || "100%"};
  height: ${(p) => p.height || "100%"};
  background: ${(p) => p.background || "default"};
  box-shadow: ${(p) =>
    p.boxShadow ||
    "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)"};
  position: relative;
`;

const JavascriptZoom = ({ children, zoomPan, tooltip, ...props }) => {
  const ref = useRef(null);
  const [resetInstance, setResetInstance] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const handleMouseMove = (event) => {
      if (!event.shiftKey) {
        return;
      }
      event.preventDefault();
      instance.panBy({
        originX: event.movementX,
        originY: event.movementY,
      });
    };

    const handleDblClick = () => {
      instance.panTo({
        originX: 0,
        originY: 0,
        scale: 1,
      });
    };

    const handleWheel = (event) => {
      if (!event.ctrlKey) {
        return;
      }
      event.preventDefault();
      instance.zoom({
        deltaScale: Math.sign(event.deltaY) > 0 ? 1 : -1,
        x: event.pageX,
        y: event.pageY,
      });
    };

    document.body.style.overflow = "hidden";
    const container = ref.current;
    const instance = renderer({
      minScale: 0.1,
      maxScale: 30,
      element: container.children[0],
      scaleSensitivity: 50,
    });
    container.addEventListener("wheel", handleWheel);
    container.addEventListener("dblclick", handleDblClick);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("dblclick", handleDblClick);
      container.removeEventListener("mousemove", handleMouseMove);
      instance.panTo({
        originX: 0,
        originY: 0,
        scale: 1,
      });
    };
  }, [resetInstance]);

  return (
    <Wrapper {...props}>
      <Tooltip
        tooltip={tooltip}
        onToggle={() => setResetInstance(!resetInstance)}
      />
      <ZoomPan ref={ref} {...zoomPan}>
        {children}
      </ZoomPan>
    </Wrapper>
  );
};

export default JavascriptZoom;
