export const testApi = {
  apitest: {
    auth: false,
    handler: async function (request, h) {
      return { message: "Api callback" };
    },
  },
};
