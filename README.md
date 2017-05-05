******************************************** 
# RAVEN CORE

**Description**

Core app structure, with publish and subscribe events. ( Inspired by Meteor.js syntax. )

********************************************

Usage

    import Raven from 'raven-core';   

********************************************

Raven Methods

Example: 

  Raven.methods({
     add({id, name}) {
        collection.add(id, name);
     },
     remove({ id }) {
        collection.remove(id);
     }
  });

  Raven.call("add", {
      id: "1284",
      name: "Bob Woodward"
  });

********************************************

Publish and Subscribe

Example: 

  Raven.subscribe("event-loaded", () => {
      this.finishLoader();
  });

  window.onload = Raven.publish("event-loaded");
  

********************************************

Raven.extend(Object);

Example: 

  Raven.extend({
    methodName() {
      this.runMethodCode();
    }
  });

********************************************
