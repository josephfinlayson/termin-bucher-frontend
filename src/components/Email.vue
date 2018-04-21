<template>

  <a name="signup">
    <div class="row justify-content-center">
      <div class="col-12">
      <form
        v-on:submit.prevent="submitEmail"
        :onsubmit="submitEmail">
        <h5> Sign up </h5>
        <hr/>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input v-model="email" type="email" class="form-control" id="exampleInputEmail1"
                 aria-describedby="emailHelp"
                 placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-check">
          <input v-model="confirmed" type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">I confirm I want to recieve email notifications about
            available appointments for Anmeldung in Berlin. They will discontinue 7 days after signup</label>
        </div>
        <button
          :disabled="!confirmed && !email"
          type="submit" class="btn btn-primary mt-2">Submit
        </button>
        <div v-show="success"
             class="alert alert-success mt-2" role="alert">
          Email successfully submitted! Expect an appointment notification soon!
        </div>
        <div v-show="failed"
             class="alert alert-danger mt-2" role="alert">
          Email not succesfully submitted! Refresh and try again
        </div>
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
const api_url = isDev() ? "http://localhost:3000/api/email" : "/api/email";

const data = isDev()
  ? {
      email: "asdf@asdf.com",
      confirmed: true
    }
  : {
      email: "",
      confirmed: false
    };

export default {
  name: "Email",
  components: {},
  data: function() {
    return {
      // declare message with an empty value
      success: false,
      failed: false,
      ...data
    };
  },
  methods: {
    submitEmail: function(source) {
      console.log(fetch);
      fetch(api_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.email
        })
      }).then(response => {
        if (response.ok) {
          this.success = true;
          this.email = "";
          this.confirmed = false;
        } else {
          this.failed = false;
        }
      });
    }
  }
};
</script>
