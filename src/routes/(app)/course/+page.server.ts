import type { Actions } from "./$types";

export const actions: Actions = {
  default: async() => {
    return {
      status: 200,
      body: {
        message: "Hello World"
      }
    };
  }
};