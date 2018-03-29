/**
 * translations.js
 *
 * @author CloudPact Technologies
 * @description : Juci language translations based on the language assign in dataset
 */
(function(){
	juci.addDataset("juci_languages",[]);
	juci.addDataset("juci_language", "English");

	var dictionaries = {};
	juci.addDictionaries = window.addDictionaries = function(d){
		var l = juci.getDataset("juci_languages");
		for(var k in d){
			dictionaries[k] = d[k];
			l.push(k);
		}
	};
	juci.currentLanguage = function(l){
		return juci.dataset("juci_language", l);
	};
	juci.getTranslatedLabel = window.getTranslatedLabel = function(label, language){
		var dictionary = dictionaries[language ? language : juci.currentLanguage()];
		if(dictionary)
			dictionary = dictionary["Strings"];
		if(label && label.indexOf("STAR")!=-1){
			label = label.substring(0,label.lastIndexOf("STAR"));
			return (dictionary ? dictionary[label] ? dictionary[label] : label : label);
		}else
			return dictionary ? dictionary[label] ? dictionary[label] : label : label;
	};
	window.juciTranslate = juci.translate = window.translate = function(lbl){
		return juci.getTranslatedLabel(lbl, juci.getDataset("juci_language").peek());
	};
	var controls = [];
	juci.getDataset("juci_language").subscribe(function(newVal){
		controls.forEach(function(control){
			control.value(control.value());
		});
		juci.fireEvent("languagechanged");
	});
	/**
	 * Usage:
	 * 1. translate: translatable_string
	 * 2. translate: {label: translatable_string, placeholder: translatable_string, value: translatable_string}
	 * 3. translate: {label: true, placeholder: true, value: true} - TODO
	 **/
	ko.bindingHandlers.translate = {
		"init": function(element, valueAccessor){
			var translate = valueAccessor();
			if(translate.value === true){
				var ctrl = juci.getControl(element);
				var _formatter = ctrl._formatter;
				if(ctrl._formatter && controls.indexOf(ctrl) == -1){
					controls.push(ctrl);
					ctrl._formatter = function(){
						return juci.translate(_formatter.apply(ctrl, arguments));
					};
				}
			}
		},
		"update": function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) { 
			var translate = valueAccessor();
			var language = juci.currentLanguage();
			if(typeof translate == "string"){
				var el = new juci.elem(element);
				el.text(juci.getTranslatedLabel(translate, language));
			}else{
				var ctrl = juci.getControl(element);
				// TODO check for translate.label/placeholder === true, then use whatever label is on the HTML attribute
				if(translate.label){
					ctrl.setLabel(juci.getTranslatedLabel(translate.label, language));
				}
				if(translate.placeholder){ // TODO: get input daynamically
					ctrl.j.el.children[2].placeholder = juci.getTranslatedLabel(translate.placeholder, language);
				}
				if(typeof translate.value == "string"){
					ctrl.value(juci.getTranslatedLabel(translate.value, language));
				}
				if(translate.placeholder){
					ctrl.placeholder = juci.getTranslatedLabel(translate.placeholder, language);
					var v = ctrl.value();
					if( v === null || v === ""){
						if(ctrl.type != "text" && ctrl.type !="textarea" && ctrl.type !="number" && ctrl.type !="tel" && ctrl.type != "email" && ctrl.type !="display")
							ctrl.setText();
					}
				}
			}
		}
	};
})();