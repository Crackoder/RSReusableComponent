Backbone.emulateJSON = true;
template = "<div class='component'> \
    <label><%= input.get('name') %>: </label>\
    <% if(edit){ %>\
        <select id='selected_opt'>\
            <% _.each( input.get('values'), function( value ){ %>\
              <option value=<%= value.name%> <%= value.name==input.get('selected_value')?'selected':'' %>><%= value.name%></option>\
            <% }); %>\
        </select>\
        <a href='#' class='cancel'>Cancel</a>\
        <a href='#' class='save'>Save</a>\
    <% }else{ %>\
        <%= input.get('selected_value') || 'Unset' %>\
        <a href='#' class='edit'>Edit<a>\
    <% } %>\
    <div>";

InputModel = Backbone.Model.extend({
  urlRoot: '/input'
});

ItemView = Backbone.View.extend({

  edit:false,

  initialize: function(){
      this.listenTo(this.model, 'change', this.render);
      this.$el.html("Name: Unset");
  },

  events: {
      "click .edit"   : "changeEditMode",
      "click .cancel" : "changeEditMode",
      "click .save"   : "update"
    },

  changeEditMode: function() {
      this.edit = !this.edit;
      this.render();
  },

  update: function(){
    var selected = this.$('#selected_opt').val();
    this.model.set({selected_value: selected});
    this.model.save();
    this.changeEditMode();
  },

  render: function(){
    var compiled_template = _.template( template );
    this.$el.html( compiled_template( { input: this.model, edit: this.edit } ) );
  }

});