import { writable } from "svelte/store";

export const defaultModal = writable(false);

export const showModalAndClose = () => {
  defaultModal.set(true);
  setTimeout(() => {
    defaultModal.set(false);
  }, 4000); // Close after 4 seconds
};

export const toggleModal = () => {
  defaultModal.update((value) => !value);
}