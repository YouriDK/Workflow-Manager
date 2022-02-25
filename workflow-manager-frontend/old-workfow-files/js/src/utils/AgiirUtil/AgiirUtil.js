import React from "react";
import LFS from "../FetchService/LiferayFetchService";

class AgiirUtil extends React.Component {
  static myInstance = null;

  static getInstance() {
    //Instance needed for non-static methods !!!
    if (AgiirUtil.myInstance == null) {
      AgiirUtil.myInstance = new AgiirUtil();
    }

    return this.myInstance;
  }

  static currRangeMin = 0;
  static currRangeMax = 0;
  static ESEARCH_URL = "";
  static ESEARCH_PORT = "";
  static ESEARCH_FULL_URL = "";
  static queryObject = {};

  constructor(props) {
    super(props);

    this.currRangeMin = 0;
    this.currRangeMax = 0;
    this.CONTEXT = "agiir.service.builder.model.DocRessource";
    this.ESEARCH_URL = "http://localhost";
    this.ESEARCH_PORT = "9200";
    this.ESEARCH_FULL_URL = "127.0.0.1";
    this.queryObject = {
      search: null,
      entity: null,
      range: null
    };
    this.startOffset = 0;
    this.sizeOffset = 10000;
    this.searchAttemptCount = 0;
  }

  prepareFilterQuery(filters) {
    let other = 0;
    let filterQuery = filters.map(filter => {
      let query = "";
      if (filter.name == "Thèmes") {
        console.log("On ajoute un Thème ! ")
        let key = "themes:";
        filter.list.map(selectedTheme => {
          let queryitem = key + "(" + selectedTheme.id + ")";
          if (query == "") {
            query = queryitem;
          } else {
            query = query + " OR " + queryitem;
          }
        });
      }
      if (filter.name == "Année") {
        let key = "updateDate:";
        //console.log("in contrat",filter.list)

        filter.list.map(selectedYear => {
          let queryitem = key + selectedYear + "*";
          // console.log("queryitem",queryitem)
          if (query == "") {
            query = queryitem;
          } else {
            query = query + " OR " + queryitem;
          }
        });
      }
      if (filter.name == "Type") {
        console.log("On ajoute un Type ! ")
        let key = "type:";
        filter.list.map(selectType => {
          let queryitem = key + "(" + selectType.nom + ")";
          if (query == "") {
            query = queryitem;
          } else {
            query = query + " OR " + queryitem;
          }
        });
      }

      if (filter.name == "Organisation") {
        console.log("On ajoute une Organisations ! ")
        
      for( var iteration = 0 ; iteration < 20 ;  iteration ++){
        let key = "author.Organizations.Organization"+iteration+".id";
        filter.list.map(selectOrganisation => {
          let queryitem = key + "(" + selectOrganisation.id + ")";
          if (query == "") {
            query = queryitem;
          } else {
            query = query + " OR " + queryitem;
          }
        });
      }
    }
    if (filter.name == "Mois") {
      let key = "updateDate:";
      filter.list.map((selectedMonth, index) => {
        let mounthPosition = 0;
        if (selectedMonth != null && !isNaN(selectedMonth)) {
          mounthPosition = selectedMonth;
        } else {
          mounthPosition = index;
        }
        //console.log(this.props.themeId);
        if (mounthPosition + 1 < 10) {
          mounthPosition = "0" + (mounthPosition + 1);
        } else {
          mounthPosition++;
        }
        let queryitem = key + "????" + mounthPosition + "*";
        if (query == "") {
          query = queryitem;
        } else {
          query = query + " OR " + queryitem;
        }
      });
    }


      query = query == "" ? query : "(" + query + ") ";
      query = filter.list.length > 0 && other > 0 ? " AND " + query : query;
      other += filter.list.length > 0 ? 1 : 0;
      return query;
    });
    console.log("Query")
    console.log(filterQuery)
    return filterQuery;
  }

