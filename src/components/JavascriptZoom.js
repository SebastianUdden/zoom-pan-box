import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";
import { renderer } from "./zoomRenderer";

const Wrapper = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;
const ReferenceContainer = styled.div`
  height: 80%;
  width: 100%;
  position: relative;
`;

const JavascriptZoom = ({ children }) => {
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
    <Wrapper>
      <Tooltip onToggle={() => setResetInstance(!resetInstance)} />
      <ReferenceContainer ref={ref}>{children}</ReferenceContainer>
    </Wrapper>
  );
};

export default JavascriptZoom;
