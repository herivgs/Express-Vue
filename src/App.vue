<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>

    <div id="chat">
      <form v-on:submit="send">
        <div class="message" v-for="message in messages">
          {{ message[3] }}: {{ message[2] }}
        </div>
        <label>Name: </label>
        <input id="name" v-model="name">
        <input id="message" v-model="message">
        <label>test: {{message}} </label>
        <button type="submit" name="button">Send</button>
      </form>
    </div>


    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
var socket = io('http://localhost:3000');
var channel = "SOME_CHANEL";
var userId = "4";
var userName = "USERNAME";

export default {
  name: 'app',
  data: function () {
    return {
      messages: [],
      message: null,
      name: null,
      msg: 'Welcome to Your Vue.js App'
    }
  },

  mounted: function () {
    socket.on('connect', function () {
      console.log("Connected to Server..");
      socket.emit('join', [channel, userId, userName]);
      console.log()
    });

    socket.on('chat.' + channel, function (payload) {
      console.log(payload);
      this.messages.push(['chat', payload[1], payload[2], payload[3]]);
    }.bind(this));
  },

  methods: {
    send: function (e) {
      e.preventDefault();
      var payload = [channel, userId, this.message, this.name];

      if(this.message == ('' || ' ')) {
        this.message = null
      }

      if(this.message != null) {
        socket.emit('chat', payload);
      }

      this.message = null;
    },

    isPoster: function(id) {
      if(userId === id) {
        return true;
      }
      return false;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
