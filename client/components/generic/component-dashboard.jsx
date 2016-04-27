ComponentDashboard = React.createClass({ 
  renderListGroup() {
      let { formatLastUpdate } = ReactHelpers;
      return <div className="component-tiles">
<table className="table borderless table-hover table-condensed">
   <thead>
      <tr>
         <th></th>
         {this.props.environments.map( ( environment ) => {   
           return <th><a><span className="text-muted">{environment.name}</span></a></th>;
         })}
      </tr>
   </thead>
   <tbody>           
        {this.props.items.map( ( item ) => {          
          return <tr ng-repeat="member in dashboard.dashboardmembers | filter:query" className="ng-scope">
         <th className="component-tile">
            <span className="hidden-xs"><h4><a className="project-name ng-binding" href={ `/components/${ item.slug }`}>{ item.name }</a></h4></span>
            <span className="visible-xs"><a className="project-name ng-binding truncate" href={ `/components/${ item.slug }`}>{ item.name }</a></span>
         </th>
        {this.props.environments.map( ( environment ) => {
         return <td className="release-body ng-scope" ng-repeat="a in member.dashboardmemberstates" id="1__147">
            <a className="btn text-white btn-success" ng-className="{success:'btn-success', failed:'btn-danger', 'unknown':'btn-info'}[a.state]" href="https://deploy.solarcity.com/app#/tasks/ServerTasks-6334">
            <span data-tip="blarg blarg" data-or="" data-original-title="" title=""><i className="fa fa-times" ng-className="{success:'fa-check', failed:'fa-times', 'unknown':'fa-question'}[a.state]"></i></span>
            <span className="deployment-square-info hidden-xs hidden-sm">
            <span className="version  ng-binding">4.44023</span>
            </span>
            </a>
         </td>;
        })}
      </tr>;
          })}

   </tbody>
</table>            
      </div>;
  },
  render() {
    return this.renderListGroup();
  }
});