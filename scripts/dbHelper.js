/**
 * DBHelper.js
 * @author CloudPact Technologies
 * @description : Library used for local database.
 **/

(function(window){
	
	var Statements = {
		
		"Create" : function(tableName, columns, ifNotExists){
			var allConditions = '' , statement;
			if(!columns.length)
				return;
			var columnsString = '';
			for(var i=0;i<columns.length;i++) {
				var column = columns[i];
				columnsString += column.name + ' ' + column.datatype + ",";
			}
			columnsString = columnsString.substr(0,columnsString.length-1);
			statement = 'CREATE TABLE ' + (ifNotExists ? 'IF NOT EXISTS ' : '') +tableName+' ( '+columnsString + ')';
			
			return statement;
		},
		
		"Alter": function(tableName, columns, context){
			var allConditions = '' , statement='';
			var columnsString = '';
			var i=0;
			for(i=0;i<columns.length-1;i++) {
				var column = columns[i];
				context.db.executeSql('ALTER TABLE ' +tableName+' ADD COLUMN '+column.name + ' '+column.datatype);
			}
			statement = 'ALTER TABLE ' +tableName+' ADD COLUMN '+columns[i].name + ' '+columns[i].datatype;
			return statement;
		},
		
		"Insert" : function(tableName, insertObject){
			var keys = '';
			var values = '';
			var params = [];
			for(var key in insertObject){
				if (insertObject.hasOwnProperty(key) && typeof insertObject[key] != "function" && key != "createdat" && key != "updatedat") {
					keys += key +',';
					//values += '"'+insertObject[key] +'",';
					values += "?,";
					params.push(insertObject[key]);
				}
			}
			keys = keys.substring(0, keys.length-1);
			values = values.substring(0, values.length-1);
			var statement =  'INSERT INTO '+tableName+'('+keys+') values('+ values +')';
			return {statement: statement, params: params};
		},
		
		"Replace" : function(tableName, insertObject){
			var keys = '';
			var values = '';
			var params = [];
			for(var key in insertObject){
				if (insertObject.hasOwnProperty(key) && typeof insertObject[key] != "function" && key != "createdat" && key != "updatedat") {	
					keys += key +',';
					//values += '"'+insertObject[key] +'",';
					values += "?,";
					params.push(insertObject[key]);
				}
			}
			keys = keys.substring(0, keys.length-1);
			values = values.substring(0, values.length-1);
			var statement =  'REPLACE INTO '+tableName+'('+keys+') values('+ values +')';
			return {statement: statement, params: params};
		},
		
		"Update" : function(tableName, setObj){
			var setObjects = '', statement;
			var allConditions = '';
			for(var key in setObj){
				if (setObj.hasOwnProperty(key) && typeof setObj[key] != "function" && key != "createdat" && key != "updatedat") {	
					setObjects += key +'=\''+setObj[key]+'\'';
					setObjects += ', ';
				}
			}
			setObjects = setObjects.substring(0, setObjects.length-2);
			statement = 'UPDATE '+tableName+' SET '+setObjects;	
			return statement;
		},
		
		"Delete" : function(tableName, conditions){
			return 'DELETE FROM '+tableName;	
		},
		
		"Select" : function(tableName, columns, isDistinct){
			return "SELECT "+ (isDistinct ? 'DISTINCT ' : '') + (columns ? columns.toString() : '*') + " FROM "+tableName;
		},
		
		"DropTable" : function(tableName){
			return"DROP TABLE "+tableName;
		},
		
		"Truncate" : function(tableName){
			return 'DELETE FROM '+tableName;

		},
		
		"Count" : function(tableName, column, isDistinct){
			return 'SELECT COUNT('+ (isDistinct ? 'DISTINCT ' : '') + (column ? column : '*') + ') FROM '+tableName;
		},
		
		"Sum" : function(tableName, column){
			return 'SELECT SUM(' + column + ') FROM '+tableName;
		}
	};
	
	function DB(name, custom_success_callback, custom_error_callback){
		this.name = name;
		this.db = null;
		var that = this;
		var dbvalue = 1;
		
		if($m.isWeb()){
			dbvalue = undefined;
		}
		$m.openDatabase(this.name, function(r){
			if(r.database){
				that.db = r.database;
				custom_success_callback ? custom_success_callback(that) : success_callback();
			} else{
				custom_error_callback ? custom_error_callback("Unable to create the database") : error_callback();
			}
		},dbvalue,"",1);
	}
 
	DB.prototype = {
		"CreateTable" : function(tableName, columns, ifNotExists){
			return this.Query(Statements.Create(tableName, columns, ifNotExists));
		}, 
		
		"AlterTable" : function(tableName, columns){
			var that = this;
			return this.Query(Statements.Alter(tableName, columns, that));
		},
		
		"Insert" : function(tableName, insertObj){
			return this.Query(Statements.Insert(tableName, insertObj));
		},
		"Replace" : function(tableName, insertObj){
			return this.Query(Statements.Replace(tableName, insertObj));
		},
		
		"Update" : function(tableName, setObj){
			return this.Query(Statements.Update(tableName, setObj));
		},
		
		"Delete" : function(tableName){
			return this.Query(Statements.Delete(tableName));
		},
		
		"Select" : function(tableName, columns, isDistinct){
			return this.Query(Statements.Select(tableName,columns,isDistinct));
		},
		
		"DropTable" : function(tableName){
			return this.Query(Statements.DropTable(tableName));
		},
		
		"Truncate" : function(tableName){
			return this.Query(Statements.Truncate(tableName));
		},
		
		"Count" : function(tableName, column, isDistinct){
			return this.Query(Statements.Count(tableName, column, isDistinct));
		},
		
		"Sum" : function(tableName, column){
			return this.Query(Statements.Sum(tableName, column));
		},

		"Query" : function(statement){
			var params = [];
			if(typeof statement == "object"){
				params = statement.params;
				statement = statement.statement;
			}
			return new DB.Query(this.db, statement, params);
		},
		// TODO use params
		"MultiInsert" : function(name, keys, records, cb, incrementCb){
			var maxCnt = 250;
			var numRecords = records.length;
			if(numRecords === 0){
				cb();
			}else{
				var req = {"name": "MultiInsert " + name};
				
				var numCalls = 0;
				var numCallsFinished = 0;
				var terminator = function(){
					numCallsFinished++;
					incrementCb(name, numCallsFinished, Math.min(numCallsFinished * maxCnt, numRecords), false);
					if(numCallsFinished == numCalls){
						cb();
					}
				};
				var newQuery = true, query = "";
				for (var i = 0; i < numRecords; i++) {
					var record = records[i];
					if(newQuery){
						query = formInsertStatementWithKeys(name, keys);
						newQuery = false;
					}else{
						query += ' UNION';
					}
					var mul = formSelectStatementForMultipleInsert(record, keys);
					query += mul;
					//if (i%maxCnt === 0 || i+1 == numRecords) {
						numCalls++;
						newQuery = true;
						incrementCb(name, numCalls, i, true);
						this.db.executeSql(query,successDatabaseCallback(req, terminator), failureCallback(req, terminator, query), null);
					//}
				}
			}
		},
		// TODO use params
		"MultiReplace" : function(name, keys, records, cb, incrementCb){
			var maxCnt = 250;
			var numRecords = records.length;
			if(numRecords === 0){
				cb();
			}else{
				var req = {"name": "MultiInsert " + name};
				
				var numCalls = 0;
				var numCallsFinished = 0;
				var terminator = function(){
					numCallsFinished++;
					incrementCb(name, numCallsFinished, Math.min(numCallsFinished * maxCnt, numRecords), false);
					if(numCallsFinished == numCalls){
						cb(name);
					}
				};
				var newQuery = true, query = "";
				for (var i = 0; i < numRecords; i++) {
					var record = records[i];
					if(newQuery){
						query = formReplaceStatementWithKeys(name, keys);
						newQuery = false;
					}else{
						query += ' UNION';
					}
					var mul = formSelectStatementForMultipleReplace(record, keys);
					query += mul;
					if (i%maxCnt === 0 || i+1 == numRecords) {
						numCalls++;
						newQuery = true;
						incrementCb(name, numCalls, i, true);
						this.db.executeSql(query,successDatabaseCallback(req, terminator), failureCallback(req, terminator, query), null);
					}
				}
			}
		}
	};

	function Query(db, statement, params){
		this.db = db;
		this.statement = statement;
		this.filter = null;
		this.order = [];
		this.limit = -1;
		this.offset = -1;
		this.join = [];
		this.params = params ? params : [];
	}

	Query.prototype.execute = function(custom_success_callback, custom_error_callback){
		var success_callback = custom_success_callback ? custom_success_callback : success_callback;
		var error_callback = custom_error_callback ? custom_error_callback : error_callback;
		var statement = this.statement;
		if(this.filter !== null){
			statement += ' WHERE ' + setFilters('', this.filter);
		}
		if(this.order.length){
			statement += ' ORDER BY ' + setSortOrder('', this.order);
		}
		//changed on 13/12/2017 
//		if(Object.keys(this.order).length){
//			statement += ' ORDER BY ' + setSortOrder('', this.order);
//		}
		if(this.limit !== -1){
			statement = setLimit(statement, this.limit);
		}
		if(this.offset !== -1){
			statement = setOffset(statement, this.offset);
		}
		if(this.join.length){
			statement += setJoin(this.join);	
		}
	//	$m.logDebug(statement + " --- " + this.db +", params - " + this.params.length);
		this.db.executeSql(statement, success_callback, error_callback, this.params);
	};

	Query.prototype.setFilter = function(filter) {
		this.filter = filter;
		return this;
	};

	Query.prototype.setOrder = function(order) {
		this.order = order;
		return this;
	};

	Query.prototype.addOrder = function(column, order) {
		return this.addSortOrder(new SortOrder(column, order));
	};

	Query.prototype.addAscOrder = function(column) {
		return this.addOrder(column, SortOrder.ASC);
	};

	Query.prototype.addDescOrder = function(column) {
		return this.addOrder(column, SortOrder.DESC);
	};

	Query.prototype.addSortOrder = function(sortOrder) {
		this.order.push(sortOrder);
		return this;
	};

	Query.prototype.setLimit = function(limit) {
		this.limit = limit;
		return this;
	};

	Query.prototype.setOffset = function(offset) {
		this.offset = offset;
		return this;
	};
	
	Query.prototype.addJoin = function(join) {
		this.join.push(join);
		return this;
	};
	
	DB.Query = Query;

	function Filter(key, operator, value, table) {
		this.key = key;
		this.value = value;
		this.operator = operator;
		this.filtertype = "simple";
		this.table = table;
	}

	Filter.IN = "IN";
	Filter.EQUAL = "=";
	Filter.NOT_EQUAL = "!=";
	Filter.LESS_THAN = "<";
	Filter.LESS_THAN_OR_EQUAL = "<=";
	Filter.GREATER_THAN = ">";
	Filter.GREATER_THAN_OR_EQUAL = ">=";
	Filter.LIKE = "like";

	Filter.lessThan = function(name, value, table) {
		return new Filter(name, Filter.LESS_THAN, value, table);
	};

	Filter.lessThanOrEqual = function(name, value, table) {
		return new Filter(name, Filter.LESS_THAN_OR_EQUAL, value, table);
	};

	Filter.greaterThan = function(name, value, table) {
		return new Filter(name, Filter.GREATER_THAN, value, table);
	};

	Filter.greaterThanOrEqual = function(name, value, table) {
		return new Filter(name, Filter.GREATER_THAN_OR_EQUAL, value, table);
	};

	Filter.equal = function(name, value, table) {
		return new Filter(name, Filter.EQUAL, value, table);
	};

	Filter.notEqual = function(name, value, table) {
		return new Filter(name, Filter.NOT_EQUAL, value, table);
	};
	
	Filter.like = function(name, value, table) {
		return new Filter(name, Filter.LIKE, value, table);
	};

	Filter.prototype.toJSON = function() {
		return this;
	};
	
	DB.Filter = Filter;

	function CompositeFilter(compositeOperator, filters) {
		this.compositeoperator = compositeOperator;
		this.filtertype = "composite";
		this.filters = filters ||[];
	}

	CompositeFilter.OR = "OR";
	CompositeFilter.AND = "AND";

	CompositeFilter.prototype.addFilter = function(filter) {
		this.filters.push(filter);
	};

	CompositeFilter.prototype.toJSON = function() {
		return this;
	};
	
	DB.CompositeFilter =  CompositeFilter;
	
	function SortOrder(column, order) {
		this.column = column;
		this.order = order;
	}

	SortOrder.ASC = "ASC";
	SortOrder.DESC = "DESC";

	SortOrder.ascending = function(column) {
		return new SortOrder(column, SortOrder.ASC);
	};

	SortOrder.descending = function(column) {
		return new SortOrder(column, SortOrder.DESC);
	};

	SortOrder.prototype.toJSON = function() {
		return this;
	};

	DB.SortOrder = SortOrder;

	function Join(table, filter){
		this.table = table;
		this.filter = filter;
	}	

	DB.Join = Join;
	
	function formSelectStatementForMultipleInsert(record, keys){
		var key = keys[0];
		var numKeys = keys.length;
		var query = " SELECT '" +record[key] + "'";
		for(var i = 1; i < numKeys; i++){
			key = keys[i];
			if(key != "createdat" && key != "updatedat"){
				query += ", '"+(""+record[key]).replace(/'/g, "''")+"'";
			}
		}
		return query;
	}
	
	function formInsertStatementWithKeys(tableName, keys){
		var key = keys[0];
		var numKeys = keys.length;
		var q =  "INSERT INTO " + tableName +" (" + key;
		for(var i = 1; i < numKeys; i++){
			key = keys[i];
			if(key != "createdat" && key != "updatedat"){
				q += ', '+key+'';
			}
		}
		q += ")";
		return q;
	}
	
	function formSelectStatementForMultipleReplace(record, keys){
		var key = keys[0];
		var numKeys = keys.length;
		var query = " SELECT '" +record[key] + "'";
		for(var i = 1; i < numKeys; i++){
			key = keys[i];
			if(key != "createdat" && key != "updatedat"){
				query += ", '"+(""+record[key]).replace(/'/g, "''")+"'";
			}
		}
		return query;
	}
	
	function formReplaceStatementWithKeys(tableName, keys){
		var key = keys[0];
		var numKeys = keys.length;
		var q =  "Replace INTO " + tableName +" (" + key;
		for(var i = 1; i < numKeys; i++){
			key = keys[i];
			if(key != "createdat" && key != "updatedat"){
				q += ', '+key+'';
			}
		}
		q += ")";
		return q;
	}
	
	function setFilters(statement, filter){
		if(filter.filtertype == "composite"){
			var filtersLength = filter.filters.length;
			for(var i=0; i<filtersLength; i++){
				statement += setFilters(statement, filter.filters[i]) + ' ' + (i == filtersLength-1 ? '' : filter.compositeoperator);
			}
			statement ='(' + statement + ')';
		}else{
			statement = ' (' + (filter.table ? (filter.table.keyTable + '.') : '') + filter.key + ' ' + filter.operator + ' ' + (filter.table ? (filter.table.valueTable ? (filter.table.valueTable + '.') : '') : '') + filter.value + ")";
		}
		return statement;
	}
	
	function setLimit(statement, limit){
		return statement + ' LIMIT ' + limit;
	}
	
	function setOffset(statement, limit){
		return statement + ' OFFSET ' + limit;
	}
	
	function setSortOrder(statement, order){
		var ordersLength = order.length;
		for(var i=0; i<ordersLength; i++){
			statement += (' ' + order[i].column + ' ' + order[i].order);
			if(i !== ordersLength-1)
				statement += ',';
		}
		return statement;		
	}
	/*function setSortOrder(statement, order){
		statement += (' ' + order.column + ' ' + order.order);
		return statement;		
	}*/

	function setJoin(joins){
		var joinsLength = joins.length;
		var statement = '';
		for(var i=0; i<joinsLength; i++){
			statement += (' INNER JOIN ' + joins[i].table + ' ON ' + setFilters('',joins[i].filter));
		}
		return statement;
	}
	
	function successDatabaseCallback(req, cb){
		return function(txn, resultset){
			if(cb){
				cb(resultset ? resultset.rows: txn.rows);
			}
		};
	}

	function failureCallback(req, cb, query){
		return function(error){
			
			if(cb){
				cb(error);
			}
		};
	}
	
	function success_callback(response){
		$m.logInfo('DB default success callback - '+JSON.stringify(response));
	}

	function error_callback(e){
		$m.logError('DB default error callback -'+JSON.stringify(e));
	}
	
	window.DB = DB;
	
})(window);
var getKeyColums = function (columnsObjs) {
    var columns = [];
    for (var i = 0; i < columnsObjs.length; i++) {
        columns.push(columnsObjs[i].name);
    }
    return columns;
};