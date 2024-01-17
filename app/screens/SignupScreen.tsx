import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface SignupScreenProps extends AppStackScreenProps<"SignUp"> {}

export const SignupScreen: FC<SignupScreenProps> = observer(function SignupScreen(_props) {
  const { navigation } = _props
  const passwordInput = useRef<TextInput>(null)
  const emailInput = useRef<TextInput>(null)
  const passwordConfirmInput = useRef<TextInput>(null)
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    signupStore: {
      username,
      email,
      password,
      confirmPassword,
      setUsername,
      setEmail,
      setPassword,
      setConfirmPassword,
      setAuthToken,
      validationError,
    },
  } = useStores()

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    // setAuthEmail("ignite@infinite.red")
    // setPassword("ign1teIsAwes0m3")

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setPassword("")
      setEmail("")
    }
  }, [])

  const error: any = isSubmitted ? validationError : ""

  function signup() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setPassword("")
    setEmail("")

    // We'll mock this with a fake token.
    setAuthToken()
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  function goLogin() {
    // logout();
    navigation.navigate("Login")
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="login-heading" tx="signupScreen.signUp" preset="heading" style={$signIn} />
      <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} />
      {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}
      <TextField
        value={username}
        onChangeText={setUsername}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="username"
        autoCorrect={false}
        // keyboardType="email-address"
        labelTx="signupScreen.usernameFieldLabel"
        placeholderTx="loginScreen.emailFieldPlaceholder"
        helper={error?.username}
        status={error.username ? "error" : undefined}
        onSubmitEditing={() => emailInput.current?.focus()}
      />
      <TextField
        ref={emailInput}
        value={email}
        onChangeText={setEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen.emailFieldLabel"
        placeholderTx="loginScreen.emailFieldPlaceholder"
        helper={error?.email}
        status={error?.email ? "error" : undefined}
        onSubmitEditing={() => passwordInput.current?.focus()}
      />

      <TextField
        ref={passwordInput}
        value={password}
        onChangeText={setPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="signupScreen.passwordFieldLabel"
        placeholderTx="signupScreen.passwordFieldPlaceholder"
        onSubmitEditing={() => passwordConfirmInput.current?.focus()}
        helper={error?.password}
        status={error?.password ? "error" : undefined}
        RightAccessory={PasswordRightAccessory}
      />

      <TextField
        ref={passwordConfirmInput}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="signupScreen.confirmPasswordFieldLabel"
        placeholderTx="signupScreen.confirmPasswordFieldPlaceholder"
        helper={error?.confirmPassword}
        status={error?.confirmPassword ? "error" : undefined}
        onSubmitEditing={signup}
        // RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="login-button"
        tx="signupScreen.tapToSignUp"
        style={$tapButton}
        preset="reversed"
        onPress={signup}
      />
      <Text tx="signupScreen.alreadyAccount" onPress={goLogin} style={$alreadyAccount} />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}

const $alreadyAccount: TextStyle = {
  marginTop: spacing.sm,
  color: colors.tint,
  textDecorationLine: "underline",
}
