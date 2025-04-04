import { writable } from "svelte/store";
import loginUseCases from "../../../shared/services/login/application/loginUseCases";
import { goto } from "$app/navigation";

export const counter = $state({
  count: 0
});

export const user = $state({
  user: '',
  password: ''
});

export const loaderLogin = writable(false)

export const login = async () => {

  loaderLogin.set(true)

  const bool = await loginUseCases.login(user.user, user.password)

  loaderLogin.set(false)
  if (!bool) return
  goto('/dashboard')
}