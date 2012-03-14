define([
      'Backbone'
    ],
  function( Backbone ) {
    var TaskModel = Backbone.RelationalModel.extend({
      
      toggleCompleted : function() {
        if ( this.attributes.completed === false ) {
          this.set( { completed : true } );
        } else {
          this.set( { completed : false } );
        }

        this.save();
      },
      
      /**
        * @param {Array} attrs The attributes to validate.
        * @returns {String} If something does not validate, return string
        * (throw error in backbone.) does not run set or save on model.
        */
      validate : function( attrs ) {
         if (  !attrs.content || !attrs.user || !attrs.category || !attrs.time ) {
               return "The task object does not validate.";
        }
      }  
    });

    return TaskModel;
  }
);