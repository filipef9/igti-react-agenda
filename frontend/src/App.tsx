import { getEventsEndpoint } from "./backend";

const App = () => {
  getEventsEndpoint()
    .then(events => {
      events.forEach(event => console.log(event))
    });

  return (
    <div className="App">
      Olá!
    </div>
  );
}

export default App;
