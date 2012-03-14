define( 
	[
		'Backbone',
		'models/TaskModel',
		'TaskCollection'
	],

	function( Backbone, TaskModel, TaskCollection ) {
		var UserModel = Backbone.RelationalModel.extend({
			relations : [
				{
		          type : Backbone.HasMany,
		          key : 'task',
		          relatedModel : TaskModel,
		          includeInJSON : Backbone.Model.prototype.idAttribute,
		          collectionType : TaskCollection,
		          reverseRelation : {
		            type : Backbone.HasOne,
		            key : 'user'
		          }
		        }
			],
			/**
			  * @param {Array} attrs The attributes to validate.
			  * @returns {String} If something does not validate, return string
			  * (throw error in backbone.) does not run set or save on model.
			  */
			validate : function( attrs ) {
				if ( !attrs.name ) {
					return "The User object does not validate."; 
				}
			}
		});

		return UserModel;
	}
);