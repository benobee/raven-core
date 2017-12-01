### Table of Contents

-   [Raven.component](#ravencomponent)

## Raven.component

Component factory method

**Parameters**

-   `componentName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Component name
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
