window.__require=function t(e,o,r){function n(i,a){if(!o[i]){if(!e[i]){var s=i.split("/");if(s=s[s.length-1],!e[s]){var p="function"==typeof __require&&__require;if(!a&&p)return p(s,!0);if(c)return c(s,!0);throw new Error("Cannot find module '"+i+"'")}i=s}var l=o[i]={exports:{}};e[i][0].call(l.exports,function(t){return n(e[i][1][t]||t)},l,l.exports,t,e,o,r)}return o[i].exports}for(var c="function"==typeof __require&&__require,i=0;i<r.length;i++)n(r[i]);return n}({BoardMatrix:[function(t,e,o){"use strict";cc._RF.push(e,"b781fqQoE1Fk7cqHmz+3b8r","BoardMatrix"),Object.defineProperty(o,"__esModule",{value:!0});var r=t("../cell/Cell"),n=t("../game/game.const"),c=t("../utils/Utils"),i=function(){function t(t){void 0===t&&(t=!1),this._matrix=null,this.InitBlankBoard(),t||this.InitGameBoard()}return t.GetInstance=function(){return null==this._instance&&(this._instance=new t),this._instance},Object.defineProperty(t.prototype,"Matrix",{get:function(){return this._matrix},enumerable:!0,configurable:!0}),t.prototype.SetMatrix=function(t){this._matrix=t},t.prototype.NewGame=function(){this.InitBlankBoard(),this.InitGameBoard()},t.prototype.InitBlankBoard=function(){this._matrix=Array(n.BOARD_WIDTH);for(var t=0;t<n.BOARD_WIDTH;t++){this._matrix[t]=Array(n.BOARD_HEIGHT);for(var e=0;e<n.BOARD_HEIGHT;e++)this._matrix[t][e]=new r.Cell(t,e)}cc.log(this._matrix)},t.prototype.InitGameBoard=function(){for(var t=new Array,e=function(e){var r=new cc.Vec2;do{var i=c.Utils.GetRandomInt(0,n.BOARD_WIDTH-1,!0),a=c.Utils.GetRandomInt(0,n.BOARD_HEIGHT-1);r=cc.v2(i,a)}while(t.some(function(t){return t.x===r.x&&t.y===r.y}));t.push(r);var s=o.CreateCell(r);o.SetCell(s)},o=this,r=0;r<n.NO_START_CELL;r++)e();cc.log("board inited"),cc.log(this._matrix)},t.prototype.TestBoard=function(){for(var t=[[2,4,2,0],[4,8,4,8],[2,4,2,16],[4,8,4,8]],e=0;e<t.length;e++)for(var o=0;o<t.length;o++){var r=this.CreateCell(cc.v2(e,o));r.no=t[e][o],this.SetCell(r)}cc.log("board inited"),cc.log(this._matrix),cc.log("have free space: "+this.IsFreeSpace())},t.prototype.CreateCell=function(t){var e=new r.Cell(t.x,t.y);return e.no=n.BEGIN_NUMBER,e.position=cc.v2(t.x,t.y),e},t.prototype.GetCell=function(t){return this._matrix[t.x][t.y]},t.prototype.SetCell=function(t,e){void 0===e&&(e=!1);var o=t.position;this._matrix&&this._matrix[o.x]&&this._matrix[o.x][o.y]&&(e||0===this._matrix[o.x][o.y].no)&&(this._matrix[o.x][o.y]=t)},t.prototype.IsFreePostition=function(t){var e=this.GetCell(t);return e&&0===e.no},t.prototype.SetCellNo=function(t,e){this.IsFreePostition(t)&&(this.GetCell(t).no=e)},t.prototype.SetPositionInBoard=function(t){t.cell},t.prototype.IndexToPosition=function(t){var e,o,r=n.BOARD_WIDTH/2,c=n.BOARD_HEIGHT/2;return e=(t.y-r+.5)*n.CELL_SIZE+n.CELL_PADDING*(t.y-r+.5),o=(c-t.x-.5)*n.CELL_SIZE+n.CELL_PADDING*(c-t.x-.5),cc.v2(e,o)},t.prototype.PositionToIndex=function(t){},t.prototype.CheckGameOver=function(){for(var t=0;t<n.MOVEMENT.TOTAL;t++)if(this.CheckCanMove(t))return!1;return!0},t.prototype.CheckCanMove=function(t){var e=[];if(t===n.MOVEMENT.LEFT||t===n.MOVEMENT.RIGHT){for(var o=0;o<n.BOARD_HEIGHT;o++)e.push(this.GetRow(o));if(t===n.MOVEMENT.LEFT){if(e.some(function(t,e){return 0===t[0].no&&t.some(function(t){return 0!==t.no})}))return!0}else if(t===n.MOVEMENT.RIGHT){if(e.some(function(t,e){return 0===t[n.BOARD_WIDTH-1].no&&t.some(function(t){return 0!==t.no})}))return!0}}if(t===n.MOVEMENT.UP||t===n.MOVEMENT.DOWN){for(o=0;o<n.BOARD_WIDTH;o++)e.push(this.GetColumn(o));if(t===n.MOVEMENT.UP){if(e.some(function(t,e){return 0===t[0].no&&t.some(function(t){return 0!==t.no})}))return!0}else if(t===n.MOVEMENT.DOWN){if(e.some(function(t,e){return 0===t[n.BOARD_HEIGHT-1].no&&t.some(function(t){return 0!==t.no})}))return!0}}for(var r=0,c=e;r<c.length;r++){var i=c[r],a=i.filter(function(t){return 0!==t.no});for(o=0;o<a.length-1;o++)if(a[o].no===a[o+1].no)return!0;var s=null;for(o=0;o<i.length-1;o++)if(0!==i[o].no&&null===s)s=i[o];else if(0===i[o].no&&0!==i[o+1].no&&null!==s)return!0}return!1},t.prototype.GetRow=function(t){for(var e=[],o=0;o<n.BOARD_WIDTH;o++)e.push(this._matrix[t][o]);return e},t.prototype.GetColumn=function(t){for(var e=[],o=0;o<n.BOARD_HEIGHT;o++)e.push(this._matrix[o][t]);return e},t.prototype.CheckWin=function(){return this._matrix.some(function(t){return t.some(function(t){return t.no===n.WIN_NUMBER})})},t.prototype.GetBaseCheck=function(t){var e=[];if(c.Utils.ObjectsEqual(t,n.DIRECTIONS.LEFT))for(var o=0;o<n.BOARD_HEIGHT;o++)e.push(cc.v2(n.BOARD_WIDTH-1,o));else if(c.Utils.ObjectsEqual(t,n.DIRECTIONS.RIGHT))for(o=0;o<n.BOARD_HEIGHT;o++)e.push(cc.v2(0,o));else if(c.Utils.ObjectsEqual(t,n.DIRECTIONS.UP))for(o=0;o<n.BOARD_WIDTH;o++)e.push(cc.v2(o,n.BOARD_HEIGHT-1));else if(c.Utils.ObjectsEqual(t,n.DIRECTIONS.DOWN))for(o=0;o<n.BOARD_HEIGHT;o++)e.push(cc.v2(o,0));return e},t.prototype.MoveUp=function(){for(var t=[],e=0;e<n.BOARD_WIDTH;e++)t.push(this.GetColumn(e));for(e=0;e<n.BOARD_WIDTH;e++){for(var o=t[e],r=o.slice(),c=o[0].no,i=0,a=0,s=0,p=1;p<n.BOARD_HEIGHT;p++)0!==(a=o[p].no)&&a===c?(r[s].no=a+c,o[p].to=cc.v2(s,e),c=o[p+1]?o[p+1].no:0,i=p+1,p+=1,s+=1):0!==c&&0!==a?(r[s].no=c,o[i].to=cc.v2(s,e),c=o[p].no,i=p,s+=1):0!==c&&0==a||0===c&&0!=a&&(c=o[p].no,i=p);i<n.BOARD_HEIGHT&&(r[s].no=c,o[i].to=cc.v2(s,e),s+=1);for(p=s;p<n.BOARD_HEIGHT;p++)o[p].no=0;var l=0;for(p=0;p<n.BOARD_HEIGHT;p++)this._matrix[p][e]=Object.assign({},o[l++])}},t.prototype.MoveDown=function(){for(var t=[],e=0;e<n.BOARD_WIDTH;e++)t.push(this.GetColumn(e));for(e=0;e<n.BOARD_WIDTH;e++){for(var o=t[e],r=o.slice(),c=o[n.BOARD_HEIGHT-1].no,i=n.BOARD_HEIGHT-1,a=0,s=n.BOARD_HEIGHT-1,p=n.BOARD_HEIGHT-1;p>=0;p--)0!==(a=o[p].no)&&a===c?(r[s].no=a+c,r[p].to=cc.v2(s,e),c=o[p-1]?o[p-1].no:0,i=p-1,p-=1,s-=1):0!==c&&0!==a?(r[s].no=c,r[i].to=cc.v2(s,e),c=o[p].no,i=p,s-=1):0!==c&&0==a||0===c&&0!=a&&(c=o[p].no,i=p);i>=0&&(r[s].no=c,r[i].to=cc.v2(s,e),s-=1);for(p=s;p>=0;p--)r[p].no=0;var l=0;for(p=0;p<n.BOARD_HEIGHT;p++)this._matrix[p][e]=Object.assign({},r[l++])}},t.prototype.FoolLoopCondition=function(t,e,o){return t===n.MOVEMENT.UP||t===n.MOVEMENT.LEFT?e<o:e>=o},t.prototype.Move=function(t){var e=0,o=[];if(t.dir===n.MOVEMENT.LEFT||t.dir===n.MOVEMENT.RIGHT)for(var r=0;r<n.BOARD_WIDTH;r++)o.push(this.GetRow(r));else for(r=0;r<n.BOARD_WIDTH;r++)o.push(this.GetColumn(r));for(r=t.startIdx_1;r<t.length_1;r+=t.step_1){for(var c=o[r],i=c.slice(),a=c[t.startPrevIdx].no,s=t.startPrevIdx,p=0,l=t.startPrevIdx,u=t.startIdx_2;this.FoolLoopCondition(t.dir,u,t.length_2);u+=t.step_2)0!==(p=c[u].no)&&p===a?(i[l].no=p+a,i[u].to=t.dir===n.MOVEMENT.UP||t.dir===n.MOVEMENT.DOWN?cc.v2(l,r):cc.v2(r,l),i[s].to=t.dir===n.MOVEMENT.UP||t.dir===n.MOVEMENT.DOWN?cc.v2(l,r):cc.v2(r,l),e+=p+a,a=c[u+t.step_2]?c[u+t.step_2].no:0,s=u+t.step_2,u+=t.step_2,l+=t.stepHole):0!==a&&0!==p?(i[l].no=a,i[s].to=t.dir===n.MOVEMENT.UP||t.dir===n.MOVEMENT.DOWN?cc.v2(l,r):cc.v2(r,l),a=c[u].no,s=u,l+=t.stepHole):0!==a&&0==p||0===a&&0!=p&&(a=c[u].no,s=u);t.dir===n.MOVEMENT.RIGHT||t.dir===n.MOVEMENT.DOWN?s>=0&&(i[l].no=a,i[s].to=t.dir===n.MOVEMENT.DOWN?cc.v2(l,r):cc.v2(r,l),l+=t.stepHole):s<t.length_2&&(i[l].no=a,i[s].to=t.dir===n.MOVEMENT.UP?cc.v2(l,r):cc.v2(r,l),l+=t.stepHole);for(u=l;this.FoolLoopCondition(t.dir,u,t.length_2);u+=t.step_2)c[u].no=0;var d=0;for(u=0;u<(t.dir===n.MOVEMENT.UP||t.dir===n.MOVEMENT.DOWN?n.BOARD_HEIGHT:n.BOARD_WIDTH);u+=1)t.dir===n.MOVEMENT.UP||t.dir===n.MOVEMENT.DOWN?this._matrix[u][r]=i[d++]:this._matrix[r][u]=i[d++]}return cc.log(this._matrix),e},t.prototype.IsFreeSpace=function(){return this._matrix.some(function(t){return t.some(function(t){return 0===t.no})})},t.prototype.GetFreeCells=function(){for(var t=[],e=0;e<n.BOARD_HEIGHT;e++)for(var o=0;o<n.BOARD_WIDTH;o++)0===this._matrix[e][o].no&&t.push(this._matrix[e][o]);return t},t.prototype.SpawnNewRandom=function(){var t=this.GetFreeCells(),e=c.Utils.GetRandomInt(0,t.length,!0);return t[e].no=2,t[e]},t.prototype.SwapCell=function(t,e){var o=t.cell;t.cell=e.cell,e.cell=o},t._instance=null,t}();o.BoardMatrix=i,cc._RF.pop()},{"../cell/Cell":"Cell","../game/game.const":"game.const","../utils/Utils":"Utils"}],Cell:[function(t,e,o){"use strict";cc._RF.push(e,"43a16LJkcFKjK10yiLOxcSG","Cell"),Object.defineProperty(o,"__esModule",{value:!0});var r=function(){return function(t,e){this.to=null,this.no=0,this.position=new cc.Vec2(t,e),this.cell=null,this.to=null}}();o.Cell=r,cc._RF.pop()},{}],GameOverPopup:[function(t,e,o){"use strict";cc._RF.push(e,"d96ddW9t19FbI+DjZnMXhHq","GameOverPopup");var r=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function r(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),n=this&&this.__decorate||function(t,e,o,r){var n,c=arguments.length,i=c<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,r);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(i=(c<3?n(i):c>3?n(e,o,i):n(e,o))||i);return c>3&&i&&Object.defineProperty(e,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var c=cc._decorator,i=c.ccclass,a=c.property,s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.label=null,e.text="hello",e}return r(e,t),e.prototype.start=function(){},n([a(cc.Label)],e.prototype,"label",void 0),n([a],e.prototype,"text",void 0),e=n([i],e)}(cc.Component);o.default=s,cc._RF.pop()},{}],Sound:[function(t,e,o){"use strict";cc._RF.push(e,"97d29FyrCdAPqyPzGFuaC1z","Sound");var r=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function r(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),n=this&&this.__decorate||function(t,e,o,r){var n,c=arguments.length,i=c<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,r);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(i=(c<3?n(i):c>3?n(e,o,i):n(e,o))||i);return c>3&&i&&Object.defineProperty(e,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var c=cc._decorator,i=c.ccclass,a=c.property,s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.resFolder="sounds",e.preloadAudios=[],e}return r(e,t),e.prototype.onLoad=function(){this.preload()},e.prototype.preload=function(){var t=this;cc.loader.loadResDir(this.resFolder,cc.AudioClip,function(e,o){var r;e?cc.log(e):(cc.log(o),(r=t.preloadAudios).push.apply(r,o))})},e.prototype.getAudio=function(t){for(var e=0,o=this.preloadAudios;e<o.length;e++){var r=o[e];if(r.name===t)return r}return null},e.prototype.play=function(t,e){var o=this.getAudio(t);o&&cc.audioEngine.playEffect(o,e)},n([a(cc.String)],e.prototype,"resFolder",void 0),e=n([i],e)}(cc.Component);o.SoundManager=s,cc._RF.pop()},{}],Utils:[function(t,e,o){"use strict";cc._RF.push(e,"d2dc9nIufVAB6eAbFfOu+nd","Utils"),Object.defineProperty(o,"__esModule",{value:!0});var r=t("../board/BoardMatrix"),n=t("../cell/Cell"),c=t("../game/game.model"),i=function(){function t(){}return t.GetRandomInt=function(t,e,o){return void 0===o&&(o=!1),o?Math.floor(Math.random()*(e-t)+t):Math.floor(Math.random()*(e-t+1)+t)},t.ObjectsEqual=function(t,e){return JSON.stringify(t)===JSON.stringify(e)},t.SaveAll=function(){var t=r.BoardMatrix.GetInstance(),e=c.GameModel.Instance();if(t){var o=t.Matrix.map(function(t){return t.map(function(t){var e=new n.Cell(t.position.x,t.position.y);return e.no=t.no,e.position=t.position,e})});cc.sys.localStorage.setItem("board",JSON.stringify(o))}else cc.sys.localStorage.setItem("board","");e&&cc.sys.localStorage.setItem("game",JSON.stringify(e)),cc.sys.localStorage.setItem("highscore",c.GameModel.Instance().HighScore)},t.LoadAll=function(){var t=cc.sys.localStorage.getItem("board"),e=cc.sys.localStorage.getItem("game");if(t){var o=JSON.parse(t);r.BoardMatrix.GetInstance().SetMatrix(o)}if(e){var n=JSON.parse(e);c.GameModel.Instance().CloneAttributes(n)}},t.ClearSavedBoard=function(){cc.sys.localStorage.setItem("board","")},t}();o.Utils=i,cc._RF.pop()},{"../board/BoardMatrix":"BoardMatrix","../cell/Cell":"Cell","../game/game.model":"game.model"}],basepopup:[function(t,e,o){"use strict";cc._RF.push(e,"a4372qk33VNuIluDIaCu1XO","basepopup");var r=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function r(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),n=this&&this.__decorate||function(t,e,o,r){var n,c=arguments.length,i=c<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,r);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(i=(c<3?n(i):c>3?n(e,o,i):n(e,o))||i);return c>3&&i&&Object.defineProperty(e,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var c=cc._decorator,i=c.ccclass,a=c.property,s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.hideOnTouch=!1,e}return r(e,t),e.prototype.onLoad=function(){this.node.active=!1,this.node.opacity=0,this.hideOnTouch&&this.node.on(cc.Node.EventType.TOUCH_END,this.hide,this)},e.prototype.destroy=function(){return t.prototype.destroy.call(this),this.node.off(cc.Node.EventType.TOUCH_END,this.hide,this),!0},e.prototype.start=function(){},e.prototype.show=function(){cc.tween(this.node).set({opacity:0,active:!0}).to(.25,{opacity:255},{easing:"quintIn"}).start()},e.prototype.hide=function(){cc.log("hide"),cc.tween(this.node).to(.25,{opacity:0},{easing:"quintOut"}).set({active:!1}).start()},n([a(cc.Node)],e.prototype,"container",void 0),n([a(Boolean)],e.prototype,"hideOnTouch",void 0),e=n([i],e)}(cc.Component);o.default=s,cc._RF.pop()},{}],"board.animator":[function(t,e,o){"use strict";cc._RF.push(e,"05266P3AmZBvrmV8vPvBneP","board.animator"),Object.defineProperty(o,"__esModule",{value:!0});var r=function(){function t(){}return t.Spawn=function(t,e,o){void 0===e&&(e=!1),void 0===o&&(o=!1);var r=null;return r=cc.tween(t.cell.node).delay(o?.2:0).set({scale:0,opacity:255}).to(.2,{scale:1}),e&&r.start(),r},t.MoveCell=function(t,e,o,r){void 0===r&&(r=!1);var n=null,c=e.IndexToPosition(t.to);return n=cc.tween(t.cell.node).set({zIndex:99}).to(.2,{x:c.x,y:c.y},{easing:"smooth"}).call(function(){return o()}),r&&n.start(),n},t}();o.Animator=r,cc._RF.pop()},{}],board:[function(t,e,o){"use strict";cc._RF.push(e,"60929/KDbBAT6vP2heIoKpg","board");var r=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function r(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),n=this&&this.__decorate||function(t,e,o,r){var n,c=arguments.length,i=c<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,r);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(i=(c<3?n(i):c>3?n(e,o,i):n(e,o))||i);return c>3&&i&&Object.defineProperty(e,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var c=t("../animation/board.animator"),i=t("../cell/cell.component"),a=t("../game/game.const"),s=t("../game/game.controller"),p=t("./BoardMatrix"),l=cc._decorator,u=l.ccclass,d=l.property,f=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.board=null,e.isLocking=!1,e.blockTween=null,e}return r(e,t),e.prototype.onLoad=function(){},e.prototype.start=function(){this.board=p.BoardMatrix.GetInstance(),this.AddToView(),cc.tween(this.node).delay(.5).call(function(){}).start()},e.prototype.NewGame=function(t){var e=this;if(void 0===t&&(t=!1),t){this.board=p.BoardMatrix.GetInstance();for(var o=0,r=this.board.Matrix;o<r.length;o++)for(var n=0,c=r[o];n<c.length;n++){var i=c[n];i&&i.cell&&i.cell.node.destroy()}this.board.NewGame(),this.AddToView()}else cc.tween(this.node).delay(.5).call(function(){e.board=p.BoardMatrix.GetInstance(),e.AddToView()}).start()},e.prototype.AddPlaceholders=function(){for(var t=0;t<a.BOARD_WIDTH;t++)for(var e=0;e<a.BOARD_HEIGHT;e++){var o=cc.instantiate(this.pfCell);o.zIndex=1,this.placeHolder.addChild(o)}},e.prototype.AddToView=function(){for(var t=0;t<a.BOARD_WIDTH;t++)for(var e=0;e<a.BOARD_HEIGHT;e++){var o=cc.instantiate(this.pfCell),r=o.getComponent(i.default),n=this.board.GetCell(cc.v2(t,e));r.SetNumber(n.no),n.cell=r,r.node.setPosition(this.board.IndexToPosition(cc.v2(t,e))),o.opacity=0,this.node.addChild(o),0!==n.no?c.Animator.Spawn(n,!0):o.opacity=255}},e.prototype.HandleMove=function(t){var e=this;if(this.isLocking)cc.log("locking");else{if(this.game.game.GameOver||this.board.CheckWin()||this.board.CheckGameOver())return this.isLocking=!1,this.game.game.EndGame(),void cc.log("Game ended.");var o=this.board.CheckCanMove(t);if(cc.log("can move: "+o),o){this.isLocking=!0,setTimeout(function(){e.isLocking=!1},200),this.game.soundManager.play("move",!1);var r=this.board.Move(a.MoveInfoMap[t]);if(this.UpdateScore(r),cc.log(this.board.Matrix),this.board.CheckWin())cc.log("Won"),this.game.EndGame(!0);else{var n=this.board.SpawnNewRandom();c.Animator.Spawn(n,!0,!0),this.board.CheckGameOver()&&(cc.log("GameOver"),this.game.EndGame(!1))}[].concat.apply([],this.board.Matrix).forEach(function(t,o){var r=t.cell;null!=r&&(null===t.to&&(t.to=cc.v2(t.position.x,t.position.y)),0!==e.board.GetCell(t.to).no?c.Animator.MoveCell(t,e.board,function(){r.node.zIndex=t.no+1,r.node.setPosition(e.board.IndexToPosition(t.position)),r.SetNumber(t.no),t.to=null},!0):t.to=null)})}}},e.prototype.UpdateScore=function(t){this.game.AddScore(t),this.game.UpdateHighScore()},n([d(cc.Prefab)],e.prototype,"pfCell",void 0),n([d(cc.Node)],e.prototype,"placeHolder",void 0),n([d(s.default)],e.prototype,"game",void 0),e=n([u],e)}(cc.Component);o.default=f,cc._RF.pop()},{"../animation/board.animator":"board.animator","../cell/cell.component":"cell.component","../game/game.const":"game.const","../game/game.controller":"game.controller","./BoardMatrix":"BoardMatrix"}],"cell.component":[function(t,e,o){"use strict";cc._RF.push(e,"6335b1/D2FE0ITs9WYrDaOe","cell.component");var r=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function r(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),n=this&&this.__decorate||function(t,e,o,r){var n,c=arguments.length,i=c<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,r);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(i=(c<3?n(i):c>3?n(e,o,i):n(e,o))||i);return c>3&&i&&Object.defineProperty(e,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var c=cc._decorator,i=c.ccclass,a=c.property,s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.start=function(){},e.prototype.SetNumber=function(t){this.label.string=0===t?"":t.toString(),0!==t?this.SetColorBackground(t.toString()):this.node.color=this.node.color.fromHEX("#A29283")},e.prototype.SetColorBackground=function(t){this.node.color=this.node.color.fromHEX(o.ColorDict[t])},n([a(cc.Label)],e.prototype,"label",void 0),e=n([i],e)}(cc.Component);o.default=s,o.ColorDict={2:"#eee4da",4:"#ede0c8",8:"#ebe4da",16:"#ebe4da",32:"#ebe4da",64:"#ebe4da",128:"#ebe4da",256:"#ebe4da",512:"#ebe4da",1024:"#ebe4da",2048:"#ebe4da"},cc._RF.pop()},{}],"game.const":[function(t,e,o){"use strict";var r;cc._RF.push(e,"3fb33Vy94NCOrAwHRcnNTsR","game.const"),Object.defineProperty(o,"__esModule",{value:!0}),o.CELL_SIZE=120,o.CELL_PADDING=20,o.BOARD_WIDTH=4,o.BOARD_HEIGHT=4,o.NO_START_CELL=2,o.BEGIN_NUMBER=2,o.MIN_SWIPE_DISTANCE=50,o.WIN_NUMBER=2048,function(t){t[t.LEFT=0]="LEFT",t[t.RIGHT=1]="RIGHT",t[t.UP=2]="UP",t[t.DOWN=3]="DOWN",t[t.TOTAL=4]="TOTAL"}(r=o.MOVEMENT||(o.MOVEMENT={})),o.DIRECTIONS={LEFT:cc.v2(-1,0),RIGHT:cc.v2(1,0),UP:cc.v2(0,1),DOWN:cc.v2(0,-1)},o.PLACEHOLDER_COLOR="#A29283",o.MoveInfoMap={2:{dir:r.UP,startPrevIdx:0,stepHole:1,length_1:o.BOARD_WIDTH,startIdx_1:0,step_1:1,startIdx_2:1,length_2:o.BOARD_HEIGHT,step_2:1},3:{dir:r.DOWN,startPrevIdx:o.BOARD_HEIGHT-1,stepHole:-1,length_1:o.BOARD_WIDTH,startIdx_1:0,step_1:1,startIdx_2:o.BOARD_HEIGHT-2,length_2:0,step_2:-1},0:{dir:r.LEFT,startPrevIdx:0,stepHole:1,length_1:o.BOARD_HEIGHT,startIdx_1:0,step_1:1,startIdx_2:1,length_2:o.BOARD_WIDTH,step_2:1},1:{dir:r.RIGHT,startPrevIdx:o.BOARD_WIDTH-1,stepHole:-1,length_1:o.BOARD_HEIGHT,startIdx_1:0,step_1:1,startIdx_2:o.BOARD_WIDTH-2,length_2:0,step_2:-1}},cc._RF.pop()},{}],"game.controller":[function(t,e,o){"use strict";cc._RF.push(e,"3576dZDDp5Nm7wC4Q4QRLD0","game.controller");var r=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function r(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),n=this&&this.__decorate||function(t,e,o,r){var n,c=arguments.length,i=c<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,r);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(i=(c<3?n(i):c>3?n(e,o,i):n(e,o))||i);return c>3&&i&&Object.defineProperty(e,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var c=t("../board/board"),i=t("../board/BoardMatrix"),a=t("../popups/masterpopup"),s=t("../utils/Sound"),p=t("../utils/Utils"),l=t("./game.const"),u=t("./game.model"),d=cc._decorator,f=d.ccclass,h=d.property,_=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.score=null,e}return r(e,t),e.prototype.onLoad=function(){this.game=u.GameModel.Instance(),this.board=this.boardCmp.getComponent(c.default),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this),this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this),this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this),cc.game.on(cc.game.EVENT_HIDE,function(){cc.log("lost focus"),p.Utils.SaveAll()}),p.Utils.LoadAll(),i.BoardMatrix.GetInstance().CheckGameOver()||i.BoardMatrix.GetInstance().CheckWin()?this.NewGame():this.score.string=this.game.Score.toString(),this.highScore.string=this.game.HighScore.toString()},e.prototype.onTouchEnd=function(t){t.stopPropagation();var e=t.getLocation(),o=this.startTouch;if(!(Math.sqrt((e.x-o.x)*(e.x-o.x)+(e.y-o.y)*(e.y-o.y))<l.MIN_SWIPE_DISTANCE)){var r=e.x-o.x,n=e.y-o.y,c=Math.abs(n)>Math.abs(r);c&&n>0?this.board.HandleMove(l.MOVEMENT.UP):c?this.board.HandleMove(l.MOVEMENT.DOWN):!c&&r>0?this.board.HandleMove(l.MOVEMENT.RIGHT):this.board.HandleMove(l.MOVEMENT.LEFT)}},e.prototype.onTouchStart=function(t){this.startTouch=t.getLocation()},e.prototype.start=function(){},e.prototype.onKeyUp=function(t){switch(t.keyCode){case cc.macro.KEY.up:this.board.HandleMove(l.MOVEMENT.UP);break;case cc.macro.KEY.down:this.board.HandleMove(l.MOVEMENT.DOWN);break;case cc.macro.KEY.right:this.board.HandleMove(l.MOVEMENT.RIGHT);break;case cc.macro.KEY.left:this.board.HandleMove(l.MOVEMENT.LEFT);break;case cc.macro.KEY.a:cc.sys.localStorage.clear(),cc.log("clear data");break;case cc.macro.KEY.s:this.masterPopup.show("GameOver")}},e.prototype.AddScore=function(t){this.game.AddScore(t),this.score.string=this.game.Score.toString()},e.prototype.UpdateHighScore=function(){var t=this.game.UpdateHighScore();t>0&&(this.highScore.string=t.toString())},e.prototype.SetScore=function(t){this.game.SetScore(0),this.score.string=t.toString()},e.prototype.NewGame=function(){this.board.NewGame(!0),this.SetScore(0),this.game.GameOver=!1,this.board.isLocking=!1},e.prototype.EndGame=function(t){this.game.EndGame(),t?(this.masterPopup.show("GameWon"),this.soundManager.play("clap",!1)):(this.masterPopup.show("GameOver"),this.soundManager.play("lose",!1))},n([h(cc.Label)],e.prototype,"score",void 0),n([h(cc.Label)],e.prototype,"highScore",void 0),n([h(cc.Node)],e.prototype,"boardCmp",void 0),n([h(a.default)],e.prototype,"masterPopup",void 0),n([h(s.SoundManager)],e.prototype,"soundManager",void 0),e=n([f],e)}(cc.Component);o.default=_,cc._RF.pop()},{"../board/BoardMatrix":"BoardMatrix","../board/board":"board","../popups/masterpopup":"masterpopup","../utils/Sound":"Sound","../utils/Utils":"Utils","./game.const":"game.const","./game.model":"game.model"}],"game.model":[function(t,e,o){"use strict";cc._RF.push(e,"4f1d6etU/hLM5p2KTpEDnUF","game.model");var r=this&&this.__assign||function(){return(r=Object.assign||function(t){for(var e,o=1,r=arguments.length;o<r;o++)for(var n in e=arguments[o])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}).apply(this,arguments)};Object.defineProperty(o,"__esModule",{value:!0});var n=function(){function t(){this.NewGame(),this.HighScore=0}return t.Instance=function(){return null==this._instance&&(this._instance=new t),this._instance},t.prototype.NewGame=function(){this.Score=0,this.GameOver=!1},t.prototype.CloneAttributes=function(t){Object.assign(this,r({},t))},t.prototype.EndGame=function(){this.GameOver=!0},t.prototype.AddScore=function(t){this.Score+=t},t.prototype.SetScore=function(t){this.Score=t},t.prototype.UpdateHighScore=function(){return this.Score>this.HighScore?(this.HighScore=this.Score,this.HighScore):0},t.prototype.SetHighscore=function(t){this.HighScore=t},t._instance=null,t}();o.GameModel=n,cc._RF.pop()},{}],masterpopup:[function(t,e,o){"use strict";cc._RF.push(e,"96e05R42klJeImx7t2IPIg2","masterpopup");var r=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function r(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),n=this&&this.__decorate||function(t,e,o,r){var n,c=arguments.length,i=c<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,r);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(i=(c<3?n(i):c>3?n(e,o,i):n(e,o))||i);return c>3&&i&&Object.defineProperty(e,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var c=t("./basepopup"),i=cc._decorator,a=i.ccclass,s=(i.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.onLoad=function(){},e.prototype.start=function(){},e.prototype.show=function(t){var e=this.node.getChildByName(t);null!==e&&e.getComponent(c.default).show()},e.prototype.hide=function(t){var e=this.node.getChildByName(t);null!==e&&e.getComponent(c.default).show()},e=n([a],e)}(cc.Component));o.default=s,cc._RF.pop()},{"./basepopup":"basepopup"}],player:[function(t,e,o){"use strict";cc._RF.push(e,"e231fGtP7hA/ZjG3f5I2uJA","player"),Object.defineProperty(o,"__esModule",{value:!0});var r=function(){return function(){}}();o.Player=r,cc._RF.pop()},{}]},{},["board.animator","BoardMatrix","board","Cell","cell.component","game.const","game.controller","game.model","player","GameOverPopup","basepopup","masterpopup","Sound","Utils"]);