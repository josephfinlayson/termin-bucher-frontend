<template>
  <section class="container py-5 ">
    <div class="row justify-content-center">
      <form
        v-on:submit.prevent="submitEmail"
        :onsubmit="submitEmail">
        <h5> Sign up </h5>
        <hr/>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                 placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-check">
          <input v-model="confirmed" type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">I confirm I want to recieve notifications about
            available appointments for Anmeldung in Berlin</label>
        </div>
        <button
          :disabled="!confirmed && !email"
          type="submit" class="btn btn-primary mt-2">Submit
        </button>
        <div v-show="success"
             class="alert alert-success mt-2" role="alert">
          Email successfully submitted! Expect an appointment notification soon!
        </div>
      </form>
    </div>
  </section>
</template>


<script>
  import MyHeader from "./header";
  import Logo from "./logo";
  import step from "./step";

  const api_url = "http://localhost:3000/email"

  export default {
    name: "Email",
    components: {},
    data: function () {
      return {   // declare message with an empty value
        confirmed: true,
        email: 'asdf@asdf.com',
        success: false
      }
    },
    methods: {
      submitEmail: function (source) {
        console.log(fetch)
        fetch(api_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
          })
        })
          .then(response => {
            this.success = true
            this.email = ''
            this.confirmed = false

          });
      },
    },

  };
</script>

