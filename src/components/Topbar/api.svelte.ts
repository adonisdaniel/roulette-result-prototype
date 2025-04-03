import { goto } from "$app/navigation";
import { writable } from "svelte/store";

export const hideMenu = writable(true)

export const handleLogout = () => {
  localStorage.removeItem("token")
  hideMenu.set(true)
  goto('/login')
}