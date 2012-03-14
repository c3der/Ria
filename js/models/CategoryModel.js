define([
	'Backbone',
	'TaskCollection',
	'models/TaskModel'
	], 
	
	function( Backbone, TaskCollection, TaskModel ) {
		var CategoryModel = Backbone.RelationalModel.extend({
			relations : [
		        {
		          type : Backbone.HasMany,
		          key : 'task',
		          relatedModel : TaskModel,
		          includeInJSON : Backbone.Model.prototype.idAttribute,
		          collectionType : TaskCollection,
		          reverseRelation : {
		            type : Backbone.HasOne,
		            key : 'category'
		          }
		        }
		      ],
			/**
			  * @param {Array} attrs The attributes to validate.
			  * @returns {String} If something does not validate, return string
			  * (throw error in backbone.) does not run set or save on model.
			  */
			validate : function( attrs ) {
				if (  !attrs.label ) {
				       return "The category object does not validate."; 
				}
			}
		});

	return CategoryModel;
	}
);