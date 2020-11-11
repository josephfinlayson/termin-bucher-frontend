/* eslint-disable vue/attribute-hyphenation */

<script>
import Vue from "vue";
import VueScheduler from "@duoa/vue-scheduler";
// Because this components has its styles, you must also import the css file.
import "@duoa/vue-scheduler/dist/vue-scheduler.css";

const locale = {
  AM: "AM",
  PM: "PM",
  TIME_TITLE: "TIME",
  WEEK_TITLE: "DAY",
  WEEK_DAYS: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  HOURS: [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ],
  DRAG_TIP: " ",
  RESET: "Reset Selected",
};
Vue.use(VueScheduler, {});

export default {
  name: "TScheduler",
  props: ["value"],

  data() {
    return {
      selected: {},
    };  },
  methods: {
    changed(val) {
          this.$emit('input', val)
    },
  },
};
</script>

<template>
  <scheduler
    v-model="selected"
    :multiple="true"
     v-on:change="changed(selected)"
    :ignoreWeekend="true"
    :hourRange="[8, 18]"
    
  />
</template>
