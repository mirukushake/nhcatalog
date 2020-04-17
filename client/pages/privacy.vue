<template>
  <div class="container">
    <div>
      <h1 class="display-1 info--text">
        Privacy Policy
      </h1>
      <!-- <h1 class="title grey--text text--darken-2">
      </h1> -->
    </div>
    <section class="mt-8">
      <p class="font-weight-bold">
        Last updated: 4/16/2020
      </p>

      <p>NH Catalog ("us", "we", or "our") operates http://nhcatalog.com (the "Site"). This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site.</p>
      <p>We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.</p>

      <p class="font-weight-bold">
        Log Data
      </p>

      <p>Like many site operators, we collect information that your browser sends whenever you visit our Site ("Log Data").</p>

      <p>This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages and other statistics.</p>

      <p>In addition, we may use third party services such as Google Analytics that collect, monitor and analyze this information.</p>

      <p class="font-weight-bold">
        Cookies
      </p>

      <p>Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive.</p>

      <p>Like many sites, we use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.</p>

      <p class="font-weight-bold">
        Contact Us
      </p>

      <p>If you have any questions about this Privacy Policy, please contact us.</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data: () => ({
  }),
  computed: {
    loggedInUser () {
      return this.$store.state.auth.user;
    },
  },
  mounted () {
    this.getCompletion(0);
  },
  methods: {
    async getCompletion () {
      await this.$auth.fetchUser();
    },
  },
  head: () => ({
    title: 'NH Catalog',
  }),
};
</script>
