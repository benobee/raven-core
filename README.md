<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [Raven](#raven)
-   [Raven.on](#ravenon)
-   [Raven.emit](#ravenemit)
-   [Raven.component](#ravencomponent)
-   [RavenComponent](#ravencomponent-1)

## Raven

## Raven.on

PUB/SUB Pattern. Topic listener that triggers a callback when the 
particular topic is published.

**Parameters**

-   `event` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `listener` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

## Raven.emit

PUB/SUB Pattern.

**Parameters**

-   `event` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `data` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

## Raven.component

Component factory method

**Parameters**

-   `componentName` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Component name
-   `config` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Component configurations

**Examples**

```javascript
Raven.component("Button", {
        el: ".button", 
        data() {  
            return {
                buttonName: 'button-click'
            }
        },
        methods: {
            buttonClick() {
                alert("CLICKED");
            }
        }
    });
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** The custom component

## RavenComponent
