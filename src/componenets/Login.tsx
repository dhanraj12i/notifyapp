import { useState } from "react";
import { account, ID } from "../lib/appwrite";
import AuthConsumer from "../Context/AuthConsumer";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { notifyInfo } from "./shared/constants";
import {
  createAccount,
  createSession,
  getSession,
} from "../graphQL/appServices";

const Login = () => {
  const { setLoggedIn, loggedIn } = AuthConsumer();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const sessionID = localStorage.getItem("sessionID");

  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    const resp = createSession({ email, password });
    resp
      .then(({ data, errors }: any) => {
        const [error] = errors;

        if (errors.length == 0) {
          setLoggedIn(getSession(data.accountCreateEmailPasswordSession._id));
          localStorage.setItem(
            "sessionID",
            data.accountCreateEmailPasswordSession._id as string
          );
        }

        enqueueSnackbar(
          errors.length == 0 ? "succesfully login " : error.message,
          {
            variant:
              errors.length == 0
                ? (notifyInfo.success as "success")
                : (notifyInfo.error as "error"),
          }
        );
      })
      .catch((e) => {
        alert(e);
      });

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
            // await account.create(ID.unique(), email, password, name); REST API
            await createAccount({ email, password, name }); //graphQL
            login(email, password);
          }}
        >
          Register
        </button>
        {/* {sessionID && (
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
        )} */}
      </form>
    </div>
  );
};

export default Login;
