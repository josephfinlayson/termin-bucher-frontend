<template>
  <a name="signup">
    <div class="row justify-content-center">
      <div class="col-12">
        <form v-on:submit.prevent="submitEmail" :onsubmit="submitEmail">
          <h5>Sign up</h5>
          <hr />
          <div class="form-group">
            <label>Email address</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small
              id="emailHelp"
              class="form-text text-muted"
            >We'll never share your email with anyone else.</small>

            <label>Phone number</label>
            <input
              v-model="phone_number"
              type="tel"
              class="form-control"
              placeholder="Enter phone number"
            />
            <small class="form-text text-muted">...or your phone number</small>
            <label>First Name</label>
            <input v-model="first_name" type="text" class="form-control" />
            <label>Last Name</label>
            <input v-model="last_name" type="text" class="form-control" />
          </div>
          <div class="form-check">
            <input v-model="confirmed" type="checkbox" class="form-check-input" id="exampleCheck1" />
            <label class="form-check-label" for="exampleCheck1">
              I confirm I want to recieve an appointment.
              <em>I promise I will cancel the appt if I can't make it.</em>
            </label>
          </div>
          <button :disabled="isDisabled" type="submit" class="btn btn-primary mt-2">Submit</button>
          <div
            v-show="success"
            class="alert alert-success mt-2"
            role="alert"
          >Email successfully submitted! Expect an appointment notification soon!</div>
          <div
            v-show="failed"
            class="alert alert-danger mt-2"
            role="alert"
          >Email not succesfully submitted! Refresh and try again</div>
        </form>
      </div>
    </div>
  </a>
</template>



<script>
function isDev() {
  return process.env.NODE_ENV === "development";
}

console.log(isDev(), process.env);
const api_url = isDev() ? "http://localhost:3000/api/user" : "/api/user";

const data = isDev()
  ? {
      email: "asdf@asdf.com",
      confirmed: true,
    }
  : {
      email: "",
      confirmed: false,
    };

export default {
  name: "Email",
  components: {},
  computed: {
    isDisabled() {
      return !this.confirmed || !this.email;
    },
  },
  data: function () {
    return {
      // declare message with an empty value
      success: false,
      failed: false,
      ...data,
    };
  },
  methods: {
    submitEmail: function (source) {
      this.$ga.event({
        eventCategory: "email_add",
        eventAction: "action",
        eventLabel: "label",
        eventValue: 123,
      });

      const { email, phone_number, first_name, last_name } = this;
      fetch(api_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          phone_number,
          first_name,
          last_name
        }),
      })
        .then((response) => {
          if (response.ok) {
            this.success = true;
            this.email = "";
            this.confirmed = false;
          } else {
            this.failed = true;
          }
        })
        .catch(() => {
          this.email = "";
          this.confirmed = false;
          this.failed = true;
        });
    },
  },
};
</script>
