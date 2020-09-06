<template>
  <a name="signup">
    <div class="row justify-content-center">
      <div class="col-12">
        <form :onsubmit="submitEmail" @submit.prevent="submitEmail">
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

          <div 
           v-for="{authority_id, authority_name} in locations"
            :key="authority_id" 
          class="form-check form-check-inline">
            <input
              :id="'loc' + authority_id"
              v-model="selected_authority_id"
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              :value="authority_id"
              
            />
            <label class="form-check-label" 
            :for="'loc' + authority_id"
            >{{authority_name}}</label>
            
          </div>

          <div  class="form-check">
            <input id="check" v-model="confirmed" type="checkbox" class="form-check-input" />
            <label class="form-check-label" for="exampleCheck1">
              I confirm I want to recieve an appointment.
              <em>I promise I will cancel the appt if I can't make it.</em>
            </label>
          </div>
          <button :disabled="isDisabled" type="submit" class="btn btn-primary mt-2">Submit</button>
          <div v-show="success" class="alert alert-success mt-2" role="alert">
            Email successfully submitted! Expect an appointment notification
            soon!
          </div>
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
  return process.env.NODE_ENV === 'development'
}

console.log(isDev(), process.env)
const base_url = isDev() ? 'http://localhost:3000/api' : '/api'

const api_url = `${base_url}/user`

const data = isDev()
  ? {
      email: 'asdf@asdf.com',
      confirmed: true,
      first_name: 'JJ',
      last_name: 'JJ',
      phone_number: '01',
    }
  : {
      email: '',
      confirmed: false,
    }

export default {
  name: 'Email',
  components: {},
  data: () => {
    return {
      success: false,
      failed: false,
      locations: [],
      selected_authority_id: '',
      ...data,
    }
  },
  computed: {
    isDisabled() {
      return !this.confirmed || !this.email
    },
  },
  beforeMount: function () {
    this.locations = [1, 2]
    this.getLocations()
  },
  methods: {
    resetForm: function resetForm() {
      this.phone_number = ''
      this.first_name = ''
      this.last_name = ''
      this.success = true
      this.email = ''
      this.confirmed = false
    },
    getLocations: function getLocations() {
      fetch(`${base_url}/locations`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (r) => {
        this.locations = await r.json()
        this.selected_authority_id = this.locations[0].authority_id
      })
    },
    submitEmail: function submitEmail() {
      this.$ga.event({
        eventCategory: 'email_add',
        eventAction: 'action',
        eventLabel: 'label',
        eventValue: 123,
      })

      const { email, phone_number, first_name, last_name, selected_authority_id } = this
      fetch(api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          phone_number,
          first_name,
          last_name,
          authority_id: selected_authority_id,
        }),
      })
        .then(function (response) {
          if (response.ok) {
            this.resetForm()
          } else {
            this.resetForm()
            this.failed = true
          }
        })
        .catch(() => {
          this.resetForm()
          this.failed = true
        })
    },
  },
}
</script>
