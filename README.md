### Table of Contents

-   [component.executeComponent](#componentexecutecomponent)
-   [component.getParentAttributes](#componentgetparentattributes)
-   [component.compileHTML](#componentcompilehtml)
-   [component.render](#componentrender)
-   [component.convertStringToNode](#componentconvertstringtonode)
-   [component.update](#componentupdate)
-   [component.MapAttributes](#componentmapattributes)
-   [component.bindEvents](#componentbindevents)
-   [component.parseAttributes](#componentparseattributes)
-   [component.parseChild](#componentparsechild)
-   [component.findReturnableValues](#componentfindreturnablevalues)
-   [component.parseHTML](#componentparsehtml)
-   [component.formatString](#componentformatstring)
-   [component.formatHTML](#componentformathtml)

## component.executeComponent

All methods and variables from the initial options 
will be exceuted and stored accordingly. Making this
separate method of readability.

**Parameters**

-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** for the component

## component.getParentAttributes

Parses attributes and stores them from parent node

**Parameters**

-   `target` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** any node

## component.compileHTML

This method compiles html as well as executes various
methods to

**Parameters**

-   `target` **[HTMLHtmlElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHtmlElement)** any node

Returns **[HTMLHtmlElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHtmlElement)** node

## component.render

Determines if the traget is a string selector or an actual 
DOM element and renders it to the DOM.

**Parameters**

-   `node` **[HTMLHtmlElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHtmlElement)** 
-   `target` **[HTMLHtmlElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHtmlElement)** 

## component.convertStringToNode

Determines if the traget is a string selector or an actual 
DOM element and renders it to the DOM.

**Parameters**

-   `input` **[HTMLHtmlElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHtmlElement)** 

Returns **[HTMLHtmlElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHtmlElement)** input

## component.update

Updates the rendered element using DOM diffing
via morphom.

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** any new data that matches the current

## component.MapAttributes

Looks through the existing event array to see if the 
template has any declared to be used.

**Parameters**

-   `array` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 
-   `node` **[HTMLHtmlElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHtmlElement)** 

Returns **results** any matched attributes

## component.bindEvents

All available events will be stored in this attributes
array for use in the component. More will be added over
time after testing.

**Parameters**

-   `node` **[HTMLHtmlElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHtmlElement)** 

## component.parseAttributes

This is for custom attributes in the component such as "repeat".
The method will search for the specified attribute and execute.
The reason is to provide a short hand way for custom functionality.

**Parameters**

-   `node` **[HTMLHtmlElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHtmlElement)** 

Returns **[HTMLHtmlElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHtmlElement)** clone

## component.parseChild

For generating lists, one child component is used as a
template to genearte all the other children with all their
own unqiue data points.

**Parameters**

-   `html` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `listData` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 
-   `parse` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** HTMLArray

## component.findReturnableValues

To match the string brackets with the data we will need
to iterate through the object to find returnable values.

**Parameters**

-   `str` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `obj` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** search

## component.parseHTML

Search for variables inside brackets

**Parameters**

-   `html` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** && {Object} data object literal data structure

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Returns the compiled and formatted HTML based on the data

## component.formatString

**Parameters**

-   `str` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** returns formatted string

## component.formatHTML

remove all whitespace, tabs and return lines from string

**Parameters**

-   `str` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** any string

Returns **any** formatted HTML
