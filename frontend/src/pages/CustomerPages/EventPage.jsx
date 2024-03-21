import React from "react";
import Header from "../../components/Layout/Header";
import EventCard from "../../components/Route/Events/EventCard";
import { useSelector } from "react-redux";

const EventPage = () => {
  const { allEvents } = useSelector((state) => state.event);
  return (
    <div>
      <Header activeHeading={4} />
      <div className="pt-[30px]">
        {" "}
        {allEvents ? (
          <EventCard data={allEvents[0]} active={true} />
        ) : (
          <p>There are no event now!</p>
        )}
      </div>
    </div>
  );
};

export default EventPage;
