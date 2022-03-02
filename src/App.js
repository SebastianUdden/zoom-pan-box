import styled from "styled-components";
import "./App.css";
import JavascriptZoom from "./components/JavascriptZoom";

const Area = styled.div`
  box-sizing: border-box;
  position: absolute;
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: #444;
  padding: 20px;
`;
const Rectangle = styled.div`
  background-color: navajowhite;
  margin-left: 50px;
  margin-top: 20px;
  height: 150px;
  width: 250px;
  position: relative;
`;
const Circle = styled.div`
  height: 200px;
  width: 200px;
  background-color: navajowhite;
  border-radius: 50%;
  display: inline-block;
  position: relative;
`;
const TextArea = styled.div`
  float: right;
  position: relative;
  user-select: none;
`;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <JavascriptZoom>
          <Area>
            <Rectangle />
            <Circle />
            <TextArea>
              <p>This is a zoomable box</p>
            </TextArea>
          </Area>
        </JavascriptZoom>
      </header>
    </div>
  );
}

export default App;
