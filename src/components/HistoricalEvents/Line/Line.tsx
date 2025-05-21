import { useContext } from "react";
import styled from "styled-components";
import { ScreenContext } from "../Context/ScreenContext";

type TypeStyledLine = {
  rotate?: number;
  $screenWidth: number;
}

export const StyledLine = styled.div<TypeStyledLine>`
  position: absolute;
  top: ${({$screenWidth}: TypeStyledLine) => ($screenWidth > 320 ? '480px' : '280px')};
  width: 100%;
  height: 1px;
  background-color: var(--border-opacity);
  opacity: 100%;
  transform: rotate(${({rotate}: TypeStyledLine) => rotate || 0}deg);
`;

type TypeLine = {
  rotate?: number;
}

export default function Line({rotate = 0}: Readonly<TypeLine>) {
  const screenWidth = useContext(ScreenContext);

  return (
    <StyledLine rotate={rotate} $screenWidth={screenWidth} />
  )
}
