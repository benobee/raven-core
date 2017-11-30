<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [getParentAttributes](#getparentattributes)
-   [compileHTML](#compilehtml)
-   [render](#render)
-   [convertStringToNode](#convertstringtonode)
-   [update](#update)
-   [results](#results)

## getParentAttributes

Parses attributes and stores them from parent node

**Parameters**

-   `target` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** any node

## compileHTML

This method compiles html as well as executes various
methods to

**Parameters**

-   `target` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** any node

## render

Determines if the traget is a string selector or an actual 
DOM element and renders it to the DOM.

**Parameters**

-   `node` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** any node
-   `target` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** any node

## convertStringToNode

Determines if the traget is a string selector or an actual 
DOM element and renders it to the DOM.

**Parameters**

-   `input` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** any node

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** actual DOM node

## update

Updates the rendered element using DOM diffing
via morphom.

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** any new data that matches the current

## results

Looks through the existing event array to see if the 
template has any declared to be used.

**Parameters**

-   `array` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 
-   `node` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

Returns **[results](#results)** any matched attributes
