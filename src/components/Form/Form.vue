<template>
  <a name="signup">
    <div class="row justify-content-center">
      <div class="col-12">
        <form @submit="submitEmail">
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
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >

            <label>Phone number</label>
            <input
              v-model="phone_number"
              type="tel"
              class="form-control"
              placeholder="Enter phone number"
            />

            <small class="form-text text-muted">...or your phone number</small>

            <div class="form-row">
              <div class="col-sm">
                <label>First Name</label>

                <input
                  v-model="first_name"
                  type="text"
                  class="form-control"
                  placeholder="First name"
                />
              </div>
              <div class="col">
                <label>Last Name</label>

                <input
                  v-model="last_name"
                  type="text"
                  class="form-control"
                  placeholder="Last name"
                />
              </div>
            </div>
          </div>

          <div
            v-for="{ authority_id, authority_name } in locations"
            :key="authority_id"
            class="form-check form-check-inline"
          ></div>
          <scheduler v-model="time" />
          <div
            v-for="{ authority_id, authority_name } in locations"
            :key="authority_id"
            class="form-check form-check-inline"
          >
            <input
              :id="'loc' + authority_id"
              v-model="selected_authority_id"
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              :value="authority_id"
            />
            <label class="form-check-label" :for="'loc' + authority_id">{{
              authority_name
            }}</label>
          </div>

          <div class="form-check">
            <input
              id="check"
              v-model="confirmed"
              type="checkbox"
              class="form-check-input"
            />
            <label class="form-check-label" for="exampleCheck1">
              I confirm I want to recieve an appointment.
              <em>I promise I will cancel the appt if I can't make it.</em>
            </label>
          </div>
          <button
            :disabled="isDisabled"
            type="submit"
            class="btn btn-primary mt-2"
          >
            Submit
          </button>
          <div v-show="success" class="alert alert-success mt-2" role="alert">
            Email successfully submitted! Expect an appointment notification
            soon!
          </div>
          <div v-show="failed" class="alert alert-danger mt-2" role="alert">
            Email not succesfully submitted! Refresh and try again
          </div>
        </form>
      </div>
    </div>
  </a>
</template>

<script>
import scheduler from "./Scheduler";
import {submitForm, getLocations} from '../../utils/api'
import {getDefaultData} from '../../utils/helpers'

const data = getDefaultData()

export default {
  name: "Email",
  components: { scheduler: scheduler },
  data: () => {
    return {
      success: false,
      failed: false,
      locations: [],
      selected_authority_id: "",
      time: null,
    ...data,
    };
  },
  watch: {
      time: {
          handler(v){
          console.log('formVal', v)
      }
  } },
  computed: {
    isDisabled() {
      return !this.confirmed || !this.email;
    },
  },
  beforeMount: function () {
    this.getLocations();
  },
  methods: {
    resetForm() {
      this.phone_number = "";
      this.first_name = "";
      this.last_name = "";
      this.email = "";
      this.confirmed = false;
    },
    getLocations() {
        return getLocations()
        .then(({locations, selected_authority_id}) => {
            this.locations = locations
            this.selected_authority_id = selected_authority_id
        })
    },
    submitEmail(e) {
      e.preventDefault();
      const {
        email,
        phone_number,
        first_name,
        last_name,
        selected_authority_id,
        time
      } = this;

      submitForm(
        email,
        phone_number,
        first_name,
        last_name,
        selected_authority_id,
        time
      )
        .then(() => {
          this.resetForm();
          this.success = true;
          this.failed = false;
        })
        .catch(() => {
          this.resetForm();
          this.success = false;
          this.failed = true;
        });
    },
  },
};
</script>
