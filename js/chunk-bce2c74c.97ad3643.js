(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bce2c74c"],{"0879":function(t,a,e){"use strict";var i=e("3ea7"),s=e.n(i);s.a},1799:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.paginationInfo.lastPage>1?e("div",{staticClass:"pagination"},[e("button",{staticClass:"button pagination__show-more",attrs:{type:"button",disabled:!!t.paginationInfo&&t.paginationInfo.lastPage===t.currentPage},on:{click:t.showMore}},[t._v("Показать еще "+t._s(t.moreCountNumber)+" "+t._s(t.kindText||t.getKindText()))]),e("paginate",{staticClass:"pagination__paginator",attrs:{"page-count":t.paginationInfo?t.paginationInfo.lastPage:99,"page-range":3,"click-handler":t.pageChange,"prev-text":"Назад","next-text":"Вперед","container-class":"paginator"},model:{value:t.currentPage,callback:function(a){t.currentPage=a},expression:"currentPage"}})],1):t._e()},s=[],n=e("d4ec"),c=e("bee2"),r=e("262e"),o=e("2caf"),l=e("9ab4"),u=e("1b40"),g=e("d70b"),d=e("d4c0"),p=e("48b8"),_=function(t){Object(r["a"])(e,t);var a=Object(o["a"])(e);function e(){var t;return Object(n["a"])(this,e),t=a.apply(this,arguments),t.currentPage=g["b"],t}return Object(c["a"])(e,[{key:"paginationInfoChange",value:function(t){t&&(this.currentPage=t.currentPage,Object(d["a"])(this.$route,{page:this.currentPage}))}},{key:"getKindText",value:function(){var t=this.paginationInfo.perPage;return Object(p["b"])(t,["товар","товара","товаров"])}},{key:"showMore",value:function(){this.$emit("more",this.moreCountNumber)}},{key:"pageChange",value:function(t){this.$emit("page",t)}},{key:"mounted",value:function(){this.paginationInfo&&this.paginationInfo.currentPage&&(this.currentPage=this.paginationInfo.currentPage)}},{key:"moreCountNumber",get:function(){return this.paginationInfo?this.paginationInfo.perPage:this.moreCount}}]),e}(u["d"]);Object(l["a"])([Object(u["c"])()],_.prototype,"paginationInfo",void 0),Object(l["a"])([Object(u["c"])()],_.prototype,"moreCount",void 0),Object(l["a"])([Object(u["c"])()],_.prototype,"kindText",void 0),Object(l["a"])([Object(u["e"])("paginationInfo",{immediate:!0,deep:!0})],_.prototype,"paginationInfoChange",null),_=Object(l["a"])([u["a"]],_);var b=_,f=b,v=(e("baa7"),e("2877")),m=Object(v["a"])(f,i,s,!1,null,"253f7716",null);a["a"]=m.exports},"1c71":function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.block?e("section",{staticClass:"seo"},[e("h2",{staticClass:"seo__title"},[t._v(t._s(t.block.title))]),e("p",{staticClass:"seo__description"},[t._v(t._s(t.block.text))])]):t._e()},s=[],n=e("d4ec"),c=e("262e"),r=e("2caf"),o=e("9ab4"),l=e("1b40"),u=function(t){Object(c["a"])(e,t);var a=Object(r["a"])(e);function e(){return Object(n["a"])(this,e),a.apply(this,arguments)}return e}(l["d"]);Object(o["a"])([Object(l["c"])()],u.prototype,"block",void 0),u=Object(o["a"])([Object(l["a"])({metaInfo:function(){var t=this.block;return{title:t.meta_title,meta:[{vmid:"description",name:"description",content:t.meta_desc},{vmid:"og:desc",name:"og:desc",property:"og:desc",content:t.og_desc},{vmid:"og:image",name:"og:image",property:"og:image",content:t.og_image},{vmid:"og:site",name:"og:site",property:"og:site",content:t.og_site}]}}})],u);var g=u,d=g,p=(e("e02b"),e("2877")),_=Object(p["a"])(d,i,s,!1,null,"7bb35fa2",null);a["a"]=_.exports},"3ddf":function(t,a,e){},"3ea7":function(t,a,e){},"46b4":function(t,a,e){"use strict";var i=e("619e"),s=e.n(i);s.a},4886:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.loaded?e("div",{staticClass:"category page"},[e("div",{staticClass:"container page__breadcrumbs"},[t.breadCrumbs&&t.breadCrumbs.length?e("Breadcrumbs",{attrs:{links:t.breadCrumbs}}):t._e()],1),e("div",{staticClass:"page__header container"},[e("div",{staticClass:"page__title"},[t._v(t._s(t.pageTitle))])]),e("div",{staticClass:"container category__inner page__layout"},[e("div",{staticClass:"page__aside"},[e("CatalogNav",{staticClass:"page__catalog-nav",attrs:{items:t.menuItems}})],1),e("div",{staticClass:"category__items page__content"},[e("div",{staticClass:"category__list"},t._l(t.products,(function(t,a){return e("div",{key:a,staticClass:"category__item"},[e("CatalogCardItem",{attrs:{item:t}})],1)})),0),e("div",{staticClass:"category__pagination"},[e("Pagination",{attrs:{paginationInfo:t.pagination},on:{page:t.pageChange,more:t.showMore}})],1)])]),t.seoBlock?e("section",{staticClass:"section section--seo"},[e("SeoBlock",{staticClass:"container",attrs:{block:t.seoBlock}})],1):t._e()]):e("Loader")},s=[],n=(e("a9e3"),e("5530")),c=e("2909"),r=(e("96cf"),e("1da1")),o=e("d4ec"),l=e("bee2"),u=e("262e"),g=e("2caf"),d=e("9ab4"),p=e("1b40"),_=e("5882"),b=e("824d"),f=e("c344"),v=e("b6c6"),m=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ul",{staticClass:"catalog-nav"},t._l(t.items,(function(a,i){return e("li",{key:i,staticClass:"catalog-nav__item"},[e("router-link",{staticClass:"catalog-nav__link",class:{"catalog-nav__link--main":a.items.length},attrs:{to:a.href}},[t._v(t._s(a.label))]),a.items&&a.items.length?e("ul",{staticClass:"catalog-nav"},t._l(a.items,(function(a,i){return e("li",{key:i,staticClass:"catalog-nav__item"},[e("router-link",{staticClass:"catalog-nav__link",class:{"catalog-nav__link--main":a.items.length},attrs:{to:a.href}},[t._v(t._s(a.label))]),a.items&&a.items.length?e("ul",{staticClass:"catalog-nav"},t._l(a.items,(function(a,i){return e("li",{key:i,staticClass:"catalog-nav__item"},[e("router-link",{staticClass:"catalog-nav__link",class:{"catalog-nav__link--main":a.items.length},attrs:{to:a.href}},[t._v(t._s(a.label))])],1)})),0):t._e()],1)})),0):t._e()],1)})),0)},h=[],C=function(t){Object(u["a"])(e,t);var a=Object(g["a"])(e);function e(){return Object(o["a"])(this,e),a.apply(this,arguments)}return e}(p["d"]);Object(d["a"])([Object(p["c"])()],C.prototype,"items",void 0),C=Object(d["a"])([p["a"]],C);var O=C,j=O,k=(e("6918"),e("2877")),y=Object(k["a"])(j,m,h,!1,null,"29790672",null),P=y.exports,w=e("555f"),x=e("d4c0"),I=e("066b"),$=e("d70b"),z=e("36d3"),B=e("1799"),E=e("1c71"),L=I["l"].POPULAR,M=function(t){Object(u["a"])(e,t);var a=Object(g["a"])(e);function e(){var t;return Object(o["a"])(this,e),t=a.apply(this,arguments),t.productsPending=!1,t.loaded=!1,t.sort=L,t.page=$["b"],t.catalogPage=null,t}return Object(l["a"])(e,[{key:"onRouteChange",value:function(){this.loaded=!1,this.page=$["b"],this.catalogPage=null,this.init()}},{key:"mounted",value:function(){this.init()}},{key:"init",value:function(){var t=Object(x["d"])(this.$route.query);t&&(t.sort&&(this.sort=String(t.sort)),t.page&&(this.page=Number(String(t.page)))),this.loadProducts(!0)}},{key:"loadProducts",value:function(t){var a=this;this.loadProductsRequest().then((function(e){if(e&&e.data){var i=e.data.data;t?a.catalogPage=i:a.catalogPage&&(a.catalogPage.products=i.products),a.loaded=!0,a.productsPending=!1}}))}},{key:"loadProductsRequest",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){var a,e,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=this.$route.params.id,e=this.collectQueryParams(),i=$["d"].category(a,e),t.abrupt("return",Object(z["a"])("GET",i));case 4:case"end":return t.stop()}}),t,this)})));function a(){return t.apply(this,arguments)}return a}()},{key:"collectQueryParams",value:function(){var t=Object(x["b"])({page:this.page,sort:this.sort});return"".concat(t)}},{key:"pageChange",value:function(t){this.productsPending=!0,this.page=t,this.loadProducts()}},{key:"showMore",value:function(){var t=this;this.page+=1,this.loadProductsRequest().then((function(a){if(a&&a.data){var e,i=a.data.data.products.data;if(t.catalogPage)(e=t.catalogPage.products.data).push.apply(e,Object(c["a"])(i)),t.pagination&&(t.catalogPage.products.paginationInfo=Object(n["a"])(Object(n["a"])({},t.pagination),{},{currentPage:t.page}))}}))}},{key:"breadCrumbs",get:function(){return this.catalogPage&&this.catalogPage.breadcrumbs}},{key:"pageTitle",get:function(){return this.catalogPage&&this.catalogPage.title}},{key:"seoBlock",get:function(){return this.catalogPage&&this.catalogPage.seo_block}},{key:"products",get:function(){return this.catalogPage&&this.catalogPage.products.data}},{key:"pagination",get:function(){return this.catalogPage&&this.catalogPage.products.paginationInfo}},{key:"menuItems",get:function(){return this.catalogPage&&this.catalogPage.categoryList}}]),e}(p["d"]);Object(d["a"])([Object(p["e"])("$route")],M.prototype,"onRouteChange",null),M=Object(d["a"])([Object(p["a"])({components:{Pagination:B["a"],Loader:w["a"],CatalogNav:P,Breadcrumbs:v["a"],Advantages:f["a"],TopCategories:b["a"],SeoBlock:E["a"],CatalogCardItem:_["a"]}})],M);var N=M,R=N,S=Object(k["a"])(R,i,s,!1,null,"3a8e36bd",null);a["default"]=S.exports},"555f":function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("loading",{staticClass:"loader",attrs:{color:"#496cff","can-cancel":!0,"is-full-page":!1,active:!0}})},s=[],n=e("d4ec"),c=e("262e"),r=e("2caf"),o=e("9ab4"),l=e("1b40"),u=e("9062"),g=e.n(u),d=function(t){Object(c["a"])(e,t);var a=Object(r["a"])(e);function e(){return Object(n["a"])(this,e),a.apply(this,arguments)}return e}(l["d"]);d=Object(o["a"])([Object(l["a"])({components:{Loading:l["d"].extend(g.a)}})],d);var p=d,_=p,b=(e("46b4"),e("2877")),f=Object(b["a"])(_,i,s,!1,null,"8da308bc",null);a["a"]=f.exports},5882:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"catalog-card",class:{"--isOutlined":t.isOutlined}},[e("button",{staticClass:"catalog-card__fav",class:{"catalog-card__fav--active":t.item.isFavourite},on:{click:t.toggleFav}},[e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[e("g",{attrs:{fill:"#7B8197","fill-rule":"evenodd"}},[e("path",{attrs:{"fill-rule":"nonzero",d:"M17.644 3.468h-3.81v-.621c0-1.11-.903-2.014-2.014-2.014H8.199c-1.11 0-2.014.903-2.014 2.014v.621h-3.81a.506.506 0 00-.508.508c0 .283.226.509.508.509h.919v11.94a2.722 2.722 0 002.718 2.719h7.996a2.722 2.722 0 002.718-2.718V4.485h.918a.506.506 0 00.508-.509.506.506 0 00-.508-.508zM7.201 2.847a1 1 0 01.998-.998h3.621a1 1 0 01.998.998v.621H7.201v-.621zm8.508 13.579c0 .937-.764 1.701-1.701 1.701H6.012a1.704 1.704 0 01-1.702-1.701V4.485h11.403v11.94h-.004z"}}),e("path",{attrs:{d:"M10.01 16.305a.506.506 0 00.508-.508V6.815a.506.506 0 00-.508-.508.506.506 0 00-.509.508v8.978a.51.51 0 00.509.512zm-3.317-.561a.506.506 0 00.508-.508V7.373a.506.506 0 00-.508-.508.506.506 0 00-.508.508v7.864c0 .282.23.508.508.508zm6.633 0a.506.506 0 00.508-.508V7.373a.506.506 0 00-.508-.508.506.506 0 00-.508.508v7.864c0 .282.226.508.508.508z"}})])])]),e("router-link",{staticClass:"catalog-card__inner",attrs:{to:"/product/"+t.item.id}},[e("div",{staticClass:"catalog-card__top"},[e("div",{staticClass:"catalog-card__img",style:{backgroundImage:"url("+t.item.images.preview+")"}}),t.item.features&&t.item.features.length?e("ul",{staticClass:"catalog-card__features"},[t.item.features.find((function(t){return t.time}))?t._l(t.item.features,(function(a){return a.time?e("li",{staticClass:"catalog-card__feature",class:a.icon+" "+(a.time?"catalog-card__feature--time":""),attrs:{title:a.title}},[a.time?e("vac",{staticClass:"catalog-card__feature-time",attrs:{"left-time":a.time},scopedSlots:t._u([{key:"process",fn:function(a){var i=a.timeObj;return[e("span",[t._v(t._s(i.h+":"+i.m+":"+i.s))])]}},{key:"finish",fn:function(){},proxy:!0}],null,!0)}):t._e()],1):t._e()})):t._l(t.item.features,(function(a){return a.time?t._e():e("li",{staticClass:"catalog-card__feature",class:a.icon,attrs:{title:a.title}})}))],2):t._e()]),e("div",{staticClass:"catalog-card__bottom"},[e("div",{staticClass:"catalog-card__group"},[e("p",{staticClass:"catalog-card__group-text"},[t._v(t._s(t.groups)+" "+t._s(t.declOfNum(t.groups))),e("span",[t._v(" на покупку")])]),t.item.rate?e("Rate",{staticClass:"catalog-card__group-rating rate--small-star",attrs:{rate:t.item.rate}}):t._e()],1),e("a",{staticClass:"catalog-card__title-link"},[e("h3",{staticClass:"catalog-card__title"},[t._v(t._s(t._f("truncate")(t.item.title,t.truncateLength)))])]),e("div",{staticClass:"catalog-card__price"},[e("p",{staticClass:"catalog-card__old-price"},[t._v(t._s(t.divideNumberWithSpaces(t.item.selfPrice))+" ₽")]),e("p",{staticClass:"catalog-card__actual-price"},[e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"16",viewBox:"0 0 13 10"}},[e("path",{attrs:{d:"M4.12 6c.869 0 1.67.263 2.316.707.888.61 1.483 1.561 1.556 2.643.005.075.008.15.008.226V10H0v-.424C0 7.6 1.737 6 3.88 6zm5.403-1C11.44 5 13 6.48 13 8.298V9H8.746A4.037 4.037 0 008.4 7.57a4.206 4.206 0 00-.96-1.35A4.257 4.257 0 007 5.853 3.568 3.568 0 019.33 5zM3.5 0C4.879 0 6 1.122 6 2.5S4.878 5 3.5 5C2.121 5 1 3.878 1 2.5S2.121 0 3.5 0zm5.498 0C10.094 0 10.99.887 11 1.984c.005.53-.196 1.03-.565 1.41A1.979 1.979 0 019.017 4h-.016a1.986 1.986 0 01-1.412-.584A1.989 1.989 0 017 2.016c-.005-.53.196-1.03.565-1.41A1.979 1.979 0 018.983 0z",fill:"currentColor","fill-rule":"evenodd"}})]),e("span",[t._v(t._s(t.divideNumberWithSpaces(t.item.groupPrice))+" ₽")])])])])])],1)},s=[],n=e("d4ec"),c=e("bee2"),r=e("262e"),o=e("2caf"),l=e("9ab4"),u=e("1b40"),g=e("48b8"),d=e("88d9"),p=e("36d3"),_=e("d70b"),b=function(t){Object(r["a"])(e,t);var a=Object(o["a"])(e);function e(){var t;return Object(n["a"])(this,e),t=a.apply(this,arguments),t.declOfNum=function(t){return Object(g["b"])(t,["группа","группы","групп"])},t.divideNumberWithSpaces=function(t){return Object(g["c"])(t)},t}return Object(c["a"])(e,[{key:"toggleFav",value:function(){var t=this,a=this.item.product_id;this.item.isFavourite=!this.item.isFavourite,this.$emit("toggle-fav"),Object(p["a"])("GET",_["d"].favourites.deleteProduct(a)).then((function(){t.$emit("favRemove",{id:a})}))}},{key:"truncateLength",get:function(){return this.titleLength||35}},{key:"groups",get:function(){return this.item.group&&this.item.group.data?this.item.group.data.length:0}}]),e}(u["d"]);Object(l["a"])([Object(u["c"])({type:Boolean,default:!1})],b.prototype,"isOutlined",void 0),Object(l["a"])([Object(u["c"])()],b.prototype,"item",void 0),Object(l["a"])([Object(u["c"])()],b.prototype,"titleLength",void 0),b=Object(l["a"])([Object(u["a"])({components:{Rate:d["a"]}})],b);var f=b,v=f,m=(e("c458"),e("d338"),e("f960"),e("2877")),h=Object(m["a"])(v,i,s,!1,null,"7645742c",null);a["a"]=h.exports},"5fc3":function(t,a,e){"use strict";var i=e("67d9"),s=e.n(i);s.a},"619e":function(t,a,e){},"67d9":function(t,a,e){},6918:function(t,a,e){"use strict";var i=e("e087"),s=e.n(i);s.a},"824d":function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.groupedCategories?e("div",{staticClass:"top-categories"},[e("div",{staticClass:"top-categories__pane"},[e("div",{staticClass:"top-categories__list top-categories__list--laptop"},t._l(t.categories,(function(a,i){return e("router-link",{key:i,staticClass:"top-categories__link",class:"top-categories__link--"+a.type,attrs:{to:a.link}},[e("p",{staticClass:"top-categories__title"},[t._v(t._s(a.title))]),e("span",{staticClass:"top-categories__img-wrapper",class:"top-categories__img-wrapper--"+a.position+" top-categories__img-wrapper--"+a.color+"  top-categories__img-wrapper--mobile-"+a.positionMobile,style:{backgroundImage:"url("+a.src+")"}})])})),1),e("div",{staticClass:"top-categories__list"},t._l(t.groupedCategories,(function(a){return e("div",{staticClass:"top-categories__col"},t._l(a,(function(a,i){return e("router-link",{key:i,staticClass:"top-categories__link",class:"top-categories__link--"+a.type,attrs:{to:a.link}},[e("p",{staticClass:"top-categories__title"},[t._v(t._s(a.title))]),e("span",{staticClass:"top-categories__img-wrapper",class:"top-categories__img-wrapper--"+a.position+" top-categories__img-wrapper--"+a.color+"  top-categories__img-wrapper--mobile-"+a.positionMobile,style:{backgroundImage:"url("+a.src+")"}})])})),1)})),0)])]):t._e()},s=[],n=(e("13d5"),e("fb6a"),e("d4ec")),c=e("bee2"),r=e("262e"),o=e("2caf"),l=e("9ab4"),u=e("1b40"),g=function(t){Object(r["a"])(e,t);var a=Object(o["a"])(e);function e(){return Object(n["a"])(this,e),a.apply(this,arguments)}return Object(c["a"])(e,[{key:"groupedCategories",get:function(){return this.categories.reduce((function(t,a,e,i){return e%2===0&&t.push(i.slice(e,e+2)),t}),[])}}]),e}(u["d"]);Object(l["a"])([Object(u["c"])()],g.prototype,"categories",void 0),g=Object(l["a"])([u["a"]],g);var d=g,p=d,_=(e("5fc3"),e("2877")),b=Object(_["a"])(p,i,s,!1,null,"69f315db",null);a["a"]=b.exports},a1a4:function(t,a,e){},aa7d:function(t,a,e){},b6c6:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.links&&t.links.length?e("ul",{staticClass:"breadcrumbs"},t._l(t.links,(function(a){return e("li",{key:a.title,staticClass:"breadcrumbs__item"},[a.current?e("span",{staticClass:"breadcrumbs__link breadcrumbs__link--current"},[t._v(" "+t._s(a.title||a.label))]):e("router-link",{staticClass:"breadcrumbs__link",attrs:{to:a.link||a.href}},[t._v(" "+t._s(a.title||a.label))])],1)})),0):t._e()},s=[],n=e("d4ec"),c=e("262e"),r=e("2caf"),o=e("9ab4"),l=e("1b40"),u=function(t){Object(c["a"])(e,t);var a=Object(r["a"])(e);function e(){return Object(n["a"])(this,e),a.apply(this,arguments)}return e}(l["d"]);Object(o["a"])([Object(l["c"])()],u.prototype,"links",void 0),u=Object(o["a"])([Object(l["a"])({})],u);var g=u,d=g,p=(e("0879"),e("2877")),_=Object(p["a"])(d,i,s,!1,null,"ec762fe8",null);a["a"]=_.exports},baa7:function(t,a,e){"use strict";var i=e("c882"),s=e.n(i);s.a},c344:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("section",{staticClass:"advantages"},[e("div",{staticClass:"container"},[e("ul",{staticClass:"advantages__list"},t._l(t.advantagesList,(function(a){return e("li",{staticClass:"advantages__item"},[e("span",{staticClass:"advantages__icon",class:"advantages__icon--"+a.type}),e("div",{staticClass:"advantages__inner"},[e("h3",{staticClass:"advantages__title"},[t._v(t._s(a.title))]),e("p",{staticClass:"advantages__text"},[t._v(t._s(a.text))])])])})),0)])])},s=[],n=e("d4ec"),c=e("262e"),r=e("2caf"),o=e("9ab4"),l=e("1b40"),u=function(t){Object(c["a"])(e,t);var a=Object(r["a"])(e);function e(){return Object(n["a"])(this,e),a.apply(this,arguments)}return e}(l["d"]);Object(o["a"])([Object(l["c"])()],u.prototype,"advantagesList",void 0),u=Object(o["a"])([l["a"]],u);var g=u,d=g,p=(e("dd50"),e("2877")),_=Object(p["a"])(d,i,s,!1,null,"4d44e09f",null);a["a"]=_.exports},c458:function(t,a,e){"use strict";var i=e("a1a4"),s=e.n(i);s.a},c882:function(t,a,e){},d338:function(t,a,e){"use strict";var i=e("3ddf"),s=e.n(i);s.a},dd50:function(t,a,e){"use strict";var i=e("f5b8"),s=e.n(i);s.a},e02b:function(t,a,e){"use strict";var i=e("aa7d"),s=e.n(i);s.a},e087:function(t,a,e){},f5b8:function(t,a,e){},f960:function(t,a,e){"use strict";var i=e("fed6"),s=e.n(i);s.a},fed6:function(t,a,e){}}]);
//# sourceMappingURL=chunk-bce2c74c.97ad3643.js.map