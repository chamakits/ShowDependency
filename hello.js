goog.require('goog.dom');
goog.require('goog.array');
goog.require('goog.structs.TreeNode');


var currLabel="me:";
var parentLabel="parent:";
var textDivided=[];
var textDividedOrig=[];
var nodeArray = [];
var currKey=0;
var allTreeNodes={};
//allTreeNodesList.forEach(function(curr){console.log(curr.value_)})
var allTreeNodesList=[];
var allParentNodes = {};
var allParentNodesList = [];

function sayHi() {
  var newHeader = goog.dom.createDom('h1', {'style': 'background-color:#EEE'},
    'Hello world!');
  goog.dom.appendChild(document.body, newHeader);
}

function buildTree(){
    allTreeNodes={};
    allTreeNodesList=[];
    var textArea = document.getElementById('sometext');
    textDividedOrig = textArea.value.split('\n');

    textDivided = textDividedOrig.filter
    (
        function(curr)
        {
            return filterBy(curr,[currLabel,parentLabel])
        }
    );

    nodeArray=[new  goog.structs.TreeNode(1, '1'),new  goog.structs.TreeNode(1, '1')];

    var pairs= createPairs(textDivided);

    pairs.forEach(setNodeFromPair);

    console.log(pairs)
    
}

function filterBy(str,filters)
{
    var isUnfiltered=false;
    
    for(var counter=0; counter < filters.length && !isUnfiltered; ++counter)
    {
        //isUnfiltered = (str.indexOf(filters[counter]) !=-1);
        isUnfiltered = contains(str,filters[counter]);
    }

    return isUnfiltered;
}

function contains(target,toContain)
{
    return target.indexOf(toContain) != -1;
}

function CurrParentPair (curr,parent) 
{
    this.curr = curr;
    //this.parent = parent;

    this.setParent = function(parent)
    {
        this.parent = parent;
    }
    
}

function createPairs(listOfText)
{
    var pairList=[];
    var currPair;
    var currLine;
    for(var counter = 0 ; counter < listOfText.length ; ++counter)
    {
        currLine=listOfText[counter];
        if(contains(currLine,currLabel))
        {
            currPair = new CurrParentPair(currLine);
        }
        else if(contains(currLine,parentLabel))
        {
            currPair.setParent(currLine);
            pairList.push(currPair);
        }

    }

    return pairList;
}

function createTreeNodes (listOfPairs)
{
    var currPair;
    
    for(var counter=0; counter<listOfPairs.length; ++counter)
    {
        currPair = listOfPairs[counter];
        setNodeFromPair(currPair);
    }
}

function setNodeFromPair(currPair)
{
    var currNode;
    var currNodeParent;
    var currKeyStr;

    currKeyStr=currPair.curr.replace(currLabel,'');
    currNode = allTreeNodes[currKeyStr];
    currKeyStr=currPair.parent.replace(parentLabel,'');
    currNodeParent = allTreeNodes[currKeyStr];

    if(currNode == undefined)
    {
        currKeyStr=currPair.curr.replace(currLabel,'');
        currNode = new goog.structs.TreeNode(currKey++,currKeyStr);
        allTreeNodes[currKeyStr] = currNode;
        allTreeNodesList.push(currNode);
    }

    if(currNodeParent == undefined)
    {
        currKeyStr=currPair.parent.replace(parentLabel,'');
        currNodeParent = new goog.structs.TreeNode(currKey++,currKeyStr);
        allTreeNodes[currKeyStr] = currNodeParent;
        allTreeNodesList.push(currNodeParent);
        
    }

    if(!currNodeParent.contains(currNode))
    {
        currNodeParent.addChild(currNode);
    }

    //finding if parent has been added to parent list.
    currKeyStr=currPair.parent.replace(parentLabel,'');
    currNodeParent=allParentNodes[currKeyStr];
    if(currNodeParent == undefined)
    {
        allParentNodes[currKeyStr]=currNodeParent;
        allParentNodesList.Push(currNodeParent);
    }

    
}

function setRoot(treeNodes)
{
    var currNode;
    var nextNode;
    var containsIt;
    
    for(var counter= 0; counter < treeNodes.length; ++counter)
    {
        currNode = treeNodes[counter];
        for(var counter2 = counter; counter2<treeNodes.length; ++counter2)
        {
            nextNode = treeNodes[counter2];
            //TODO CONTINUE HERE!
        }
    }
}

function drawTreeNodes(treeNodes)
{
    
}