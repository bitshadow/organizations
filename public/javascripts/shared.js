var Organizations = Organizations || {};

(function() {
  'use strict';

  Organizations.orgs = Organizations.orgs || [];

  Organizations.ContentHTML = '<ul class="orgs"></ul>';

  Organizations.OrgHTML = ' \
    <li class="org"> \
      <h3 class="heading"> \
        <a target="_blank" href=<%= "https://github.com/" + org.url %> ><b><%= org.url %></b></a> \
      </h3> \
      <div class="info clearfix <%= org.url %>" >Loading...</div> \
    </li> \
    ';

  Organizations.OrgInfoHTML = ' \
    <div class="avatar"> \
      <a target="_blank" href=<%= "https://github.com/" + org.url %>><img src=<%= org.avatar_url %> ></a>\
    </div> \
    <div class="details"> \
      <% if (org.blog) { %> \
        <span class="subtle"> \
          <i class="fa fa-fw fa-link">\
            <a target="_blank" href=<%= Organizations.Utils.validateUrl(org.blog) %> ><%= org.blog %></a> \
          </i> \
        </span> \
        <br/> \
      <% } %>\
      <% if (org.email && org.email.length) { %> \
        <span class="subtle"> \
          <i class="fa fa-fw fa-envelope">\
            <a href="mailto:<%= org.email %>"><%= org.email %></a> \
          </i> \
        </span> \
        <br/> \
      <% } %>\
      <% if (org.location) { %> \
        <i class="fa fa-fw fa-map-marker"> \
          <span><%= org.location %></span></br> \
        </i> \
      <% } %> \
      <span> \
        <i title="Repositories" class="fa fa-fw fa-random"></i> <%= org.public_repos %> \
      </span><br/> \
      <i title="Followers" class="fa fa-fw fa-users"> \
        <span> <%= org.followers %></span><br/> \
      </i> \
    </div> \
     ';

  Organizations.HeaderHTML = ' \
    <a class="logo" href="/">Github Organizations</a> \
    <input id="search" type="text" placeholder="Search" name="terms" value="" autocomplete="off"> \
    <a href="/random" class="explore" type="button">Show Random Organizations!</a> \
    ';

  Organizations.vent = _.extend({}, Backbone.Events);

  Organizations.HeaderView = Backbone.View.extend({
    el: 'header',

    prevTerms : null,

    template: Organizations.HeaderHTML,

    events: {
      'keyup #search': 'search'
    },

    initialize: function() {
      Organizations.vent.bind('data:add', this.removeIndicator, this);
      this.$search = $('#search');

      if (this.$el){
        this.prevTerms = this.$search.val();
      }

      this.search = _.debounce(this._search, 500);
      this.render();
    },

    _search: function(e) {
      var input = $(e.target);
      var terms = input.val();
      if (terms == this.prevTerms) return;

      this.prevTerms = terms;
      Organizations.vent.trigger('terms:change', terms);
      this.addIndicator();
    },

    addIndicator: function() {
      $('#search').addClass('loading');
    },

    removeIndicator: function() {
      $('#search').removeClass('loading');
    },

    render: function() {
      this.$el.html('');
      this.$el.append(_.template(this.template)());
    }
  });

  Organizations.OrgInfoView = Backbone.View.extend({
    template: Organizations.OrgInfoHTML,

    initialize: function() {
      this.render();
    },

    render: function() {

      var self = this;
      // var url = this.options.url || '';
      // $.ajax({
      //   url: url,
      //   success:function(result){
      self.appendInfo();
      //   }
      // });
    },

    appendInfo: function(info) {
      var self = this;
      self.$el.html('');
      self.$el.append(_.template(self.template)({ org: self.model }));
    }
  });

  Organizations.OrgView = Backbone.View.extend({
    template: Organizations.OrgHTML,

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.append(_.template(this.template)({ org: this.model }));
      this.renderInfo(this.model.url);
    },

    renderInfo: function(orgName) {
      var infoEl = this.$el.find('.' + orgName);
      if (!infoEl.length) {
        return console.log('No element found with class!', orgName);
      }

      // render organization info under .orgName class
      new Organizations.OrgInfoView({
        el: infoEl,
        model: this.model
      });
    }
  });

})();