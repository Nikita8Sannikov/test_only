import { useContext, useState } from "react";
import styled from "styled-components";

import { historicalEventsData } from "@/lib/data";
import { HistoricalEventsArray } from "@/lib/types";
import Line from "./Line/Line";
import TimelineHeader from "./TimelineHeader/TimelineHeader";
import TimePeriodSelector from "./TimePeriodSelector/TimePeriodSelector";
import EventsDate from "./EventsDate/EventsDate";
import EventDetailsSlider from "./EventDetailsSlider/EventDetailsSlider";
import { ScreenContext } from "./Context/ScreenContext";

const StyledHistoricalEvents = styled.div`
  width: 100vw;
  max-width: 1440px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  overflow: hidden;
  border-left: 1px solid var(--border-opacity);
  border-right: 1px solid var(--border-opacity);
`;

export default function HistoricalEvents() {
  const screenWidth = useContext(ScreenContext);
  const sortByEvent = (array: HistoricalEventsArray): HistoricalEventsArray => {
    const newArray = [...array]
    return newArray.sort((a, b) => a.date - b.date)
  };

  const [activeEvents, setActiveEvents] = useState<number>(0);
  const [events, setEvents] = useState<HistoricalEventsArray>(sortByEvent(historicalEventsData[activeEvents]));
  
  const dateStartEvents: number = events[0].date;
  const dateEndEvents: number = events[events.length - 1].date;
  const angle = 360 / events.length;

  const [isAnimation, setIsAnimation] = useState(false);
  
  return (
    <StyledHistoricalEvents>
      <TimelineHeader />
      <EventsDate dateStartEvents={dateStartEvents} dateEndEvents={dateEndEvents} />
      {screenWidth > 320 ? <TimePeriodSelector
        eventsLength={events.length}
        isAnimation={isAnimation}
        setIsAnimation={setIsAnimation}
        activeEvents={activeEvents}
        setActiveEvents={setActiveEvents}
        setEvents={setEvents}
        sortByEvent={sortByEvent}
        angle={angle}
        /> : null}
      <EventDetailsSlider
        events={events}
        setEvents={setEvents}
        activeEvents={activeEvents}
        setActiveEvents={setActiveEvents}
        sortByEvent={sortByEvent}
        isAnimation={isAnimation}
        setIsAnimation={setIsAnimation}
        angle={angle}
        />
      <Line />
      {screenWidth > 320 ? <Line rotate={90} /> : null}
    </StyledHistoricalEvents>
  )
};