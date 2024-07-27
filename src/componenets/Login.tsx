import React, { useEffect, useState } from "react";
import { account, ID } from "../lib/appwrite";
import AuthConsumer from "../Context/AuthConsumer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { setLoggedIn, loggedIn } = AuthConsumer();

  const login = async (email: string, password: string) => {
    await account.createEmailPasswordSession(email, password);
    setLoggedIn(await account.get());
  };

  return (
    <div>
      <p>{loggedIn ? `Logged in as ${loggedIn.name}` : "Not logged in"}</p>

      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="button" onClick={() => login(email, password)}>
          Login
        </button>

        <button
          type="button"
          onClick={async () => {
            await account.create(ID.unique(), email, password, name);
            login(email, password);
          }}
        >
          Register
        </button>

        <button
          type="button"
          onClick={async () => {
            await account.deleteSession("current");
            setLoggedIn({});
          }}
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default Login;
