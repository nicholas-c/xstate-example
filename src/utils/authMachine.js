import { createMachine } from "xstate";

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

export const toggleMachine = createMachine({
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
      initial: "form",
      on: {
        GO_TO_REGISTER: "register",
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
      initial: "form",
      on: {
        GO_TO_LOGIN: "login",
      },
      states: formState,
    },
    register: {
      initial: "form",
      on: {
        GO_TO_LOGIN: "login",
      },
      states: formState,
    },
  },
});
