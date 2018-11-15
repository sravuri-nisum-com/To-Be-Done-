App.Collections.Contacts = Backbone.Collection.extend({
  model: App.Models.Contact,
  url: 'http://localhost:3200/contacts'
});