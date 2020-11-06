
export  function isDev() {
    return process.env.NODE_ENV === "development";
  }

  export function getDefaultData() {
    return isDev()
      ? {
          email: "asdf@asdf.com",
          confirmed: true,
          first_name: "JJ",
          last_name: "JJ",
          phone_number: "01",
        }
      : {
          email: "",
          confirmed: false,
        };

  }