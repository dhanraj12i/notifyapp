import { useState } from "react";
import { aiRun } from "../services/serviceAI";
import { useSnackbar } from "notistack";
import AuthConsumer from "../Context/AuthConsumer";
import { notifyInfo } from "./shared/constants";
import { removeSession } from "../graphQL/appServices";

export const HomePage = () => {
  const [search, setSearch] = useState("");
  const [aiResponse, setResponse] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const sessionID = localStorage.getItem("sessionID");
  const { setLoggedIn } = AuthConsumer();

  const handleSearch = async () => {
    try {
      const text = await aiRun();
      setResponse(text);
      enqueueSnackbar(text, { variant: "success" });
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: "error" });
      console.error("Error fetching AI response:", error);
    }
  };

  const logOut = async () => {
    try {
      sessionID &&
        (await removeSession(sessionID).then((res) => {
          console.log(res);
          alert("remove session");
          localStorage.removeItem("sessionID");
          setLoggedIn({});
        }));
      enqueueSnackbar("Logout Succesfully ", {
        variant: notifyInfo.success as
          | "success"
          | "default"
          | "error"
          | "warning"
          | "info",
      });
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };
  return (
    <>
      <div>{search}</div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>search</button>
      {sessionID && <button onClick={logOut}>logout</button>}
      <div>output:-</div>
      <div>{aiResponse}</div>
    </>
  );
};
