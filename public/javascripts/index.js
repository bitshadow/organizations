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
      Organizations.vent.bind('terms:change', this.onSearchTermUpdate, this);
      this.render();
      this.updateCollectionOnScroll();
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

      if (this.isActive && $orgs.masonry()) {
        $orgs.masonry('reloadItems').fadeIn();
        $orgs.masonry('layout');
      }
    },

    updateCollectionOnScroll: function() {
      var self = this;
      $('.indicator').hide();

      $(window).scroll(function() {

        if($(window).scrollTop() >= $(document).height() - $(window).height() - 4) {
          console.log('sending request');
          $('.indicator').show();
          $.post('/orgs', {
            terms: self.terms,
            page: self.count
          }).done(function( data ) {
              self.collection = data;
              self.renderOrgs();
              $('.indicator').hide();
              self.count++;
          });
        }
      });
    },

    onSearchTermUpdate: function(terms) {
      var self = this;
      self.terms = terms;
      self.count = 0;

      $.post( '/orgs', {
        terms: self.terms,
        page: self.count
      }).done(function( data ) {
          console.log('received data');
          self.collection = data;
          self.$el.hide(300);
          Organizations.vent.trigger('data:add')
          self.render(true);
          self.count++;
      });
    }
  });

  // Fake the collection.
  new Organizations.ContentView({ collection: Organizations.orgs });
  new Organizations.HeaderView();
  window.document.title = "OpenSource Organizations";

})();