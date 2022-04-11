import { getEventsEndpoint } from "./backend";
import CalendarScreen from "./CalendarScreen";

const App = () => {
  getEventsEndpoint()
    .then(events => {
      events.forEach(event => console.log(event))
    });

  return <CalendarScreen />
}

export default App;
