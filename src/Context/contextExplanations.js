import { createContext, useContext } from 'react';

// Create context and put results in a variable (NewGuildContext)
export const NewGuildContext = createContext();

// In our app we use .Provider, we wrap it around
// every compnent we want to be able to use context (usually whole app)
export default function NewGuildApp() {
  return (
    <NewGuildContext.Provider value="sunnyglade-ratters">
      <NewGuild />
    </NewGuildContext.Provider>
  );
}

// Where we want to use context, we wrap the .Consumer component around it
function NewGuild() {
  return (
    <NewGuildContext.Consumer>
      {value => <h1>{value}</h1>}
    </NewGuildContext.Consumer>
  );
}

// Alternatively we use the useContext hook rather than the .Consumer

function NewGuildWithHook() {
  const value = useContext(NewGuildContext);
  return <h1>{value}</h1>;
}