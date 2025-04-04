import { redirect } from "@sveltejs/kit";
import { user } from "../shared/store/user.svelte";

export function load() {
  if (!user.token) redirect(302, '/login');
}