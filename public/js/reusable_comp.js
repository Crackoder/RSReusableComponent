Backbone.emulateJSON = true;
template = "<div class='component'> \
    <label><%= input.get('name') %>: </label>\
    <% if(input.get('edit')){ %>\
        <select id='selected_opt'>\
            <% _.each( input.get('values'), function( value ){ %>\
              <option value=<%= value.name%>><%= value.name%></option>\
            <% }); %>\
        </select>\
        <a href='#' class='cancel'>Cancel</a>\
        <a href='#' class='save'>Save</a>\
    <% }else{ %>\
        <%= input.get('selected_value') || 'Unset' %>\
        <a href='#' class='edit'>Edit<a>\
    <% } %>\
    <div>";

Input = Backbone.Model.extend({
    edit:false,

    changeEditMode: function() {
        this.set({edit: !this.get("edit")});
    }
});

AllInputs = Backbone.Collection.extend({
    model: Input,
    url: '/input/'
});

EditableItem = Backbone.View.extend({
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
      this.model.changeEditMode();
  },

  update: function(){
    var selected = $('#selected_opt').val();
    this.model.set({selected_value: selected});
    this.model.save();
    this.model.changeEditMode();
  },

  render: function(){
    var compiled_template = _.template( template );
    this.$el.html( compiled_template( { input: this.model } ) );
  }

});