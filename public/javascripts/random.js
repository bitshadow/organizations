var Organizations = Organizations || {};
(function() {
  'use strict';

  Organizations.ContentView = Backbone.View.extend({
    el: '#content',

    template: Organizations.ContentHTML,

    count: 1,

    terms: '',

    masonry: null,

    isActive: false,

    initialize: function() {
      this.render();
    },

    setUpMasonry: function() {
      $('.orgs').masonry({
        columnWidth: 10,
        itemSelector: '.org'
      });
      this.isActive = true;
    },

    render: function(clear) {
      // Do not clear it. Remember Infinite scroll.
      if (clear) {
        this.$el.html('');
      }

      this.$el.append(_.template(this.template)({
        orgs : this.model
      }));

      this.$el.show(300);
      this.renderOrgs();
      this.setUpMasonry();
    },

    renderOrgs: function() {
      var $orgs = this.$el.find('.orgs');
      if (!$orgs.length) return;

      this.collection.forEach(function(org) {
        new Organizations.OrgView({ el: $orgs, model: org });
      });
    }
  });

  // Fake the collection.
  new Organizations.ContentView({ collection: Organizations.orgs });
  window.document.title = "OpenSource Organizations|Explore";
})();