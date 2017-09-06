<template>

  <div class="ui black segment">
    <div id="app">
      <div class="ui comments live-chat">
        <h3 class="ui dividing header">Chat App</h3>
        <div class="message" v-for="message in messages">
          <div class="comment">
            <a class="avatar">
              <img src="https://semantic-ui.com/images/avatar/small/matt.jpg">
            </a>
            <div class="content">
              <a class="author">{{ message[3] }}</a>
              <div class="metadata">
                <span class="date">Today at {{ message[4] }}</span>
              </div>
              <div class="text">
                {{ message[2] }}
              </div>
            </div>
          </div>
        </div>


        <form v-on:submit="send" class="ui reply form">
          <div class="ui form">
            <div class="inline fields">
              <div class="field">
                  <input type="text" placeholder="Name" v-model="name">
              </div>
              <div class="field">
                <input type="text" placeholder="Comment..." v-model="message">
              </div>
              <div class="field">
                <button type="submit" class="ui blue circular submit icon button">
                  <i class="icon send"></i>
                </button>
              </div>
            </div>
          </div>

        </form>
      </div>

    </div>
  </div>
</template>

<script>
var socket = io('http://localhost:3000');
var channel = "SOME_CHANEL2";
var userId = "4";
var userName = "USERNAME";

export default {
  name: 'app',
  data: function () {
    return {
      messages: [],
      message: null,
      name: null,
      time: ''
    }
  },

  mounted: function () {
    socket.on('connect', function () {
      console.log("Connected to Server..");
      socket.emit('join', [channel, userId, userName]);
    });

    socket.on('chat.' + channel, function (payload) {
      console.log(payload);
      this.messages.push(['chat', payload[1], payload[2], payload[3], payload[4]]);
    }.bind(this));
  },

  methods: {
    send: function (e) {
      e.preventDefault();
      const f = new Date();
      this.time = f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds();
      const payload = [channel, userId, this.message, this.name, this.time];

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
