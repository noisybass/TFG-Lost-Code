/*
* Version TWUnit 1.0.0
*
* TWUnit is a tool that allow you test your Javascript code with assets.
* You can test a boolean option and shows in your html code differents
* messages depends on the results of the asserts.
*
* TWUnit also allows you to create modules to group your test and with this
* form do the work more easy and nice to see.
*
*
*
* The MIT License (MIT)
*
* Copyright (c) 2015 Samuel García Segador (ZaruWright)
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/



var TWUnit;

/*
* Initializes TWUnit with an empty void module and a empty module list.
*/
TWUnit = function (){

	/*Void Module*/
	this.numberOfAsserts = 0;
	this.asserts = new Array();
	this.allAssertsOk = true;

	/*Modules with names*/
	this.numberOfModules = 0;
	this.modules = new Array();
	this.allModulesOk = true;
}


/*
* Here there are functions that works with the DOM tree of HTML.
*/
TWUnit.HtmlInteract = {
	
	/*
	* This method write in the DOM tree a sorted list in which the elements
	* are the asserts from the runAsserts method.
	*
	* Arguments:
	*	1- text: The text to write on the sorted tree.
	*	2- iterator: If we use a void module, You musn't pass this argument
	*				 to this function. If we use a module, we will use the iterator
	*				 value to identify the id from the DOM tree. So we can get 
	*				 the DOM element from the tree to set the text value.
	*				 This is more clearly in the explanation from the
	*				 createHtmlCss function.
	*	3- passTheText: It shows if the asserts was successful.
	*/
	htmlAssertWrite: function(text, iterator, passTheText){
		var ol = document.getElementById("assertList" + iterator );
		if (passTheText){
			ol.innerHTML += "<div class='positive_test'>" +
								"<span class='glyphicon glyphicon-ok-sign'>" +
									//"<li id='assertList'>" + text + "</li>" +
								"</span>" + 
								text +
							"</div>";
		}
		else{
			ol.innerHTML += "<div class='negative_test'>" +
								"<span class='glyphicon glyphicon-remove-sign'>" +
									//"<li id='assertList'>" + text + "</li>" +
								"</span>" +
								text +
							"</div>";
		}
		
		
	},

	/*
	* This method write in the DOM tree a sorted list in which the elements
	* are the asserts from the runModules method.
	*
	* Arguments:
	*	1- text: The name from the module.
	*	2- iterator: We use it to named the differents sorted list from the 
	*				 DOM tree. This is more clearly in the explanation from the
	*				 createHtmlCss function.
	*/
	htmlModuleWrite: function(text, iterator){
		var ol = document.getElementById("moduleList");
		ol.innerHTML += "<li id='moduleList"+ iterator +"'> <h4>"+ text +"</h4> </li> <ol id='assertList"+ iterator +"'> </ol>"
	},

	/*
	* Creates a DOM tree that hang from the twunit element.
	*
	* Arguments:
	* 	1- thereAreModules: A boolean value that will create a DOM tree or another.
	*
	* The DOM tree will be the following if there aren't modules. We will create the 
	* assertList in the runAsserts function. We will use the htmlAssertWrite function
	* to facilitate our work.
	*
	*	<div id="twunit"> 
	*		<ol id='assertList'> 
	*			<div class="positive_test"><span class='glyphicon glyphicon-ok-sign'> text from assert 1 </span></div>
	*			<div class="negative_test"><span class='glyphicon glyphicon-remove-sign'>text from assert 2 </span></div>
	*			<div class="negative_test"><span class='glyphicon glyphicon-remove-sign'> text from assert 3 </span></div>
	*			............
	*			  .......
	*				 .
	*			<div class="positive_test"><span class='glyphicon glyphicon-ok-sign'> text from assert n </div>
	*		</ol>
	*	</div>
	*
	* The DOM tree will be the following if there are modules. We will create 
	* the assertList in the runAsserts function, the moduleList elements in 
	* runModules function. We will use htmlAssertWrite and htmlModuleWrite functions 
	* to facilitate our work.
	*
	*	<div id="twunit"> 
	*		<ol id='moduleList'> 
	*			<li id='moduleList0'> <h4> Name from the module list in zero position </h4> </li> 
	*			<ol id='assertList0'>
	*				<div class="positive_test"><span class='glyphicon glyphicon-ok-sign'> text from assert 0 from assertList0 </span></div>
	*				<div class="positive_test"><span class='glyphicon glyphicon-ok-sign'> text from assert 1 from assertList0 </span></div>
	*				<div class="positive_test"><span class='glyphicon glyphicon-ok-sign'> text from assert 2 from assertList0 </span></div>
	*				............
	*				  .......
	*					 .
	*				<div class="positive_test"><span class='glyphicon glyphicon-ok-sign'> text from assert n from assertList0 </span></div>
	*			</ol>
	*
	*			<li id='moduleList1'> <h4> Name from the module list in one position </h4> </li> 
	*			<ol id='assertList1'>
	*				<div class="positive_test"><span class='glyphicon glyphicon-ok-sign'> text from assert 0 from assertList1 </span></div>
	*				<div class="positive_test"><span class='glyphicon glyphicon-ok-sign'> text from assert 1 from assertList1 </span></div>
	*				<div class="positive_test"><span class='glyphicon glyphicon-ok-sign'> text from assert 2 from assertList1 </span></div>
	*				............
	*				  .......
	*					 .
	*				<div class="positive_test"><span class='glyphicon glyphicon-ok-sign'> text from assert n from assertList1 </span></div>
	*			</ol>
	*			............
	*		      .......
	*			     .
	*			<li id='moduleListm'> <h4> Name from the module list in m position </h4> </li> 
	*			<ol id='assertListm'>
	*				<div class="positive_test"><span class='glyphicon glyphicon-ok-sign'> text from assert 0 from assertListm </span></div>
	*				<div class="positive_test"><span class='glyphicon glyphicon-ok-sign'> text from assert 1 from assertListm </span></div>
	*				<div class="positive_test"><span class='glyphicon glyphicon-ok-sign'> text from assert 2 from assertListm </span></div>
	*				............
	*				  .......
	*					 .
	*				<div class="positive_test"><span class='glyphicon glyphicon-ok-sign'> text from assert n from assertListm </span></div>
	*			</ol>
	*
	*		</ol>
	*	</div>
	*/
	createHtmlCss: function(thereAreModules){
		var twunit = document.getElementById("twunit");
		if ( twunit ) {
			if (thereAreModules){
				twunit.innerHTML = "<ol id='moduleList'> </ol>";
			}
			else{
				twunit.innerHTML = "<ol id='assertList'> </ol>";
			}
		}
	},

	/*
	* Clear the childs from the twunit element in DOM tree.
	*/
	htmlClear: function() {
		$("#twunit").text("");
	}

};

