define([
		'jQuery',
		'Underscore',
		'Backbone',
		'models/UserModel'
	],
	
	function( $, _, Backbone, UserModel ) {
		var createUserView = Backbone.View.extend({
			el : $('#create-user'),

			initialize : function( userCollection ) {
				// Show the dimmer.
				$('#dimmer').css( 'display', 'block' );

				this.template = _.template( $( '#create-user-template' ).html() );
				this.userCollection = userCollection;

				this.userCollection.on( 'add', this.addUser, this );

			},

			events : {
				'click #submit-create-user-form' : 'submitCreateUserForm',
				'keypress #input-username' : 'addOnEnter'
			},

			addUser : function( userModel ) {
				userModel.save();

				// remove the view and the dimmer.
				this.$el.remove();
				$('#dimmer').remove();
			},

			addOnEnter : function( e ) {
				if ( e.keyCode == 13) {
					this.submitCreateUserForm( e );
					return false;
				}
			},

			render : function() {
				$(this.el).html( this.template );
			},

			submitCreateUserForm : function( e ) {
				var username = this.$('#input-username').val();

				try {
					var model = new UserModel( { name : username } );
					this.userCollection.add( model );
					
					// Trigger a userAdded event.
					this.trigger( 'userAdded' , model );

				} catch( error ) {
					console.log( "Error : ", error.message );
				}
			}

		});

		return createUserView;
	}	
);