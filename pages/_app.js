import { toggleMachine } from "../utils/authMachine";
import { useEffect } from "react";
import Button, { ButtonGroup, LoadingButton } from "@atlaskit/button";
import { useMachine } from "@xstate/react";
import TextField from "@atlaskit/textfield";

import Form, { FormSection, FormFooter, Field } from "@atlaskit/form";

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

    return (
      <form style={{ maxWidth: "420px", margin: "0 auto" }}>
        <h1>Login</h1>

        <FormSection>
          <Field
            aria-required={true}
            name="username"
            label="Username"
            isRequired
          >
            {({ fieldProps, error }) => (
              <>
                <TextField autoComplete="off" {...fieldProps} />
              </>
            )}
          </Field>

          <Field
            aria-required={true}
            name="password"
            label="Password"
            x
            isRequired
          >
            {({ fieldProps, error }) => (
              <>
                <TextField autoComplete="off" type="password" {...fieldProps} />
              </>
            )}
          </Field>
        </FormSection>

        {state.matches("login.loading") && <LoadingComp />}

        <FormFooter>
          <ButtonGroup>
            <LoadingButton
              type="button"
              appearance="primary"
              onClick={() => send("SUBMIT")}
              isLoading={state.matches("login.loading")}
            >
              Login
            </LoadingButton>
          </ButtonGroup>
        </FormFooter>

        <ButtonGroup>
          <Button
            type="button"
            appearance="link"
            spacing="none"
            onClick={() => send("GO_TO_RESET_PASSWORD")}
          >
            Forgotten my password
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          New to Gymshark?
          <Button
            type="button"
            appearance="link"
            spacing="none"
            onClick={() => send("GO_TO_REGISTER")}
          >
            Create An Account
          </Button>
        </ButtonGroup>
      </form>
    );
  }

  if (state.matches("register")) {
    if (state.matches("register.success")) {
      return <>Registration Successful</>;
    }

    return (
      <form style={{ maxWidth: "420px", margin: "0 auto" }}>
        <h1>Register</h1>

        <FormSection>
          <Field aria-required={true} name="name" label="Name" isRequired>
            {({ fieldProps, error }) => (
              <>
                <TextField autoComplete="off" {...fieldProps} />
              </>
            )}
          </Field>
          <Field
            aria-required={true}
            name="email"
            label="Email address"
            isRequired
          >
            {({ fieldProps, error }) => (
              <>
                <TextField autoComplete="off" {...fieldProps} />
              </>
            )}
          </Field>

          <Field
            aria-required={true}
            name="password"
            label="Password"
            x
            isRequired
          >
            {({ fieldProps, error }) => (
              <>
                <TextField autoComplete="off" type="password" {...fieldProps} />
              </>
            )}
          </Field>
        </FormSection>

        {state.matches("register.loading") && <LoadingComp />}

        <FormFooter>
          <ButtonGroup>
            <LoadingButton
              type="button"
              appearance="primary"
              onClick={() => send("SUBMIT")}
              isLoading={state.matches("register.loading")}
            >
              Register
            </LoadingButton>
          </ButtonGroup>
        </FormFooter>

        <ButtonGroup>
          Already registered?
          <Button
            type="button"
            appearance="link"
            spacing="none"
            onClick={() => send("GO_TO_LOGIN")}
          >
            Sign Into Your Account
          </Button>
        </ButtonGroup>
      </form>
    );
  }

  if (state.matches("resetPassword")) {
    if (state.matches("resetPassword.success")) {
      return <>Reset Password Successful</>;
    }

    return (
      <form style={{ maxWidth: "420px", margin: "0 auto" }}>
        <h1>Forgotten Password</h1>

        <FormSection>
          <Field
            aria-required={true}
            name="email"
            label="Email address"
            isRequired
          >
            {({ fieldProps, error }) => (
              <>
                <TextField autoComplete="off" {...fieldProps} />
              </>
            )}
          </Field>
        </FormSection>

        {state.matches("resetPassword.loading") && <LoadingComp />}

        <FormFooter>
          <ButtonGroup>
            <LoadingButton
              type="button"
              appearance="primary"
              onClick={() => send("SUBMIT")}
              isLoading={state.matches("resetPassword.loading")}
            >
              Reset Password
            </LoadingButton>
          </ButtonGroup>
        </FormFooter>

        <ButtonGroup>
          <Button
            type="button"
            appearance="link"
            spacing="none"
            onClick={() => send("GO_TO_LOGIN")}
          >
            Back to Login
          </Button>
        </ButtonGroup>
      </form>
    );
  }
};

export default App;
