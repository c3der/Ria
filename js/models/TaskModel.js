define( 
  var TaskModel = Backbone.RelationalModel.extends({
    // Define the relations of the object using relational.
    relations : [
      {
        type : Backbone.HasOne,
        key : 'userId',
        relatedModel : 'User',
        includeInJSON : Backbone.Model.prototype.idAttribute,
        collectionType : 'UserCollection'
      },
      {
        type : Backbone.HasOne,
        key : 'categoryId',
        relatedModel : 'Category',
        includeInJSON : Backbone.Model.prototype.idAttribute,
        collectionType : 'CategoryCollection'
      }
    ],
 
    defaults : {
      taskId : null,
      content : null,
      time : null,
      completed : false,
      userId : null,
      categoryId : null  
    },
 
    initialize : function() {
      // Empty function for future need.
    },
 
    /**
      * @param {Array} attrs The attributes to validate.
      * @returns {String} If something does not validate, return string
      * (throw error in backbone.) does not run set or save on model.
      */
    validate : function( attrs ) {
      if (  !attrs.taskId || !attrs.content || !attrs.time || !attrs.completed || 
            !attrs.userId || !attrs.categoryId ) {
             return "The task object does not validate."; 
      }
    }
  })
 
  return TaskModel;
);