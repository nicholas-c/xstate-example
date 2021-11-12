import Button, { ButtonGroup, LoadingButton } from "@atlaskit/button";
import TextField from "@atlaskit/textfield";

import { FormSection, FormFooter, Field } from "@atlaskit/form";

const LoginForm = ({ state, send, LoadingComp }) => (
  <form style={{ maxWidth: "420px", margin: "0 auto" }}>
    <h1>Login</h1>

    <FormSection>
      <Field aria-required={true} name="username" label="Username" isRequired>
        {({ fieldProps, error }) => (
          <>
            <TextField autoComplete="off" {...fieldProps} />
          </>
        )}
      </Field>

      <Field aria-required={true} name="password" label="Password" x isRequired>
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

export { LoginForm };
