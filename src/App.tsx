import { useState } from "react";

function App() {
  return (
    <a
      href={
        "https://discord.com/oauth2/authorize?client_id=1407178750441033798&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogin%2Foauth2%2Fcode%2Fdiscord&scope=email+identify"
      }
    >
      Login
    </a>
  );
}

export default App;
