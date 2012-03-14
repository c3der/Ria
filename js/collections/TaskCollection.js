define([
	'Backbone',
	'models/TaskModel'
	],

	function( Backbone, TaskModel ) {
	
	var TasksCollection = Backbone.Collection.extend({
		model : TaskModel,

		localStorage : new Store("Tasks"),

		initialize : function() {
			this.fetch();
		},

		comparator : function( model ) {
			var completed = model.get('completed');
			
			if ( completed === true ) {
				return model.get( 'time' );	
			} else {
				return -model.get('time');
			}
			
		}
	});

	return TasksCollection;	

	}
);