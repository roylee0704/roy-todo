Tasks = new Mongo.Collection("tasks");




if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.helpers({
    'tasks': Tasks.find({}, {sort: {'createdAt': -1}})
  });



  Template.body.events({
    'submit .new-task': function (event) {
      var text = event.target.text.value;

      if(! text) {
        return false;
      }

      Tasks.insert({
        'text': text,
        'createdAt': new Date() //current time
      });

      event.target.text.value = "";

      return false;
    },

    'click .delete': function(event) {
      Tasks.remove(this._id);
    },

    'click .toggle-checked': function(event) {

      //console.log(this);
      Tasks.update(this._id, {$set: { 'checked': ! this.checked}});
    }

  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
