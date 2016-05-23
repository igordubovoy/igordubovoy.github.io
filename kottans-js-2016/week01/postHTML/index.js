"use strict"

const PostHTML = require("posthtml");
const html =
      `
      <em class="col-sm-push-7">Hello world</em>
      <p class="col-lg-offset-11 super col-sm-push-7">sdfsf</p>
      `
const bootstrapClasses = /(?:col)-(?:lg|xs|sm|md)-(?:(?:\d{1,2})|(?:(?:push|pull|offset)-\d{1,2}))/ig

const plugin = tree => tree
  .match({tag:"p"}, node => {
    let matchClasses = node.attrs.class.match(bootstrapClasses)
    let nodeClasses = node.attrs.class
    nodeClasses
      .split(' ')
      .forEach(function(elem){
        matchClasses.forEach(function(matchElem, index) {
          console.log(matchElem)
          if (elem === matchElem){
            nodeClasses.splice(elem, 1)
            index++;
          }
        })
      })
    console.log(nodeClasses)
    return node
  })



PostHTML([plugin])
  .process(html)
  .then(result =>
  {
    console.log(result.html)
  })
