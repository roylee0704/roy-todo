Tasks = new Mongo.Collection("tasks");




if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.helpers({
    'tasks': function() {

      if(Session.get('hideCompleted')) {
        return Tasks.find({'checked': {$ne: true} }, {sort: {'createdAt': -1}});
      }

      return Tasks.find({}, {sort: {'createdAt': -1}});
    },

    'hideCompleted': function() {
      return Session.get('hideCompleted');
    },

    'incompleteCount': function() {
      return Tasks.find({'checked': {$ne: true}}).count();
    }

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
      Tasks.update(this._id, {$set: { 'checked': ! this.checked}});
    },

    'click .hide-completed input': function(event) {
      var hideCompleted = event.target.checked;
      Session.set('hideCompleted', hideCompleted);
    }

  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
