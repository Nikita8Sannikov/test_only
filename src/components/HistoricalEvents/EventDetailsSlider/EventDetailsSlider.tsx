import { useContext, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import gsap from 'gsap';
import styled from "styled-components";
import { Swiper as TypeSwiper } from 'swiper/types';
import { Navigation, Pagination } from 'swiper/modules';

import { HistoricalEventsArray } from "@/lib/types";
import { historicalEventsData } from '@/lib/data';
import { ScreenContext } from '../Context/ScreenContext';
import Arrow from '@/assets/arrow_right.svg'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

type TypeStyledCardHeader = {
  $screenWidth: number;
};

const StyledCardHeader = styled.header<TypeStyledCardHeader>`
  font-family: "Bebas Neue";
  font-size: ${({$screenWidth}: TypeStyledCardHeader) => ($screenWidth > 320 ? '25px' : '16px')};
  font-weight: 400;
  line-height: ${({$screenWidth}: TypeStyledCardHeader) => ($screenWidth > 320 ? '30px' : '19.2px')};
  color: var(--gradient-first)
`;

type TypeStyledCardText= {
  $screenWidth: number;
};

const StyledCardText = styled.p<TypeStyledCardText>`
  margin: 15px 0 0 0;
  font-size: ${({$screenWidth}: TypeStyledCardText) => ($screenWidth > 320 ? '20px' : '14px')};
  font-weight: 400;
  line-height: ${({$screenWidth}: TypeStyledCardText) => ($screenWidth > 320 ? '30px' : '20.3px')};
  color: var(--contrastText);
  white-space: collapse;
  overflow: hidden; 
`;

type TypeStyledWrapperSwiper = {
  $screenWidth: number;
}

const StyledWrapperSwiper = styled.div<TypeStyledWrapperSwiper>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: ${({$screenWidth}: TypeStyledWrapperSwiper) => ($screenWidth > 320 ? '0 0 104px 0' : '77px 0 0px 20px')};
`;

type TypeStyledButtonSwiper = {
  $position: string;
};

const StyledButtonSwiper = styled.div<TypeStyledButtonSwiper>`
  position: absolute;
  ${({$position}: TypeStyledButtonSwiper) => $position === "left" ?
    `left: 20px; transform: rotate(180deg)`
    : `right:20px`};
  width: 40px;
  height: 40px ;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px 0 var(--arrow-swiper);
  cursor: pointer;
`;

type TypeStyledEvents = {
  $screenWidth: number;
}

const StyledEvents = styled.div<TypeStyledEvents>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  position: absolute;
  left: 0;
  ${({$screenWidth}: TypeStyledEvents) => ($screenWidth > 320 ? 'top: -144px' : 'bottom: 0px')};
  width: ${({$screenWidth}: TypeStyledEvents) => ($screenWidth > 320 ? '120px' : '58.33px')};
  height: ${({$screenWidth}: TypeStyledEvents) => ($screenWidth > 320 ? '88px' : '49.67px')};
  margin-left: ${({$screenWidth}: TypeStyledEvents) => ($screenWidth > 320 ? '80px' : '20px')};
  ${({$screenWidth}: TypeStyledEvents) => ($screenWidth > 320 ? '' : 'margin-bottom: 13px')};
  z-index: 5;
`;

type TypeStyledWrapperButtonEvents = {
  $screenWidth: number;
};

const StyledWrapperButtonEvents = styled.div<TypeStyledWrapperButtonEvents>`
  display: flex;
  gap: ${({$screenWidth}: TypeStyledWrapperButtonEvents) => ($screenWidth > 320 ? '20px' : '8.33px')};
`;

type TypeStyledButtonEvents = {
  $position: string;
  $screenWidth: number;
};

const StyledButtonEvents = styled.div<TypeStyledButtonEvents>`
  ${({$position}: TypeStyledButtonEvents) => $position === "left" ? `transform: rotate(180deg)` : ``};
  width: ${({$screenWidth}: TypeStyledButtonEvents) => ($screenWidth > 320 ? '50px' : '25px')};
  height: ${({$screenWidth}: TypeStyledButtonEvents) => ($screenWidth > 320 ? '50px' : '25px')};
  border-radius: 50%;
  border: 1px solid var(--arrow-hidden);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTextEventsPosition = styled.p`
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 18.12px;
  color: var(--arrow-view);
  align-self: self-start;
`;

type TypeEventDetailsSlider = {
  events: HistoricalEventsArray;
  setEvents: React.Dispatch<React.SetStateAction<HistoricalEventsArray>>;
  activeEvents: number;
  setActiveEvents: React.Dispatch<React.SetStateAction<number>>;
  sortByEvent: (array: HistoricalEventsArray) => HistoricalEventsArray;
  isAnimation: boolean;
  setIsAnimation: React.Dispatch<React.SetStateAction<boolean>>;
  angle: number;
};

export default function EventDetailsSlider(
  {
    events,
    setEvents,
    activeEvents,
    setActiveEvents,
    sortByEvent,
    isAnimation,
    setIsAnimation,
    angle,
  }: TypeEventDetailsSlider
) {
  const screenWidth = useContext(ScreenContext);

  const swiperRef = useRef<TypeSwiper>(null);
  const buttonSwiperNextRef = useRef<React.ElementRef<typeof StyledButtonSwiper>>(null);
  const buttonSwiperPrevRef = useRef<React.ElementRef<typeof StyledButtonSwiper>>(null);
  const [startSwiperList, setStartSwiperList] = useState<boolean>(true);
  const [endSwiperList, setEndSwiperList] = useState<boolean>(false);

  const [isEventsEnd, setIsEventsEnd] = useState<boolean>(false);
  const [isEventsStart, setIsEventsStart] = useState<boolean>(true);

  const slideNext = () => {
    swiperRef.current.slideNext();
  };

  const slidePrev = () => {  
    swiperRef.current.slidePrev()
  };

  const handleSwiper = (swiper: TypeSwiper) => {
    swiperRef.current = swiper;

  swiper.on("reachEnd", () => {
    setEndSwiperList((prev) => !prev);
  });

  swiper.on("reachBeginning", () => {
    setStartSwiperList((prev) => !prev);
  });

  swiper.on("fromEdge", () => {
    if (!swiperRef.current.isEnd) setEndSwiperList((prev) => false);
    if (!swiperRef.current.isBeginning) setStartSwiperList((prev) => false);
  });
};

  const handleClickNext = () => {
    if ( activeEvents === (events.length - 2) ) {
      setIsEventsEnd((prev) => !prev)
    }
    if ( activeEvents < 5 && !isAnimation) {
      if (screenWidth > 320) {
        const rotationAngle = (activeEvents + 1) * angle;
        setIsAnimation(prev => !prev)
        gsap
         .timeline()
         .to(`.p_${activeEvents}`, {width: 6, height: 6, cursor: 'pointer', background: "#42567A", duration: .16,})
         .to(".circle", {
           rotation: `-${rotationAngle}`,duration:1, transformOrigin: "50% 50%"
         })
         .to(`.point`, {rotate: rotationAngle})
         .to(`.p_${activeEvents + 1}`, {width: 56, height: 56, cursor: 'pointer', background: "#fff", duration: .16, onComplete: () => {
           setIsAnimation(prev => !prev)
           }
          });
        }
      if (isEventsStart) setIsEventsStart((prev) => !prev);
      const num = activeEvents + 1;
      setActiveEvents(num);
      setEvents(sortByEvent(historicalEventsData[num]))
    };
    return;
  };

  const handleClickPrev = () => {
    if ( activeEvents === 1 ) {
      setIsEventsStart((prev) => !prev)
    }

    if (activeEvents > 0 && !isAnimation) {
      if (screenWidth > 320) {
        const rotationAngle = ((activeEvents + events.length - 1) * angle);
      setIsAnimation(prev => !prev)
      gsap
        .timeline()
        .to(`.p_${activeEvents}`, {width: 6, height: 6, cursor: 'pointer', background: "#42567A", overflow: 'hidden', duration: .16})
        .to(".circle", {
          rotation: `-${rotationAngle}`,duration:1, transformOrigin: "50% 50%"
        })
        .to(`.point`, {rotate: rotationAngle})
        .to(`.p_${activeEvents - 1}`, {width: 56, height: 56, cursor: 'pointer', background: "#fff", overflow: 'hidden', duration: .16, onComplete: () => {
          setIsAnimation(prev => !prev)
          }
        });
      }
      if (isEventsEnd) setIsEventsEnd((prev) => !prev);
      const num = activeEvents - 1;
      setActiveEvents(num);
      setEvents(sortByEvent(historicalEventsData[num]))
    };
    return;
  };

  return (
    <StyledWrapperSwiper $screenWidth={screenWidth}>
      <StyledEvents $screenWidth={screenWidth}>
        <StyledTextEventsPosition>{`0${activeEvents + 1}/0${events.length}`}</StyledTextEventsPosition>
        <StyledWrapperButtonEvents $screenWidth={screenWidth}>
          <StyledButtonEvents
            onClick={handleClickPrev}
            $screenWidth={screenWidth}
            $position={"left"}
            className={isEventsStart ?"color_border_hidden" : "color_border_view"} >
              <Arrow width={screenWidth > 320 ? 6.25 : 3.12}
              height={screenWidth > 320 ? 12.5 : 6.25}
              className={isEventsStart ? "color_arrow_hidden": "color_arrow_view"} />
          </StyledButtonEvents>
          <StyledButtonEvents
            onClick={handleClickNext}
            $screenWidth={screenWidth}
            $position={"right"}
            className={isEventsEnd ? "color_border_hidden" : "color_border_view"}>
              <Arrow width={screenWidth > 320 ? 6.25 : 3.12}
              height={screenWidth > 320 ? 12.5 : 6.25}
              className={isEventsEnd ? "color_arrow_hidden" : "color_arrow_view"} />
          </StyledButtonEvents>
        </StyledWrapperButtonEvents>
      </StyledEvents>
      
      <Swiper
      onSwiper={handleSwiper}
      modules={[Navigation, Pagination]}
      slidesPerView={screenWidth > 320 ? 3 : 1.5}
      spaceBetween={screenWidth > 320 ? 80 : 25}
      pagination={screenWidth > 320 ? false : {clickable: true}}
      grabCursor={true}
      centeredSlides={true}
      centeredSlidesBounds={true}
      className={isAnimation ? "swiper_hidden" : ''}
      > 
        {events.map((event) => 
        <SwiperSlide key={event.date} >
          <StyledCardHeader $screenWidth={screenWidth}>{event.date}</StyledCardHeader>
          <StyledCardText $screenWidth={screenWidth}>{event.description}</StyledCardText>
        </SwiperSlide>)}
      </Swiper>
      {screenWidth > 320 && !startSwiperList && <StyledButtonSwiper
        className={isAnimation ? 'swiper_hidden' : '' }
        ref={buttonSwiperPrevRef}
        onClick={slidePrev}
        $position={"left"} >
        <Arrow width={5} height={10} className={"color_arrow_swiper"}/>
      </StyledButtonSwiper>}
      {screenWidth > 320 && !endSwiperList && <StyledButtonSwiper
        className={isAnimation ? 'swiper_hidden' : ''}
        ref={buttonSwiperNextRef}
        onClick={slideNext}
        $position={"right"} >
        <Arrow width={5} height={10} className={"color_arrow_swiper"} />
      </StyledButtonSwiper>}
    </StyledWrapperSwiper>
  )
};