  prepareSearchQuery(searchKey) {
    //console.log("handleSearch --> Header");
    let searchQuery =
      "title:" +
      "*" +
      searchKey +
      "*" +
      " OR " +
      "description:" +
      "*" +
      searchKey +
      "*" +
      " OR " +
      "file:" +
      "*" +
      searchKey +
      "*";
    return searchQuery;
  }

  async search(themesList, keyword) {
    let initFilter = [
      {
        list: themesList.map(a => {
          let obj = {
            id: a.themeId,
            nom: a.name
          };
          return obj;
        }),
        name: "Thèmes"
      }
    ];

    let filterQuery = this.prepareFilterQuery(initFilter).join("");
    let searchQuery = this.prepareSearchQuery(keyword);
    let query = "(" + searchQuery + ") AND " + filterQuery;
    //console.log(query);
    this.queryObject.entity = query != null ? query : "";
    let fullQuery = this.buildFullQuery(this.CONTEXT);
    let results = await this.executeSearchQuery(fullQuery);
    return results;
  }

  async filter(filters) {
    let query = this.prepareFilterQuery(filters).join("");
    this.queryObject.entity = query != null ? query : "";
    let fullQuery = this.buildFullQuery(this.CONTEXT);
    let results = await this.executeSearchQuery(fullQuery);
    return results;
  }

  // à enlever after tests
  async simpleSearch(searchKey) {
    let query = this.prepareSearchQuery(searchKey);
    this.queryObject.entity = query != null ? query : "";
    console.log("Query Obj" + this.queryObject);
    let fullQuery = this.buildFullQuery(this.CONTEXT);
    let results = await this.executeSearchQuery(fullQuery);
    return results;
  }

  buildRange() {
    if (this.currRangeMin == "") {
      this.currRangeMin = 0;
    }

    if (this.currRangeMax == "") {
      this.currRangeMax = 100000;
    }

    return "[" + this.currRangeMin + " TO " + this.currRangeMax + "]";
  }

  buildFullQuery = () => {
    let doOffset = '"from":0, "size":' + this.sizeOffset + ",";
    let fullQuery =
      "{" +
      doOffset +
      '"query": {"query_string": {"query": "entryClassName:' +
      this.CONTEXT;
      console.log("full query 1st Part", fullQuery);
    if (this.queryObject.entity != "") {
      fullQuery = fullQuery + " AND (" + this.queryObject.entity + ') " }}}';
    } else {
      fullQuery = fullQuery + ' " }}}';
    }
    console.log("full query", fullQuery);
    return fullQuery;
  };

  async executeSearchQuery(fullQuery) {
    let hits = [];
    while (this.searchAttemptCount <= 3) {
      let json = await LFS.apiCall("searchQuery", "permission", {
        url: this.ESEARCH_FULL_URL,
        query: fullQuery
      });
      hits = json.hits.hits;
      if (!hits) {
        this.searchAttemptCount++;
      } else {
        break;
      }
    }
    return hits;
  }

  //Check for non valid character in a sting. Usually non valid characters for a database / Regex
  static includesIncorrectChar(str) {
    let invalidChar = [
      "?",
      "'",
      '"',
      "/",
      "\\",
      ":",
      "*",
      "[",
      "]",
      "^",
      "&",
      ".",
      ",",
      "(",
      ")"
    ];
    for (var i = 0; i != invalidChar.length; i++) {
      var substring = invalidChar[i];
      if (typeof str == "string") {
        if (str.indexOf(substring) != -1) {
          return true;
        }
      } else {
        return false;
      }
    }
    return false;
  }

  incrementSearchOffset() {
    this.startOffset = this.startOffset + this.sizeOffset;
  }

  resetOffset() {
    this.startOffset = 0;
  }

  static parseDateMonth(ts) {
    var options = { year: "numeric", month: "short", day: "numeric" };
    let date = new Date(ts);
    let d = new Date(date);
    return d.toLocaleDateString("fr-FR", options).toUpperCase();
  }

  pad(s) {
    return s < 10 ? "0" + s : s;
  }
  convertDate(inputFormat) {
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
  }
}

export default AgiirUtil;
