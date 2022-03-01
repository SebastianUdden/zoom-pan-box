import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  z-index: 1;
  right: 10px;
  top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Button = styled.button`
  border: none;
  border-radius: 50%;
  background-color: #000;
  color: #fff;
  height: 30px;
  width: 30px;
  font-weight: 800;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  transition: all 150ms ease;
  :hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    background-color: #fff;
    color: #000;
  }
  :active {
    opacity: 0.5;
  }
`;

const Tip = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000;
  padding: 10px 0;
  border-radius: 6px;
  text-align: left;
  width: 0;
  overflow: hidden;
  transition: width 300ms ease;
  ${(p) =>
    p.show &&
    `
    padding: 10px 15px;
    width: 200px;
  `}
`;

const Line = styled.p`
  margin: 0;
  font-size: 14px;
  display: flex;
`;

const Label = styled.strong``;

const Value = styled.span`
  width: 70%;
  margin-left: auto;
  white-space: nowrap;
`;

const Close = styled.span`
  font-size: 18px;
`;

const Tooltip = ({ onToggle }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const handleToggle = () => {
    onToggle();
    setShowTooltip(!showTooltip);
  };
  return (
    <Wrapper>
      <Button onClick={handleToggle}>
        {showTooltip ? <Close>&times;</Close> : "?"}
      </Button>
      <Tip show={showTooltip}>
        <Line>
          <Label>Zoom:</Label>
          <Value>Ctrl + mousewheel</Value>
        </Line>
        <Line>
          <Label>Pan:</Label>
          <Value>Shift + move mouse</Value>
        </Line>
        <Line>
          <Label>Reset:</Label>
          <Value>Doubleclick mouse</Value>
        </Line>
      </Tip>
    </Wrapper>
  );
};

export default Tooltip;
