import Button, { ButtonGroup, LoadingButton } from "@atlaskit/button";
import TextField from "@atlaskit/textfield";

import { FormSection, FormFooter, Field } from "@atlaskit/form";

const PasswordResetForm = ({ state, send, LoadingComp }) => (
  <form style={{ maxWidth: "420px", margin: "0 auto" }}>
    <h1>Forgotten Password</h1>

    <FormSection>
      <Field aria-required={true} name="email" label="Email address" isRequired>
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

export { PasswordResetForm };
