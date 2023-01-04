import { Todos } from "./Todos/Todos";
import { Title } from "./components/Title";

function App() {
  return (
    <div>
      <div>
        <Title>todos</Title>
        <Todos storage="todos-1" />
        <Title>todos 2</Title>
        <Todos storage="todos-2" />
      </div>
    </div>
  );
}

export default App;
