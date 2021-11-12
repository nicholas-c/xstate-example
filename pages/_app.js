import "../styles/globals.css";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";

const formState = {
  form: {
    on: {
      SUBMIT: "loading",
    },
  },
  loading: {
    on: {
      SUCCESS: "success",
      FAILED: "form",
    },
  },
  success: {
    type: "final",
  },
};

const toggleMachine = createMachine({
  id: "auth",
  initial: "landing",
  states: {
    landing: {
      on: {
        GO_TO_LOGIN: "login.form",
        GO_TO_REGISTER: "register.form",
      },
    },
    login: {
      id: "login",
      on: {
        GO_TO_REGISTER: "register.form",
      },
      states: {
        ...formState,
        form: {
          ...formState.form,
          on: {
            ...formState.form.on,
            GO_TO_RESET_PASSWORD: "#auth.resetPassword.form",
          },
        },
      },
    },
    resetPassword: {
      on: {
        GO_TO_LOGIN: "login.form",
      },
      states: formState,
    },
    register: {
      on: {
        GO_TO_LOGIN: "login.form",
      },
      states: formState,
    },
  },
});

function MyApp({ Component, pageProps }) {
  const [state, send] = useMachine(toggleMachine);

  if (state.matches("landing")) {
    return (
      <>
        <h1>Landing</h1>

        <button type="button" onClick={() => send("GO_TO_LOGIN")}>
          Login
        </button>

        <button type="button" onClick={() => send("GO_TO_REGISTER")}>
          Register
        </button>
      </>
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
      <>
        <h1>Login plz</h1>

        <form>
          <input placeholder="name" />

          {state.matches("login.loading") && <LoadingComp />}

          <div>
            <button
              type="button"
              onClick={() => send("SUBMIT")}
              disabled={state.matches("login.loading")}
            >
              Login
            </button>
          </div>

          <div>
            <button type="button" onClick={() => send("GO_TO_RESET_PASSWORD")}>
              Forgotten Password
            </button>

            <button type="button" onClick={() => send("GO_TO_REGISTER")}>
              Register
            </button>
          </div>
        </form>
      </>
    );
  }

  if (state.matches("register")) {
    if (state.matches("register.success")) {
      return <>Registration Successful</>;
    }

    return (
      <>
        <h1>Register</h1>

        <form>
          <input placeholder="name" />

          {state.matches("register.loading") && <LoadingComp />}

          <div>
            <button
              type="button"
              onClick={() => send("SUBMIT")}
              disabled={state.matches("register.loading")}
            >
              Create Account
            </button>
          </div>

          <div>
            <button type="button" onClick={() => send("GO_TO_LOGIN")}>
              Back to Login
            </button>
          </div>
        </form>
      </>
    );
  }

  if (state.matches("resetPassword")) {
    if (state.matches("resetPassword.success")) {
      return <>Reset Password Successful</>;
    }

    return (
      <>
        <h1>Forgotten Password!</h1>

        {state.matches("resetPassword.loading") && <LoadingComp />}

        <button
          type="button"
          onClick={() => send("SUBMIT")}
          disabled={state.matches("resetPassword.loading")}
        >
          Reset Password
        </button>

        <button type="button" onClick={() => send("GO_TO_LOGIN")}>
          Back to Login
        </button>
      </>
    );
  }
}

export default MyApp;
