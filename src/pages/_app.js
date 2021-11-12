import { toggleMachine } from "../utils/authMachine";
import { useEffect } from "react";
import Button, { ButtonGroup, LoadingButton } from "@atlaskit/button";
import { useMachine } from "@xstate/react";
import TextField from "@atlaskit/textfield";

import Form, { FormSection, FormFooter, Field } from "@atlaskit/form";

import { LoginForm } from "../components/login.component";
import { RegisterForm } from "../components/register.component";
import { PasswordResetForm } from "../components/password-reset.component";

const App = () => {
  // Hacky, I know
  useEffect(() => {
    const style = document.createElement("style");
    style.innerText = `body {
      font-family: 'Roboto', sans-serif;
  }`;
    const head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
  }, []);

  const [state, send] = useMachine(toggleMachine);

  if (state.matches("landing")) {
    return (
      <div style={{ maxWidth: "420px", margin: "0 auto" }}>
        <h1>Landing</h1>

        <ButtonGroup>
          <Button
            type="button"
            onClick={() => send("GO_TO_LOGIN")}
            appearance="primary"
            shouldFitContainer
          >
            Login
          </Button>

          <Button
            type="button"
            onClick={() => send("GO_TO_REGISTER")}
            appearance="primary"
            shouldFitContainer
          >
            Register
          </Button>
        </ButtonGroup>
      </div>
    );
  }

  const LoadingComp = () => {
    setTimeout(() => send("SUCCESS"), 2000);

    return <>Loading...</>;
  };

  if (state.matches("login")) {
    if (state.matches("login.success")) {
      return <>Login Successful</>;
    }

    return <LoginForm state={state} send={send} LoadingComp={LoadingComp} />;
  }

  if (state.matches("register")) {
    if (state.matches("register.success")) {
      return <>Registration Successful</>;
    }

    return <RegisterForm state={state} send={send} LoadingComp={LoadingComp} />;
  }

  if (state.matches("resetPassword")) {
    if (state.matches("resetPassword.success")) {
      return <>Reset Password Successful</>;
    }

    return (
      <PasswordResetForm state={state} send={send} LoadingComp={LoadingComp} />
    );
  }
};

export default App;
