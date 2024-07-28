import { useState } from "react";
import { account, ID } from "../lib/appwrite";
import AuthConsumer from "../Context/AuthConsumer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setLoggedIn, loggedIn } = AuthConsumer();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    await account.createEmailPasswordSession(email, password).then((res) => {
      localStorage.setItem("sessionID", res.$id as string);
    });
    setLoggedIn(await account.get());
    const data = await account.createJWT();
    localStorage.setItem("jwt", data.jwt as unknown as string);
    navigate("/home");
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

        <button
          type="button"
          onClick={() => {
            login(email, password);
          }}
        >
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
            localStorage.removeItem("sessionID");
          }}
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default Login;
