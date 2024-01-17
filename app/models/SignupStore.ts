import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const SignupStoreModel = types
  .model("SignupStore")
  .props({
    authToken: types.maybe(types.string),
    authEmail: "",
    username: "",

  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
    get validationError() {
      if (store.authEmail.length === 0) return "can't be blank"
      if (store.authEmail.length < 6) return "must be at least 6 characters"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
        return "must be a valid email address"
      
      return ""
    },
  }))
  .actions((store) => ({
    setAuthToken(value?: string) {
      store.authToken = value
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "")
    },
    setUsername(value: string) {
      store.username = value.replace(/ /g, "")
    },
    logout() {
      store.authToken = undefined
      store.authEmail = ""
    },
  }))

export interface SignupStore extends Instance<typeof SignupStoreModel> {}
export interface SignupStoreSnapshot extends SnapshotOut<typeof SignupStoreModel> {}
