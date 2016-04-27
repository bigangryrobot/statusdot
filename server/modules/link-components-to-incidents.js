let linkComponentsToIncidents = () => {
  var countOnull= 0;
  var componentIds = [];
  var components = Components.find();
  _.forEach(components.fetch(), function(component){
    componentIds.push(component._id);
    if (typeof component.dependentsIds != "undefined" && component.dependentsIds != null && component.dependentsIds.length > 0) {
      countOnull ++;
    }
    if (typeof component.incidentIds != "undefined" && component.incidentIds != null && component.incidentIds.length > 0) {
      countOnull ++;
    }
    if (typeof component.dependenciesIds != "undefined" && component.dependenciesIds != null && component.dependenciesIds.length > 0) {
      countOnull ++;
    }
  });

  var incidentIds = [];
  var incidents = Incidents.find();
  _.forEach(incidents.fetch(), function(incident){
    incidentIds.push(incident._id);
    if (typeof incident.componentIds != "undefined" && incident.componentIds != null && incident.componentIds.length > 0) {
      countOnull ++;
    }
  });

if (countOnull < 15 ) {
    var incidents = Incidents.find();
    _.forEach(incidents.fetch(), function(incident){

      var thisComponents = [];
      _.each(_.range(Math.floor((Math.random() * 10) + 1)), function(){
        thisComponents.push(componentIds[Math.floor(Math.random()*componentIds.length)]);
      });

      _.forEach(thisComponents, function(component){
        Components.update(
          {_id : component },
          {$push:{
            incidentIds : incident._id,
            }
          }
        );
      });

      Incidents.update(
        {_id : incident._id },
        {$set:{
          componentIds : thisComponents
          }
        }
      );
      console.log(incident);      
    });

    var components = Components.find();
    _.forEach(components.fetch(), function(component){
      
      var thisDependents = [];
      _.each(_.range(Math.floor((Math.random() * 10) + 1)), function(){
        thisDependents.push(componentIds[Math.floor(Math.random()*componentIds.length)]);
      });

      var thisDependencies = [];    
      _.each(_.range(Math.floor((Math.random() * 10) + 1)), function(){
        thisDependencies.push(componentIds[Math.floor(Math.random()*componentIds.length)]);
      });

      Components.update(
        {_id : component._id },
        {$set:{
          dependentsIds : thisDependents,
          dependenciesIds : thisDependencies
          }
        }
      );
      console.log(component);  
    });
  }
};

Modules.server.linkComponentsToIncidents = linkComponentsToIncidents;

