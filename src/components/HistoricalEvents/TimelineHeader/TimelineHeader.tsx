import { useContext } from "react";
import styled from "styled-components";
import { ScreenContext } from "../Context/ScreenContext";

type TypeStyledTimelineHeader = {
  $screenWidth: number;
};

const StyledTimelineHeader = styled.div<TypeStyledTimelineHeader>`
  position: ${({ $screenWidth }: TypeStyledTimelineHeader) => ($screenWidth > 320 ? 'absolute' : 'static')};
  display: ${({ $screenWidth }: TypeStyledTimelineHeader) => ($screenWidth > 320 ? 'flex' : '')};
  gap: ${({ $screenWidth }: TypeStyledTimelineHeader) => ($screenWidth > 320 ? '78px' : '')};
  align-items: ${({ $screenWidth }: TypeStyledTimelineHeader) => ($screenWidth > 320 ? 'center' : '')};
  align-self: start;
  margin: ${({ $screenWidth }: TypeStyledTimelineHeader) => ($screenWidth > 320 ? '177px 0 0 0' : '59px 0 56px 20px')};

`;

const StyledHeaderGradient = styled.div`
  height: 120px;
  width: 5px;
  background: linear-gradient(
    var(--gradient-first),
    var(--gradient-second)
  );
`
type TypeStyledHeaderText = {
  $screenWidth: number;
};

const StyledHeaderText = styled.header<TypeStyledHeaderText>`
  font-size: ${({ $screenWidth }: TypeStyledHeaderText) => ($screenWidth > 320 ? '56px' : '20px')};
  font-weight: 700;
  line-height: ${({ $screenWidth }: TypeStyledHeaderText) => ($screenWidth > 320 ? '67.2px' : '24px')};
  color: var(--contrastText);
`;

export default function TimelineHeader() {
  const screenWidth = useContext(ScreenContext);

  return (
    <StyledTimelineHeader $screenWidth={screenWidth}>
      {screenWidth > 320 ? <StyledHeaderGradient /> : null}
      <StyledHeaderText $screenWidth={screenWidth}>Исторические<br/> даты</StyledHeaderText>
    </StyledTimelineHeader>
    
  )
}
