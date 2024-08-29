import { useState } from "react";
import { account } from "../lib/appwrite";
import AuthConsumer from "../Context/AuthConsumer";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { notifyInfo } from "./shared/constants";
import { createAccount, createSession } from "../graphQL/appServices";

const Login = () => {
  const { setLoggedIn, loggedIn } = AuthConsumer();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    const resp = createSession({ email, password });
    resp
      .then(({ data, errors }: any) => {
        if (data.accountCreateEmailPasswordSession !== null) {
          setLoggedIn({ ...data.accountCreateEmailPasswordSession });
          localStorage.setItem(
            "sessionID",
            data.accountCreateEmailPasswordSession._id as string
          );
        }

        enqueueSnackbar(
          data.accountCreateEmailPasswordSession !== null
            ? "succesfully login "
            : errors[0]?.message,
          {
            variant:
              data.accountCreateEmailPasswordSession !== null
                ? (notifyInfo.success as "success")
                : (notifyInfo.error as "error"),
          }
        );
      })
      .catch((e) => {
        console.error(e);
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
            await createAccount({ email, password, name });
            login(email, password);
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
