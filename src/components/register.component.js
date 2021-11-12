import Button, { ButtonGroup, LoadingButton } from "@atlaskit/button";
import TextField from "@atlaskit/textfield";

import { FormSection, FormFooter, Field } from "@atlaskit/form";

const RegisterForm = ({ state, send, LoadingComp }) => (
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
      <Field aria-required={true} name="email" label="Email address" isRequired>
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

export { RegisterForm };
