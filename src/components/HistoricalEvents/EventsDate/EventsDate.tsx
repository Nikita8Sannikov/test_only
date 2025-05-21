import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ScreenContext } from "../Context/ScreenContext";

type TypeStyledEventsDate = {
  $screenWidth: number;
};

const StyledEventsDate = styled.div<TypeStyledEventsDate>`
  position: ${({$screenWidth}: TypeStyledEventsDate) => ($screenWidth > 320 ? 'absolute' : 'static')};
  ${({$screenWidth}: TypeStyledEventsDate) => ($screenWidth > 320 ? 'top: 480px;' : '')}
  ${({$screenWidth}: TypeStyledEventsDate) => ($screenWidth > 320 ? 'left: 50%;' : '')}
  display: flex;
  ${({$screenWidth}: TypeStyledEventsDate) => ($screenWidth > 320 ? 'transform: translate(-50%, -50%);' : '')}
  gap: ${({$screenWidth}: TypeStyledEventsDate) => ($screenWidth > 320 ? '70px' : '30px')};
`;

type TypeStyledDate = {
  $position: "start" | "end";
  $screenWidth: number;
};

const StyledDate = styled.div<TypeStyledDate>`
  font-size: ${({$screenWidth}: TypeStyledDate) => ($screenWidth > 320 ? '200px' : '56px')};
  font-weight: 700;
  line-height: ${({$screenWidth}: TypeStyledDate) => ($screenWidth > 320 ? '160px' : '72.46px')};
  letter-spacing: -.5px;
  color: var(
  ${({$position}: TypeStyledDate) => ($position === "start" ? "--date-start" : "--date-end" )}
  );
`;

type TypeEventsDate = {
  dateStartEvents: number;
  dateEndEvents: number;
};

export default function EventsDate({dateStartEvents, dateEndEvents}: Readonly<TypeEventsDate>) {
  const screenWidth = useContext(ScreenContext);
  const [dateStart, setDateStart] = useState<number>(dateStartEvents);
  const [dateEnd, setDateEnd] = useState<number>(dateEndEvents);

  useEffect(() => {

    let timeRef: NodeJS.Timeout | null = null;

    const updateValue = () => {

        if (dateStartEvents > dateStart) {
        setTimeout(() => setDateStart((prev) => prev + 1), 16);
      }
      else if(dateStartEvents < dateStart) {
        setTimeout(() => setDateStart((prev) => prev - 1), 16);
      }


      if (dateEndEvents > dateEnd) {
        setTimeout(() => setDateEnd((prev) => prev + 1), 16);
      }
      else if(dateEndEvents < dateEnd) {
        setTimeout(() => setDateEnd((prev) => prev - 1), 16);
      }
     
      if (timeRef) {
        clearTimeout(timeRef);
      }
    }

    updateValue();

    return () => {
      if (timeRef) clearTimeout(timeRef);
    }
  },[dateStartEvents, dateEndEvents, dateStart, dateEnd])

  return (
    <StyledEventsDate $screenWidth={screenWidth}>
          <StyledDate $screenWidth={screenWidth} $position={"start"} className="start_date" >{dateStart}</StyledDate>
          <StyledDate $screenWidth={screenWidth} $position={"end"} className="end_date">{dateEnd}</StyledDate>
    </StyledEventsDate>
  )
}
