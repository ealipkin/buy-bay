(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c62744a4"],{"0879":function(t,e,a){"use strict";var s=a("3ea7"),i=a.n(s);i.a},"0ba9":function(t,e,a){},"0cbf":function(t,e,a){"use strict";var s=a("a727"),i=a.n(s);i.a},"13af":function(t,e,a){"use strict";var s=a("6601"),i=a.n(s);i.a},2457:function(t,e,a){},"247d":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.pageLoaded?a("div",{staticClass:"category page catalog"},[[a("div",{staticClass:"container page__breadcrumbs"},[a("Breadcrumbs",{attrs:{links:t.breadCrumbs}})],1),a("div",{staticClass:"catalog__wrapper"},[a("div",{staticClass:"page__header container"},[a("div",{staticClass:"page__title"},[t._v(t._s(t.pageTitle))]),t.hasResults?a("div",{staticClass:"category__sort"},[a("SortSelect",{attrs:{options:t.selectOptions,selectedOption:t.sort},on:{change:t.sortChange}})],1):t._e()]),a("div",{staticClass:"container category__inner"},[a("div",{staticClass:"page__layout"},[a("div",{staticClass:"page__aside"},[a("div",{staticClass:"filters-wrapper"},[a("CategoryFilter",{staticClass:"category__filters",attrs:{filters:t.filters},on:{change:t.selectFilter,categoryChange:t.categoryChange}})],1)]),a("div",{staticClass:"page__content"},[t.hasResults?a("div",{staticClass:"category__items"},[a("div",{staticClass:"category__list"},t._l(t.products,(function(t,e){return a("div",{key:e,staticClass:"category__item"},[a("CatalogCardItem",{attrs:{item:t}})],1)})),0),a("div",{staticClass:"category__pagination"},[a("Pagination",{attrs:{paginationInfo:t.pagination},on:{page:t.pageChange,more:t.showMore}})],1)]):a("div",[a("div",{staticClass:"search-empty"},[a("div",{staticClass:"search-empty__icon"},[a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 80 80"}},[a("g",{attrs:{fill:"#496CFF","fill-rule":"nonzero"}},[a("path",{attrs:{d:"M22.128 17.87a2.978 2.978 0 00-4.207 0c-4.313 4.305-6.432 10.302-5.816 16.455a2.973 2.973 0 003.256 2.66 2.972 2.972 0 002.665-3.251c-.438-4.373 1.057-8.624 4.102-11.664a2.964 2.964 0 000-4.2z"}}),a("path",{attrs:{d:"M34 0C15.252 0 0 15.252 0 34c0 18.748 15.252 34 34 34 18.748 0 34-15.252 34-34C68 15.252 52.748 0 34 0zm0 62.052C18.532 62.052 5.948 49.468 5.948 34S18.532 5.948 34 5.948 62.052 18.532 62.052 34 49.468 62.052 34 62.052z"}}),a("path",{attrs:{d:"M79.146 75.026L57.974 53.854a2.91 2.91 0 00-4.12 0 2.91 2.91 0 000 4.12l21.172 21.172c.57.57 1.314.854 2.06.854s1.491-.284 2.06-.854a2.91 2.91 0 000-4.12z"}})])])]),a("div",{staticClass:"search-empty__title"},[t._v("Ничего не удалось найти")]),a("div",{staticClass:"search-empty__text"},[t._v("Попробуте изменить запрос")])])]),t.productsPending?a("Loader"):t._e()],1)])])]),a("Advantages",{staticClass:"category__advantages",attrs:{advantagesList:t.advantagesList}}),t.recommended&&t.recommended.length?a("div",{staticClass:"section category__similar-slider"},[a("div",{staticClass:"section__container"},[t._m(0),a("SimilarSlider",{attrs:{items:t.recommended}})],1)]):t._e(),t.brands&&t.brands.length?a("section",{staticClass:"section section--brands"},[a("div",{staticClass:"section__container"},[a("div",{staticClass:"section-header"},[a("div",{staticClass:"section-title"},[t._v("Лучшие бренды")]),a("router-link",{staticClass:"section-link",attrs:{to:"#"}},[t._v("Показать еще")])],1),a("Brands",{attrs:{brands:t.brands}})],1)]):t._e(),t.seoBlock?a("section",{staticClass:"section section--seo"},[a("SeoBlock",{staticClass:"container",attrs:{block:t.seoBlock}})],1):t._e()]],2):a("Loader")},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"section-header"},[a("div",{staticClass:"section-title"},[t._v("Пользователи рекомендуют")])])}],c=(a("99af"),a("4de4"),a("b0c0"),a("a9e3"),a("ac1f"),a("841c"),a("5530")),r=a("2909"),n=(a("96cf"),a("1da1")),o=a("d4ec"),l=a("bee2"),u=a("262e"),d=a("2caf"),h=a("9ab4"),g=a("1b40"),f=a("5882"),b=a("5fc7"),_=a("9f46"),p=a("824d"),v=a("c344"),y=a("b6c6"),m=a("5b2c"),C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("form",{ref:"form",staticClass:"category-filter"},[t.selectedFilters.length?a("div",{staticClass:"category-filter__top"},[a("button",{staticClass:"category-filter__reset link",attrs:{type:"button"},on:{click:t.resetFilters}},[t._v("Сбросить")])]):t._e(),a("div",{staticClass:"category-filter__wrapper"},[a("button",{staticClass:"category-filter__open",attrs:{type:"button"},on:{click:t.handleOpen}}),a("div",{staticClass:"category-filter__inner",class:{"category-filter__inner--open":!t.closed}},[a("div",{staticClass:"category-filter__main-header"},[t._v("Фильтр"),a("button",{staticClass:"close category-filter__close",attrs:{type:"button"},on:{click:t.handleClose}})]),a("div",{staticClass:"category-filter__content"},[a("div",t._l(t.filters,(function(e,s){return e.items&&e.items.length?a("div",{staticClass:"category-filter__section"},[a("div",{staticClass:"category-filter__header",class:{"category-filter__header--open":e.isOpen},on:{click:function(a){return t.toggleHeader(e,s)}}},[t._v(t._s(e.label))]),a("div",{staticClass:"category-filter__category-wrapper",class:{"category-filter__category-wrapper--open":e.isOpen}},[e.isSearch?a("div",{staticClass:"category-filter__search"},[a("div",{staticClass:"input-search"},[a("div",{staticClass:"input-search__icon"},[a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16"}},[a("path",{attrs:{d:"M15.804 14.864l-3.846-3.847A6.744 6.744 0 006.743 0a6.743 6.743 0 104.27 11.961l3.847 3.843a.667.667 0 00.944-.94zm-9.061-2.72a5.408 5.408 0 01-5.404-5.401 5.41 5.41 0 015.404-5.404 5.412 5.412 0 015.404 5.404c0 2.978-2.426 5.4-5.404 5.4z",fill:"currentColor","fill-rule":"evenodd",opacity:".8"}})])]),a("input",{staticClass:"category-filter__search-field input-search__field",attrs:{type:"search",placeholder:"Поиск"},on:{input:function(a){return t.$emit("input",{value:a.target.value,filter:e,index:s})}}})])]):t._e(),"checkbox"===e.type?a("div",{staticClass:"category-filter__block category-filter__block--checkbox"},[t._l(t.filteredItems(e),(function(s,i){return a("Checkbox",{key:i,attrs:{item:Object.assign({},s,{query:e.query}),checked:s.selected,value:s.value,name:e.query,label:s.label,count:s.count},on:{change:t.handleFilterChange}})})),t.filteredItems(e).length?t._e():a("span",{staticClass:"category-filter__empty"},[t._v("Ничего не найдено")])],2):t._e(),"accordion"===e.type?a("div",{staticClass:"category-filter__block category-filter__block--accordion"},[a("div",{staticClass:"accordion category-filter__accordion"},[t._l(t.filteredItems(e),(function(s,i){return a("div",{staticClass:"accordion__item"},[s.items&&s.items.length?a("div",{staticClass:"accordion__header",class:{"accordion__header--open":s.expand},on:{click:function(a){return t.toggleAccordion(s,i,e)}}},[a("button",{staticClass:"accordion__header-button",attrs:{type:"button"}},[t._v(t._s(s.label))]),a("span",{staticClass:"accordion__icon"})]):a("button",{staticClass:"category-filter__accordion-item",class:{"category-filter__accordion-item--active":s.href===t.$route.path},attrs:{type:"button"},on:{click:function(e){return t.accordionItemClick(s)}}},[t._v(t._s(s.label))]),a("div",{staticClass:"accordion__content category-filter__accordion-items",class:{"accordion__content--open":s.expand}},t._l(s.items,(function(e){return a("button",{staticClass:"category-filter__accordion-item",class:{"category-filter__accordion-item--active":e.href===t.$route.path},attrs:{type:"button"},on:{click:function(a){return t.accordionItemClick(e)}}},[t._v(t._s(e.label))])})),0)])})),t.filteredItems(e).length?t._e():a("span",{staticClass:"category-filter__empty"},[t._v("Ничего не найдено")])],2)]):t._e(),"color"===e.type?a("div",{staticClass:"category-filter__block category-filter__block--color"},[a("ColorSelect",{staticClass:"category-filter__colors",attrs:{colors:e.items}})],1):t._e(),"radio"===e.type?a("div",{staticClass:"category-filter__block category-filter__block--radio"},[t._l(t.filteredItems(e),(function(s,i){return a("Radio",{key:i,attrs:{item:Object.assign({},s,{query:e.query}),checked:s.selected,value:s.value,name:e.query,label:s.label},on:{change:t.handleFilterChange}})})),t.filteredItems(e).length?t._e():a("span",{staticClass:"category-filter__empty"},[t._v("Ничего не найдено")])],2):t._e()])]):t._e()})),0),a("button",{staticClass:"button category-filter__submit",attrs:{type:"button"},on:{click:t.handleSubmit}},[t._v("Применить")])])])])])},k=[],O=(a("c740"),a("0481"),a("4160"),a("caad"),a("d81d"),a("a434"),a("4069"),a("d3b7"),a("2532"),a("498a"),a("159b"),a("ddb0"),a("a4d3"),a("e01a"),a("d28b"),a("3ca3"),a("06c5"));function j(t,e){var a;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(a=Object(O["a"])(t))||e&&t&&"number"===typeof t.length){a&&(t=a);var s=0,i=function(){};return{s:i,n:function(){return s>=t.length?{done:!0}:{done:!1,value:t[s++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,r=!0,n=!1;return{s:function(){a=t[Symbol.iterator]()},n:function(){var t=a.next();return r=t.done,t},e:function(t){n=!0,c=t},f:function(){try{r||null==a["return"]||a["return"]()}finally{if(n)throw c}}}}var P=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"color-select"},[a("div",{staticClass:"color-select__items"},t._l(t.colors,(function(e,s){return a("label",{staticClass:"color-select__label",class:{"color-select__label--visible":s<t.visibleCount}},[a("input",{staticClass:"visually-hidden",attrs:{type:"checkbox"},domProps:{checked:e.selected}}),a("span",{staticClass:"color-select__item",style:{backgroundColor:e.colorHex}})])})),0),t.colors.length>t.visibleCount?a("div",{staticClass:"color-select__show-all",on:{click:t.showAll}},[t._v("Показать еще")]):t._e()])},S=[],w=function(t){Object(u["a"])(a,t);var e=Object(d["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.visibleCount=6,t}return Object(l["a"])(a,[{key:"showAll",value:function(){this.visibleCount=this.colors.length+1}}]),a}(g["d"]);Object(h["a"])([Object(g["c"])()],w.prototype,"colors",void 0),w=Object(h["a"])([g["a"]],w);var $=w,x=$,F=(a("81a3"),a("2877")),I=Object(F["a"])(x,P,S,!1,null,"39fd8b54",null),q=I.exports,B=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("label",{staticClass:"checkbox"},[a("input",{staticClass:"visually-hidden",attrs:{type:"checkbox",name:t.name},domProps:{checked:t.checked,value:t.value},on:{change:t.handleChange}}),a("span",{staticClass:"checkbox__icon"}),a("span",{staticClass:"checkbox__text"},[t._v(t._s(t.label))]),t.count?a("span",{staticClass:"checkbox__count"},[t._v(t._s(t.count))]):t._e()])},E=[],L=function(t){Object(u["a"])(a,t);var e=Object(d["a"])(a);function a(){return Object(o["a"])(this,a),e.apply(this,arguments)}return Object(l["a"])(a,[{key:"handleChange",value:function(t){var e=t.currentTarget.checked;this.$emit("change",{checked:e,item:this.item})}}]),a}(g["d"]);Object(h["a"])([Object(g["c"])()],L.prototype,"item",void 0),Object(h["a"])([Object(g["c"])()],L.prototype,"checked",void 0),Object(h["a"])([Object(g["c"])()],L.prototype,"value",void 0),Object(h["a"])([Object(g["c"])()],L.prototype,"name",void 0),Object(h["a"])([Object(g["c"])()],L.prototype,"label",void 0),Object(h["a"])([Object(g["c"])()],L.prototype,"count",void 0),L=Object(h["a"])([g["a"]],L);var R=L,T=R,A=Object(F["a"])(T,B,E,!1,null,null,null),z=A.exports,M=a("5526"),U=a("d1d6"),D=a("83bc"),H=a("d4c0"),Q=function(t){Object(u["a"])(a,t);var e=Object(d["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.closed=!0,t.selectedFilters=[],t}return Object(l["a"])(a,[{key:"handleSearch",value:function(t){var e=t.value,a=t.filter,s=t.index;a.searchTerm=e&&e.length?e.trim():null,g["d"].set(this.filters,s,Object(c["a"])({},a))}},{key:"filteredItems",value:function(t){var e=t.searchTerm&&t.searchTerm.toLowerCase().trim();return t.items.filter((function(t){return!e||t.label.toLowerCase().includes(e)}))}},{key:"toggleAccordion",value:function(t,e,a){t.expand=!t.expand,g["d"].set(a.items,e,t)}},{key:"toggleHeader",value:function(t,e){t.isOpen=!t.isOpen,g["d"].set(this.filters,e,t)}},{key:"handleClose",value:function(){this.closed=!0,Object(D["b"])(),this.resetFilters()}},{key:"handleOpen",value:function(){this.closed=!1;var t=this.$el.querySelector(".category-filter__content");Object(D["a"])(t)}},{key:"handleSubmit",value:function(){this.closed=!0}},{key:"mounted",value:function(){this.selectedFilters=this.filters.filter((function(t){return t.items.length})).map((function(t){return t.items.filter((function(t){return t.selected})).map((function(e){return Object(c["a"])(Object(c["a"])({},e),{},{query:t.query})}))})).flat(),this.filters.forEach((function(t){return t.isOpen=!0})),this.$on("input",this.handleSearch.bind(this)),this.$on("filterChange",Object(U["debounce"])(this.filterChange.bind(this),1e3)),window.addEventListener("resize",(function(){window.innerWidth>1024&&Object(D["b"])()}))}},{key:"handleFilterChange",value:function(t){if(t.checked)this.selectedFilters.push(t.item);else{var e=this.selectedFilters.findIndex((function(e){return e.id===t.item.id})),a=t.item;a&&(Object(H["e"])(this.$route,a),1!==e&&this.selectedFilters.splice(e,1))}this.$emit("filterChange")}},{key:"filterChange",value:function(){var t,e=this.$refs.form,a=new FormData(e),s={},i=j(a.keys());try{for(i.s();!(t=i.n()).done;){var c=t.value;s[c]=a.getAll(c)}}catch(r){i.e(r)}finally{i.f()}this.$emit("change",s)}},{key:"resetFilters",value:function(){var t=this,e=this.$refs.form;e.reset(),this.$emit("change",{}),this.selectedFilters.forEach((function(e){return Object(H["e"])(t.$route,e)})),this.selectedFilters=[]}},{key:"accordionItemClick",value:function(t){this.$emit("categoryChange",t)}}]),a}(g["d"]);Object(h["a"])([Object(g["c"])()],Q.prototype,"filters",void 0),Q=Object(h["a"])([Object(g["a"])({components:{Radio:M["a"],Checkbox:z,ColorSelect:q}})],Q);var G=Q,J=G,N=(a("0cbf"),a("9cb7"),Object(F["a"])(J,C,k,!1,null,"18797130",null)),W=N.exports,K=a("9613"),V=a("1799"),X=a("eb89"),Y=a("555f"),Z=a("36d3"),tt=a("d70b"),et=a("066b"),at=a("afbc"),st=a("4bb5"),it=a("1c71"),ct=[{value:et["l"].POPULAR,label:"По популярности"},{value:et["l"].PRICE,label:"Сначала дешевле"},{value:et["l"].PRICE_DESC,label:"Сначала дороже"},{value:et["l"].GROUPS,label:"По количеству групп"},{value:et["l"].DATE,label:"Новинки"},{value:et["l"].DISCOUNT,label:"По размеру скидки"}],rt=et["l"].POPULAR,nt=function(t){Object(u["a"])(a,t);var e=Object(d["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.filter={},t.pageLoaded=!1,t.productsPending=!1,t.sort=rt,t.page=tt["b"],t.isSearch=!1,t.isBrand=!1,t.selectOptions=ct,t.advantagesList=K["a"],t.catalogPage=null,t}return Object(l["a"])(a,[{key:"routeChange",value:function(){this.pageLoaded=!1,this.loadProducts(!0)}},{key:"init",value:function(){this.isSearch="Search"===this.$route.name,this.isBrand="Brand"===this.$route.name;var t=Object(H["d"])(this.$route.query);t&&(t.sort&&(this.sort=String(t.sort)),t.page&&(this.page=Number(String(t.page)))),this.loadProducts(!0)}},{key:"mounted",value:function(){this.init()}},{key:"setFiltersFromUrl",value:function(t){var e=Object(H["d"])(this.$route.query);Object(H["f"])(t.filters,e)}},{key:"loadProducts",value:function(t){var e=this;this.loadProductsRequest().then((function(a){if(a&&a.data){var s=a.data.data;t?(e.setFiltersFromUrl(s),e.catalogPage=s,e.isBrand&&e.selectShop(s)):e.catalogPage&&(e.catalogPage.products=s.products),e.pageLoaded=!0,e.productsPending=!1}})).catch((function(){at["a"].push({path:"/404"})}))}},{key:"loadProductsRequest",value:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(){var e,a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=this.$route.params.id,a=this.collectQueryParams(),s=this.isSearch?this.$route.query.q&&tt["d"].search.global(a):this.isBrand?tt["d"].brand(e,a):tt["d"].category(e,a),t.abrupt("return",Object(Z["a"])("GET",s));case 4:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"collectQueryParams",value:function(){var t=Object(H["b"])({page:this.page,sort:this.sort}),e=Object(H["b"])(this.filter),a=this.isSearch?"q=".concat(this.$route.query.q,"&"):"";return"".concat(a).concat(t,"&").concat(e)}},{key:"sortChange",value:function(t){var e=t.value;this.productsPending=!0,this.sort=e,this.loadProducts()}},{key:"pageChange",value:function(t){this.productsPending=!0,this.page=t,this.loadProducts()}},{key:"showMore",value:function(){var t=this;this.page+=1,this.loadProductsRequest().then((function(e){if(e&&e.data){var a,s=e.data.data.products.data;if(t.catalogPage)(a=t.catalogPage.products.data).push.apply(a,Object(r["a"])(s)),t.pagination&&(t.catalogPage.products.paginationInfo=Object(c["a"])(Object(c["a"])({},t.pagination),{},{currentPage:t.page}))}}))}},{key:"selectFilter",value:function(t){this.filter=t,Object(H["a"])(this.$route,t),this.productsPending=!0,this.loadProducts()}},{key:"categoryChange",value:function(t){if(t.href!==this.$route.path){var e=this.collectQueryParams();at["a"].push({path:"".concat(t.href,"?").concat(e)})}}},{key:"beforeDestroy",value:function(){this.isBrand&&this.selectShop(null)}},{key:"hasResults",get:function(){return this.catalogPage&&this.catalogPage.products&&Boolean(this.catalogPage.products.data.length)}},{key:"breadCrumbs",get:function(){return this.catalogPage&&this.catalogPage.breadcrumbs}},{key:"pageTitle",get:function(){var t=this.$route.query&&this.$route.query.q||"",e=this.catalogPage&&this.catalogPage.title||"";return this.isSearch?"«".concat(t,"»"):e}},{key:"seoBlock",get:function(){return this.catalogPage&&this.catalogPage.seo_block}},{key:"products",get:function(){return this.catalogPage&&this.catalogPage.products.data}},{key:"pagination",get:function(){return this.catalogPage&&this.catalogPage.products.paginationInfo}},{key:"brands",get:function(){return this.catalogPage&&this.catalogPage.topBrand}},{key:"recommended",get:function(){return this.catalogPage&&this.catalogPage.recommended}},{key:"filters",get:function(){return this.catalogPage&&this.catalogPage.filters}}]),a}(g["d"]);Object(h["a"])([Object(st["a"])("app/setSelectedShop")],nt.prototype,"selectShop",void 0),Object(h["a"])([Object(g["e"])("$route")],nt.prototype,"routeChange",null),nt=Object(h["a"])([Object(g["a"])({components:{Loader:Y["a"],SimilarSlider:X["a"],Pagination:V["a"],CategoryFilter:W,SortSelect:m["a"],Breadcrumbs:y["a"],Advantages:v["a"],TopCategories:p["a"],SeoBlock:it["a"],CatalogSlider:_["a"],Brands:b["a"],CatalogCardItem:f["a"]}})],nt);var ot=nt,lt=ot,ut=(a("2696"),Object(F["a"])(lt,s,i,!1,null,"03b46806",null));e["default"]=ut.exports},2696:function(t,e,a){"use strict";var s=a("2457"),i=a.n(s);i.a},"3ea7":function(t,e,a){},6601:function(t,e,a){},"81a3":function(t,e,a){"use strict";var s=a("0ba9"),i=a.n(s);i.a},"882e":function(t,e,a){},"9cb7":function(t,e,a){"use strict";var s=a("882e"),i=a.n(s);i.a},a727:function(t,e,a){},b6c6:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.links&&t.links.length?a("ul",{staticClass:"breadcrumbs"},t._l(t.links,(function(e){return a("li",{key:e.title,staticClass:"breadcrumbs__item"},[e.current?a("span",{staticClass:"breadcrumbs__link breadcrumbs__link--current"},[t._v(" "+t._s(e.title||e.label))]):a("router-link",{staticClass:"breadcrumbs__link",attrs:{to:e.link||e.href}},[t._v(" "+t._s(e.title||e.label))])],1)})),0):t._e()},i=[],c=a("d4ec"),r=a("262e"),n=a("2caf"),o=a("9ab4"),l=a("1b40"),u=function(t){Object(r["a"])(a,t);var e=Object(n["a"])(a);function a(){return Object(c["a"])(this,a),e.apply(this,arguments)}return a}(l["d"]);Object(o["a"])([Object(l["c"])()],u.prototype,"links",void 0),u=Object(o["a"])([Object(l["a"])({})],u);var d=u,h=d,g=(a("0879"),a("2877")),f=Object(g["a"])(h,s,i,!1,null,"ec762fe8",null);e["a"]=f.exports},eb89:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Slick",{ref:"slick",staticClass:"similar-slider",attrs:{options:t.sliderSettings}},t._l(t.items,(function(t){return a("div",{key:t.id,staticClass:"similar-slider__wrapper"},[a("CatalogCardItem",{staticClass:"catalog-card--similar similar-slider__slide",attrs:{item:t}})],1)})),0)},i=[],c=a("d4ec"),r=a("262e"),n=a("2caf"),o=a("9ab4"),l=a("1b40"),u=a("7ecd"),d=a("5882"),h=function(t){Object(r["a"])(a,t);var e=Object(n["a"])(a);function a(){var t;return Object(c["a"])(this,a),t=e.apply(this,arguments),t.sliderSettings={mobileFirst:!0,arrows:!1,responsive:[{breakpoint:"300",settings:"unslick"},{breakpoint:"767",settings:{dots:!0,slidesToShow:5,slidesToScroll:5}},{breakpoint:"1296",settings:{arrows:!0,dots:!1,slidesToShow:5,slidesToScroll:5}}]},t}return a}(l["d"]);Object(o["a"])([Object(l["c"])()],h.prototype,"items",void 0),h=Object(o["a"])([Object(l["a"])({components:{CatalogCardItem:d["a"],Slick:u["a"]}})],h);var g=h,f=g,b=(a("13af"),a("2877")),_=Object(b["a"])(f,s,i,!1,null,"378329e0",null);e["a"]=_.exports}}]);
//# sourceMappingURL=chunk-c62744a4.075eaa97.js.map