import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const SignupStoreModel = types
  .model("SignupStore")
  .props({
    authToken: types.maybe(types.string),
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    emailError: "",
    usernameError: "",
    passwordError: "",
    confirmPasswordError: "",
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
    get validationError() {
      const errors = { email: "", password: "", username: "", confirmPassword: "" }
      if (store.email.length === 0) {
        errors.email = "can't be blank"
      } else if (store.email.length < 6) {
        errors.email = "must be at least 6 characters"
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.email)) {
        errors.email = "must be a valid email address"
      } else {
        errors.email = ""
      }
      if (store.username.length === 0) {
        errors.username = "can't be blank"
      } else if (store.username.length < 6) {
        errors.username = "must be at least 6 characters"
      } else {
        errors.username = ""
      }
      if (store.password.length === 0) {
        errors.password = "can't be blank"
      } else if (store.password.length < 6) {
        errors.password = "must be at least 6 characters"
      } else if (store.password.match(/^[a-zA-Z0-9]+$/)) {
        errors.password = "password should be alpha numeric"
      } else {
        errors.password = ""
      }
      if (store.confirmPassword.length === 0) {
        errors.confirmPassword = "can't be blank"
      } else if (store.confirmPassword.length < 6) {
        errors.confirmPassword = "must be at least 6 characters"
      } else if (store.password !== store.confirmPassword) {
        errors.confirmPassword = "passwords don't match"
      } else {
        errors.confirmPassword = ""
      }
      return errors
    },
  }))
  .actions((store) => ({
    setAuthToken(value?: string) {
      store.authToken = value
    },
    setEmail(value: string) {
      store.email = value.replace(/ /g, "")
    },
    setUsername(value: string) {
      store.username = value.replace(/ /g, "")
    },
    setPassword(value: string) {
      store.password = value.replace(/ /g, "")
    },
    setConfirmPassword(value: string) {
      store.confirmPassword = value.replace(/ /g, "")
    },
    logout() {
      store.authToken = undefined
      store.email = ""
    },
  }))

export interface SignupStore extends Instance<typeof SignupStoreModel> {}
export interface SignupStoreSnapshot extends SnapshotOut<typeof SignupStoreModel> {}
