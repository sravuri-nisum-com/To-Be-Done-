
var mc_app = mc_app || {};
mc_app.EventHelper = _.extend({}, Backbone.Events);

mc_app.ProductDetailsModel = Backbone.Model.extend({
  defaults: {
    title: '',
    imageURL: '',
    colorChoices: [],
    sizeChoices: [],
    quantity: []
  },
  validate: function (attrs) {

    if (!attrs.title || !attrs.title === 'string') {
      return 'Missing title.';
    }
    if (!attrs.imageURL || !attrs.imageURL === 'string') {
      return ' Missing image URL.';
    }

    if (!Array.isArray(attrs.colorChoices) || !attrs.colorChoices.every(color => typeof color === 'string')) {
      return 'Choice of color  should be an array of strings.';
    }

    if (!Array.isArray(attrs.sizeChoices) || !attrs.sizeChoices.every(validateSize)) {
      return 'Choices must be array of object containing string of value and text.';
    }

    function validateSize(size) {
      if (!size.hasOwnProperty('text') || !size.hasOwnProperty('value')) {
        return false
      } else {
        return typeof size['text'] === 'string' && typeof size['value'] === 'string';
      }
    }
    if (isNaN(attrs.quantity) || attrs.quantity <= 0) {
      return 'Quantity should be a positive integer';
    }

  }
});


//Product View 


mc_app.ProductDetailsView = Backbone.View.extend({
  className: 'mc-demo',
  id: 'product-details',
  initialize: function () {
    mc_app.EventHelper.on('invalidProductDetails', this.invalidProductDetails, this);
    mc_app.EventHelper.on('validOrderDetails', this.validOrderDetails, this);
  },
  invalidProductDetails() {
    if (this.$('.incorrect_details').hasClass('hidden')) {
      this.$('.incorrect_details').removeClass('hidden');
    }
  },
  validOrderDetails: function () {
    if (!this.$('.incorrect_details').hasClass('hidden')) {
      this.$('incorrect_details').addClass('hidden');
    }
  },
  events: {
    'click #address-view': 'showShippingAddressView',
    'click input': 'updateProductDetails'
  },
  showShippingAddressView: function (e) {
    e.preventDefault();
    this.$('#address-view').addClass('hidden');
    mc_app.EventHelper.trigger('showShippingAddressView');
  },
  updateProductDetails: function (e) {
    mc_app.EventHelper.trigger('updateProductDetails', {
      attr: e.target.name,
      value: e.target.value
    });
  },
  render: function () {
    let productTemplate = Handlebars.compile($('#productDetailsTemplate').html());
    let modelData = productTemplate(this.model.toJSON());
    this.$el.html(modelData);

    return this;
  }
});



mc_app.ShippingAddressView = Backbone.View.extend({
  className: 'mc-demo hidden',
  id: 'address-details',
  initialize: function () {
    mc_app.EventHelper.on('showShippingAddressView', this.showShippingAddressView, this);
    mc_app.EventHelper.on('validOrderDetails', this.validOrderDetails, this);
    mc_app.EventHelper.on('invalidAddress', this.invalidAddress, this);
  },
  showShippingAddressView: function () {
    this.$el.removeClass('hidden');
  },
  validOrderDetails: function () {
    if (!this.$('.incorrect_details').hasClass('hidden')) {
      this.$('.incorrect_details').addClass('hidden');
    }
    this.$('#place-order').addClass('hidden');
  },
  invalidAddress: function () {
    if (this.$('.incorrect_details').hasClass('hidden')) {
      this.$('.incorrect_details').removeClass('hidden');
    }
  },
  events: {
    'input input': 'updateShippingAddressDetails',
    'click #place-order': 'showOrderDetailsView'
  },
  updateShippingAddressDetails: function (event) {
    const $inputValue = $(`input[name="${event.target.name}"]`).val();
    mc_app.EventHelper.trigger('updateShippingAddressDetails', {
      attr: event.target.name,
      value: $inputValue
    });
  },
  showOrderDetailsView: function () {
    mc_app.EventHelper.trigger('showOrderDetailsView');
  },
  render: function () {
    let addressTemplate = Handlebars.compile($('#ShippingAddressTemplate').html());
    this.$el.html(addressTemplate);

    return this;
  }
});
mc_app.OrderDetailsModel = Backbone.Model.extend({
  defaults: {
    title: '',
    colors: '',
    sizes: '',
    qty: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
  },
  validate: function (attrs) {
    if (!attrs.colors || !attrs.sizes || !attrs.qty) {
      return 'Incomplete product details.';
    }

    if (!attrs.address1 || !attrs.city || !attrs.state || !attrs.zipcode) {
      return 'Incomplete address details.';
    }

    if (attrs.zipcode) {
      if (isNaN(attrs.zipcode) || attrs.zipcode.length !== 5) {
        return 'Incorrect zipcode.';
      }
    }
  }
});
mc_app.OrderDetailsView = Backbone.View.extend({
  className: 'mc-demo hidden',
  id: 'analyticsInfo',
  initialize: function () {
    this.listenTo(this.model, 'change', this.render)
    mc_app.EventHelper.on('showOrderDetailsView', this.showOrderDetailsView, this);
    mc_app.EventHelper.on('updateProductDetails', this.updateData, this);
    mc_app.EventHelper.on('updateShippingAddressDetails', this.updateData, this);
  },
  showOrderDetailsView: function () {
    const self = this;
    if (!self.model.isValid()) {
      switch (self.model.validationError) {
        case 'Incomplete address details.':
          mc_app.EventHelper.trigger('invalidAddress');
          break;
        case 'Incorrect zipcode.':
          mc_app.EventHelper.trigger('invalidAddress');
          break;
        case 'Incomplete product details.':
          mc_app.EventHelper.trigger('invalidProductDetails');
          break;
      }
    } else {
      self.$el.removeClass('hidden');
      mc_app.EventHelper.trigger('validOrderDetails');
    }
  },
  updateData: function (data) {
    this.model.set(data.attr, data.value);
  },
  render: function () {
    let template = Handlebars.compile($('#orderDetailsTemplate').html());
    let html = template(this.model.toJSON());
    this.$el.html(html);

    return this;
  }
});

$(function () {


  let productDetailsModel = new mc_app.ProductDetailsModel({
    title: 'Nice dress for all ocassions !',
    imageURL: 'https://demo.themeum.com/wordpress/winkel/wp-content/uploads/2017/08/product-img27.jpg',
    colorChoices: ['Red', 'Yellow', 'Pink'],
    sizeChoices: [{
        value: '2S',
        text: 'Small'
      },
      {
        value: '3M',
        text: 'Medium'
      },
      {
        value: '4L',
        text: 'Large'
      }
    ],
    quantity: [1, 2, 3, 4, 5]
  });
  let productDetailsView = new mc_app.ProductDetailsView({
    model: productDetailsModel
  });

  let shippingAddressView = new mc_app.ShippingAddressView();

  let orderDetails = new mc_app.OrderDetailsModel({
    title: productDetailsModel.get('title'),
    colors: productDetailsModel.get('colorChoices')[0],
    sizes: productDetailsModel.get('sizeChoices')[0].value,
    qty: 1
  });
  let orderDetailsView = new mc_app.OrderDetailsView({
    model: orderDetails
  });

  $('#main-container').append(productDetailsView.render().$el);
  $('#main-container').append(shippingAddressView.render().$el);
  $('#main-container').append(orderDetailsView.render().$el);
});