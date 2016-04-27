Users = React.createClass({
  mixins: [ ReactMeteorData ],


      'change [name="userRole"]': function( event, template ) {
        let role = $( event.target ).find( 'option:selected' ).val();

        Meteor.call( "setRoleOnUser", {
          user: this._id,
          role: role
        }, ( error, response ) => {
          if ( error ) {
            Bert.alert( error.reason, "warning" );
          }
        });
      },
      
      'click .revoke-invite': function( event, template ) {
        if ( confirm( "Are you sure? This is permanent." ) ) {
          Meteor.call( "revokeInvitation", this._id, function( error, response ) {
            if ( error ) {
              Bert.alert( error.reason, "warning" );
            } else {
              Bert.alert( "Invitation revoked!", "success" );
            }
          });
        }
      },

  getMeteorData() {
    Meteor.subscribe( 'users' );

    return {
      users: Meteor.users.find().fetch().map( ( user ) => {
        return { uid: user._id, emails: user.emails, roles: user.roles };
      }),
      invitations: Invitations.find().fetch().map( ( invitation ) => {
        return { uid: invitation._id, invitation: invitation.email, token: invitation.token, role: invitation.role, date: invitation.date};
      })      
    };
  },

  isCurrentUser(userId){
    if (userId === Meteor.userId()){
      return <span className="label label-success">You!</span>
    }
  },

  disableIfAdmin(userId){
    if ( Meteor.userId() === userId ) {
      return Roles.userIsInRole( userId, 'admin' ) ? "disabled" : "";
    }
  },

  renderUserTable( users ) {
    if ( users.length > 0 ) {
      return <table className="table table-bordered">
          <thead>
            <tr>
              <th className="text-left">Email Address</th>
              <th className="text-left">Role</th>              
            </tr>
          </thead>
          <tbody>
        { users.map( ( user ) => {
          return <tr className={user.uid}>
            <td className="text-left text-middle">{user.emails[0].address} {this.isCurrentUser(user.uid)}</td>
            <td className="text-left text-middle">
              <select disabled={this.disableIfAdmin(user.uid)} value={user.roles[0]} name="userRole" className="form-control">
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>                
                <option value="employee">Employee</option>
              </select>
            </td>
            </tr>;
        })}
      </tbody>
      </table>;
    } else {
      return <WarningAlert>No users found.</WarningAlert>;
    }
  },

  renderInviteTable( invitations ) {
    let { formatLastUpdate } = ReactHelpers;

    if ( invitations.length > 0 ) {
      return <table className="table table-bordered">
          <thead>
            <tr>
              <th className="text-left">Email Address</th>
              <th className="text-left">Type</th>
              <th className="text-left">Date Sent</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
        { invitations.map( ( invitation ) => {
          return <tr className={invitation.uid}>
            <td className="text-left text-middle">{invitation.email}</td>
            <td className="text-left text-middle">{invitation.role}</td>
            <td className="text-left text-middle">{ formatLastUpdate(invitation.date) }</td>
            <td className="text-center">
              <button type="button" className="btn btn-danger revoke-invite">Revoke</button>
            </td>            
            </tr>;
        })}
      </tbody>
      </table>;
    } else {
      return <WarningAlert>No invitations found.</WarningAlert>;
    }
  },

  render() {   
      let users = this.data.users,
    invitations = this.data.invitations;

    return  <div className="users">
    <GridRow>

    <div className="container">
      <GridColumn className="col-lg-12">
      <div className="page-header clearfix">
        <h4 className="pull-left">Invitations</h4>
        <button className="btn btn-default  pull-right" data-toggle="modal" data-target="#send-invitation-modal">Send Invitation</button>
      </div>
      { this.renderInviteTable( invitations ) }  
      <div className="clearfix">
      <h4 className="page-header">Users</h4>
      </div>
      { this.renderUserTable( users ) }
      </GridColumn>
      </div>
    </GridRow>
    </div>;
  }
});