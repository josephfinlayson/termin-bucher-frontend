<template>
  <div id="app">
    <MyHeader></MyHeader>
    <div class="jumbotron jumbotron-fluid center-consistently">
      <div class="container-fluid text-center">
        <h1 class="display-4 ">
          <logo/>
        </h1>
        <p class="lead">Let a robot get an appointment for you</p>
      </div>
    </div>

    <div class="container justify-content-center align-items-center center-consistently">
      <div class="row  ">
        <step title="1" text="Enter your details to have an appointment booked for you"></step>
        <step title="2" text="Get notification via email that appointment is booked"></step>
        <step title="3" text="Go to the appointment, or cancel if you can't make it!"></step>
      </div>
    </div>

    <div class="jumbotron jumbotron-fluid center-consistently">
      <div class="container py-5 ">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-4"><h5>Why is this needed?</h5>
            <p>The Berlin Bürgeramts are totally overloaded! Often there are no appointments available for many weeks at
              central Bürgeramts, even though it's required to register within 3 weeks of moving apartment.
            </p></div>
          <div class="mb-4 mb-lg-0 col-12 col-lg-4"><h5>How does it work?</h5>
            <p>We are continually checking the Berlin Burgeramt website, so when an appointment becomes available, we
              can
              let you know!</p></div>
          <div class="mb-4 mb-lg-0 col-12 col-lg-4"><h5>What does it cost?</h5>
            <p>It's totally free, we will also not sell or give your email to anyone else. It's a hobby project. If it's useful, send me an email :)</p></div>
       
                 <div class="mb-4 mb-lg-0 col-12 col-lg-4"><h5>Comments or feedback?</h5>
            <p>Email joseph.finlayson@gmail.com. I'd love to work with a designer to collaborate on this or other projects </p></div>
        </div>
      </div>
    </div>
    <section class="container py-5  align-content-center ">
      <Form></Form>
    </section>
  </div>
</template>
<style>
.center-consistently {
  min-height: 300px;
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>
<script>
import MyHeader from './header'
import Logo from './logo'
import step from './step'
import Form from './Form'

export default {
  name: 'App',
  components: { Logo, MyHeader, step, Form },
  mounted() {
    setTimeout(() => {
      ga('send', 'pageview', '/')
    }, 1000)
  },
}
</script>

<!-- CSS libraries -->
<!--<style src="normalize.css/normalize.css" />-->
<style src="./base.css"/>
