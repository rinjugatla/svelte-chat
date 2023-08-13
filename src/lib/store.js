import { writable } from "svelte/store";
import Cookies from 'js-cookie'

const cookieUid = Cookies.get("uid");
export const UserId = writable(cookieUid ?? "");