TWUnit.prototype = {

	/*
	* Add a module to the module list. For do this, we copy the asserts from
	* the void module to the module list, and free the void module.
	*
	* Arguments:
	*	1- moduleName: The name of the module.
	*
	* A module has the follow appearance:
	*	{
	*		name: Name of the module.
	*		asserts: Asserts list that contain the module.
	*		numberOfAsserts: Number of asserts in the list.
	*		allAssertsOk: A boolean value that will be true if allAsserts are true.
	*	}
	*/
	addModule: function(moduleName){
		var module = {
			name: moduleName,
			asserts: this.asserts,
			numberOfAsserts: this.numberOfAsserts,
			allAssertsOk: true
		}

		this.modules[module.name] = module;
		this.numberOfModules++;

		this.cleanAsserts();

	},

	/*
	* Add an assert to the void module.
	*
	* Arguments:
	* 	1- assertName: The name of the assert to check.
	* 	2- assert: A boolean value.
	* 	3- comment: This comment will be seen if the assert is true.
	* 	4- clue: This comment will be seen if the assert is false.
	*
	* A assert has the follow appearance:
	*	{
	*		name: The name of the assert to check.
	*		assertValue: A boolean value.
	*		comment: This comment will be seen if the assert is true.
	*		clue: This comment will be seen if the assert is false.
	*	}
	*/
	addAssert: function(assertName, assert, comment, clue){

		var element = {
			name: assertName,
			assertValue: assert,
			comment: comment,
			clue: clue
		};

		this.asserts[element.name] = element;
		this.numberOfAsserts++;
	},

	/*
	* Free the void module
	*/
	cleanAsserts: function(){
		this.asserts = new Array();
		this.numberOfAsserts = 0;
	},

	/*
	* This function can be use from two posibilites:
	*	1- To run a void module
	*	2- To run a module with name
	*
	* If we want to run a void module, we must to call this function
	* without arguments, like that twunit.runAsserts();.
	* The another case only is used from the runModules function to run 
	* the list of asserts for each module.
	*
	* This function only must be called from your code if you are in the first case.
	*
	* Arguments:
	*	1- iterator: In the second case, we use this argument to know what listAssert
	*				 insert the text in the DOM tree
	*	2- moduleName: The name of the module to can asign values to the module list.	
	*/
	runAsserts: function(iterator, moduleName){

		if (!iterator && iterator != 0 && !moduleName){
			TWUnit.HtmlInteract.htmlClear();
			TWUnit.HtmlInteract.createHtmlCss();
			list = this.asserts;
			allAssertsOk = this.allAssertsOk;
			it = "";
		}
		else{
			list = this.modules[moduleName].asserts;
			allAssertsOk = this.modules[moduleName].allAssertsOk;
			it = iterator;
		}

		allAssertsOk = true;

		for (assertElement in list) {
			if (list[assertElement].assertValue){
				
				TWUnit.HtmlInteract.htmlAssertWrite(list[assertElement].name + ": " + list[assertElement].comment, it, true);
				console.log(list[assertElement].comment);
			}
			else{
				
				TWUnit.HtmlInteract.htmlAssertWrite(list[assertElement].name + ": " + list[assertElement].clue, it, false);
				console.log(list[assertElement].clue);
				allAssertsOk = false;
			}
		}

		if ( !iterator && iterator != 0 && !moduleName){
			this.allAssertsOk = allAssertsOk;
		}
		else{
			this.modules[moduleName].allAssertsOk = allAssertsOk;
		}
	},

	

	/*
	* This function is used to run one or more modules.
	*
	* IMPORTANT!! this method don't run the void module, only the list of modules.
	* If you want run the void module use the runAsserts function.
	*/
	runModules: function(){
		
		TWUnit.HtmlInteract.htmlClear();
		TWUnit.HtmlInteract.createHtmlCss(true);

		this.allModulesOk = true;
		that = this;

		var index = 0;
		for (element in this.modules){
			console.log("Module:" + this.modules[element].name);
			TWUnit.HtmlInteract.htmlModuleWrite(this.modules[element].name, index);
			this.runAsserts(index, element);
			if (!this.modules[element].allAssertsOk){
				this.allModulesOk = false;
			}
			++index;
		}

	},

	/*
	* If all asserts from the void module are true, this function will return true. 
	* False in another case.
	*/
	assertsOk: function(){
		return this.allAssertsOk;
	},

	/*
	* If all modules are true, this function will return true. 
	* False in another case.
	*/
	modulesOk: function(){
		return this.allModulesOk;
	},

	/*
	* If the asserts from the module called named are true, this function will return true.
	*/
	moduleOk: function(name){
		return this.modules[name].allAssertsOk;
	}

};