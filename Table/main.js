//var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
//document.onreadystatechange = function () {
//    if (document.readyState === "complete") {
//        Init('first');
//    }
//};

var TableTool = {
    Init:
        function (Id) {
            if (document.getElementById(Id) === null || document.getElementById(Id).className.indexOf('t-active') !== -1)
                return;
            var ths,
                t = document.getElementById(Id),
                actions = { draggable: false, sortable: true };
            if (t.rows === null || t.rows[0].cells.length === 0)
                return;
            else ths = t.rows[0].cells;


            var SortElem = (function () {
                function prepareElem(el) {
                    var img = document.createElement('img');
                    el.appendChild(img);
                    img.src = 'img/arrowInit.png';
                    img.style.width = '10px';
                    img.style.height = '10px';
                    img.ondrag = function () { return false; };
                    return el;
                }
                function Sortable(e) {
                    e = Event.fixEvent(e);
                    var el = e.target.nodeName === 'IMG' ? e.target.parentNode : e.target;
                    var t = el.offsetParent;
                    var asc = t.querySelector('.sorted-ascending'),
                        desc = t.querySelector('.sorted-descending');
                    if (asc === null && desc === null) {
                        el.className += ' sorted-ascending';
                        el.querySelector('img').src = 'img/arrowDown.png';
                        el.querySelector('img').setAttribute('title', 'ascending');
                        setTableData(t, getTableData(t).sort(SortAsc(el.cellIndex)));
                    }
                    else {
                        if (asc !== null) {
                            if (asc != el) {
                                asc.querySelector('img').src = 'img/arrowInit.png';
                                asc.querySelector('img').removeAttribute('title');
                                asc.className = asc.className.replace('sorted-ascending', '');
                                el.className += ' sorted-ascending';
                                el.querySelector('img').src = 'img/arrowDown.png';
                                el.querySelector('img').setAttribute('title', 'ascending');
                                setTableData(t, getTableData(t).sort(SortAsc(el.cellIndex)));
                            }
                            else {
                                el.className = el.className.replace('sorted-ascending', 'sorted-descending');
                                el.querySelector('img').src = 'img/arrowUp.png';
                                el.querySelector('img').setAttribute('title', 'descending');
                                setTableData(t, getTableData(t).sort(SortDesc(el.cellIndex)));
                            }
                        }
                        else {
                            if (desc !== null) {
                                if (desc != el) {
                                    desc.querySelector('img').src = 'img/arrowInit.png';
                                    desc.querySelector('img').removeAttribute('title');
                                    desc.className = desc.className.replace('sorted-descending', '');
                                    el.className += ' sorted-ascending';
                                    el.querySelector('img').src = 'img/arrowDown.png';
                                    el.querySelector('img').setAttribute('title', 'ascending');
                                    setTableData(t, getTableData(t).sort(SortAsc(el.cellIndex)));
                                }
                                else {
                                    el.className = el.className.replace('sorted-descending', 'sorted-ascending');
                                    el.querySelector('img').src = 'img/arrowDown.png';
                                    el.querySelector('img').setAttribute('title', 'ascending');
                                    setTableData(t, getTableData(t).sort(SortAsc(el.cellIndex)));
                                }
                            }
                        }
                    }
                }
                function getTableData(t) {
                    var rows = t.rows;
                    var span = [],
                        tableData = [];
                    for (var i = 1; i < rows.length; i++) {
                        tableData[i - 1] = [];
                        for (var j = 0; j < rows[i].cells.length; j++) {
                            //if (rows[i].cells[j].rowSpan > 1) {
                            //    span.push({
                            //        cols: rows[i].cells[j].colSpan,
                            //        rows: rows[i].cells[j].rowSpan - 1,
                            //        i: i,
                            //        j: j,
                            //        val: rows[i].cells[j]
                            //    });
                            //}
                            tableData[i - 1][j] = rows[i].cells[j];
                        }
                    }
                    //if (span.length) {
                    //    for (var x = 0; x < span.length; x++) {
                    //        for (var r = span[x].rows; r > 0; r--) {
                    //            tableData[span[x].i].splice(span[x].j, 0, span[x].val);
                    //            span[x].i += 1;
                    //        }
                    //    }
                    //}
                    return tableData;
                }
                //function setTableData(t, data) {
                //    var rows = t.rows;
                //    for (var i = 1; i < rows.length; i++) {
                //        for (var j = 0; j < rows[i].cells.length; j++) {
                //            if (rows[i].cells[j].rowSpan === 1)
                //                rows[i].cells[j].textContent = data[i - 1][j].textContent
                //            else {
                //                rows[i].cells[j].textContent = data[i - 1][j];
                //                for (var span = 1; span < rows[i].cells[j].rowSpan; span++) {
                //                    data[i - 1 + span].splice(j, 1);
                //                }
                //            }
                //        }
                //    }
                //}
                //function getTableData(t) {
                //    var rows = t.rows;
                //    var tableData = [];
                //    for (var i = 1; i < rows.length; i++) {
                //        tableData[i - 1] = [];
                //        for (var j = 0; j < rows[i].cells.length; j++) {
                //            tableData[i - 1][j] = rows[i].cells[j].textContent;
                //        }
                //    }
                //    return tableData;
                //}
                function setTableData(t, data) {
                    var rows = t.rows;
                    for (var i = 1; i < rows.length; i++) {
                        for (var j = 0; j < rows[i].cells.length; j++) {
                            rows[i].cells[j] = data[i - 1][j];
                        }
                    }
                }
                function SortAsc(colNum) {
                    return function (a, b) {
                        if (isNumber(a[colNum].textContent) && isNumber(b[colNum].textContent)) {
                            var a = Number(a[colNum].textContent),
                                b = Number(b[colNum].textContent);
                            return a === b ? 0 : (a < b ? -1 : 1);
                        }
                        else return a[colNum].textContent.localeCompare(b[colNum].textContent);
                    };
                }
                function SortDesc(colNum) {
                    return function (a, b) {
                        if (isNumber(a[colNum].textContent) && isNumber(b[colNum].textContent)) {
                            var a = Number(a[colNum].textContent),
                                b = Number(b[colNum].textContent);
                            return a === b ? 0 : (b < a ? -1 : 1);
                        }
                        else return -a[colNum].textContent.localeCompare(b[colNum].textContent);
                    };
                }
                function isNumber(value) {
                    if (!isNaN(parseFloat(value)) && isFinite(value))
                        return true;
                    else return false;
                }
                return {
                    makeSortable: function (element) {
                        Event.add(prepareElem(element), 'click', Sortable);
                    }
                };
            }());

            var DragElem = (function () {

                var prevParam,
                    Table,
                    DragObj,
                    InitHandlers;

                function mouseDown(e) {
                    if (e.which != 1) return false;
                    e.preventDefault();
                    e = Event.fixEvent(e);
                    if (e.target.nodeName === 'IMG') {
                        prevParam = {
                            parent: e.target.parentNode,
                            x: e.offsetX === undefined ? e.clientX - e.target.parentNode.offsetLeft : e.offsetX + e.target.offsetLeft,
                            y: null,
                            right: Math.abs(e.pageX - e.target.parentNode.getBoundingClientRect().right),
                            style: e.target.parentNode.getBoundingClientRect(),
                            index: e.target.parentNode.cellIndex
                        };
                    } else {
                        prevParam = {
                            parent: e.target,
                            x: e.offsetX === undefined ? e.clientX - e.target.offsetLeft : e.offsetX,
                            y: null,
                            right: Math.abs(e.pageX - e.target.getBoundingClientRect().right),
                            style: e.target.getBoundingClientRect(),
                            index: e.target.cellIndex
                        };
                    }
                    Table = prevParam.parent.offsetParent;
                    prevParam.y = Table.getBoundingClientRect().top + window.pageYOffset;
                    var tcopy = Table.cloneNode(true);
                    for (var i = 0; i < tcopy.rows.length; i++) {
                        for (var j = tcopy.rows[i].cells.length; j > 0; j--) {
                            if (j - 1 != prevParam.index)
                                tcopy.rows[i].removeChild(tcopy.rows[i].cells[j - 1]);
                        }
                    }
                    //var rows = Table.rows;
                    //for (var i = 0; i < rows.length; i++) {
                    //    var tr = document.createElement('tr');
                    //    tcopy.appendChild(tr);
                    //    tr.appendChild(rows[i].cells[prevParam.index].cloneNode(true));
                    //}
                    var getBorderWidth = (function () {
                        var parentItemComputed, top, rigth, bottom, left;
                        parentItemComputed = getComputedStyle(prevParam.parent);
                        top = Number(parentItemComputed.getPropertyValue('border-top-width').replace('px', ''));
                        rigth = Number(parentItemComputed.getPropertyValue('border-right-width').replace('px', ''));
                        bottom = Number(parentItemComputed.getPropertyValue('border-bottom-width').replace('px', ''));
                        left = Number(parentItemComputed.getPropertyValue('border-left-width').replace('px', ''));
                        return Math.max(top, rigth, bottom, left);
                    }());
                    DragObj = tcopy;
                    document.body.appendChild(DragObj);
                    DragObj.className = DragObj.className === '' ? 'copy' : DragObj.className + ' copy';
                    var parentTableWidth = Number(getComputedStyle(Table).getPropertyValue('width').replace('px', ''));
                    if (getBorderWidth || parentTableWidth > prevParam.style.width)
                        DragObj.style.width = prevParam.style.width + getBorderWidth + 'px';
                    DragObj.style.display = 'none';
                    addDocumentEventHandlers();
                }

                function mouseMove(e) {
                    e = Event.fixEvent(e);
                    if (Math.abs(e.pageX - (prevParam.parent.getBoundingClientRect().left + prevParam.x)) < 10 && prevParam.parent.className.indexOf('moving') == -1)
                        return false;
                    if (prevParam.parent.className.indexOf('moving') == -1) {
                        prevParam.parent.className += ' moving';
                    }
                    var outOfLeftBorder = (function () {
                        if (((e.pageX - prevParam.x) < Table.getBoundingClientRect().left))
                            return true;
                        else return false;
                    }());
                    var outOfRightBorder = (function () {
                        if ((e.pageX - prevParam.x + Number(DragObj.style.width.replace('px', ''))) > Table.getBoundingClientRect().right)
                            return true;
                        else {
                            if (DragObj.style.right !== '')
                                DragObj.style.right = '';
                            return false;
                        }
                    }());
                    DragObj.style.display = 'table';
                    DragObj.style.position = 'absolute';
                    DragObj.style.top = prevParam.y + 'px';
                    if (outOfLeftBorder || outOfRightBorder) {
                        if (outOfLeftBorder)
                            DragObj.style.left = Table.getBoundingClientRect().left + 'px';
                        if (outOfRightBorder)
                            DragObj.style.left = Table.getBoundingClientRect().right - DragObj.style.width.replace('px', '') + 'px';
                    }
                    else DragObj.style.left = e.pageX - prevParam.x + 'px';
                    var timeToMove = (function () {
                        if (Number(DragObj.style.left.replace('px', '')) === prevParam.style.left)
                            return false;
                        else {
                            if (DragObj.style.left.replace('px', '') > prevParam.style.left) {
                                if (prevParam.parent.nextElementSibling !== null) {
                                    if ((DragObj.style.left.replace('px', '') - prevParam.style.left) > (prevParam.parent.nextElementSibling.getBoundingClientRect().width / 2))
                                        return 'right';
                                    else return false;
                                }
                                else return false;
                            }
                            else {
                                if (prevParam.parent.previousElementSibling !== null) {
                                    if (Math.abs(DragObj.style.left.replace('px', '') - prevParam.style.left) > (prevParam.parent.previousElementSibling.getBoundingClientRect().width / 2))
                                        return 'left';
                                    else return false;
                                }
                                else return false;
                            }
                        }
                    }());
                    if (timeToMove)
                        move(timeToMove);
                    function move(Side) {
                        if (Side === 'right') {
                            var rows = Table.rows;
                            for (var i = 0; i < rows.length; i++) {
                                var a = rows[i].cells[prevParam.index];
                                var b = rows[i].cells[prevParam.index + 1];
                                rows[i].insertBefore(b, a);
                            }
                            prevParam.index++;
                            prevParam.style = rows[0].cells[prevParam.index].getBoundingClientRect();
                        }
                        if (Side === 'left') {
                            var rows = Table.rows;
                            for (var i = 0; i < rows.length; i++) {
                                var a = rows[i].cells[prevParam.index - 1];
                                var b = rows[i].cells[prevParam.index];
                                rows[i].insertBefore(b, a);
                            }
                            prevParam.index--;
                            prevParam.style = rows[0].cells[prevParam.index].getBoundingClientRect();
                        }
                    }
                }

                function mouseUp(e) {
                    removeDocumentEventHandlers();
                    document.body.removeChild(document.querySelector('.copy'));
                    if (prevParam.parent.className.replace(' moving', '') === '')
                        prevParam.parent.removeAttribute('class');
                    else prevParam.parent.className = prevParam.parent.className.replace(' moving', '');
                }

                function addDocumentEventHandlers() {
                    InitHandlers = {
                        onmousemove: document.onmousemove,
                        ondragstart: document.ondragstart,
                        onselectstart: document.onselectstart,
                        onmouseup: document.onmouseup
                    }
                    document.onmousemove = mouseMove;
                    document.onmouseup = mouseUp;
                    document.ondragstart = document.onselectstart = function (e) { return false; };
                }

                function removeDocumentEventHandlers() {
                    document.onmousemove = InitHandlers.onmousemove;
                    document.onmouseup = InitHandlers.onmouseup;
                    document.ondragstart = InitHandlers.ondragstart;
                    document.onselectstart = InitHandlers.onselectstart;
                }

                return {
                    makeDraggable: function (elem) {
                        Event.add(elem, 'mousedown', mouseDown);
                    }
                }
            }());

            var Event = (function () {
                return {
                    fixEvent: function (event) {
                        event = event || window.event;
                        if (event.isFixed) {
                            return event;
                        }
                        event.isFixed = true;
                        event.preventDefault = event.preventDefault || function () { this.returnValue = false; }
                        event.stopPropagation = event.stopPropagaton || function () { this.cancelBubble = true; }
                        if (!event.target) {
                            event.target = event.srcElement;
                        }
                        if (!event.relatedTarget && event.fromElement) {
                            event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;
                        }
                        if (event.pageX == null && event.clientX != null) {
                            var html = document.documentElement,
                                body = document.body;
                            event.pageX = event.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
                            event.pageY = event.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
                        }
                        if (!event.which && event.button) {
                            event.which = (event.button & 1 ? 1 : (event.button & 2 ? 3 : (event.button & 4 ? 2 : 0)));
                        }
                        return event;
                    },
                    add: function (elem, type, handler) {
                        if (elem.addEventListener)
                            elem.addEventListener(type, handler, false);
                        else if (elem.attachEvent)
                            elem.attachEvent("on" + type, handler);
                    }
                }
            }());

            t.className = t.className.length === 0 ? 't-active' : t.className + ' t-active';
            if (t.rows.length > 1)
                actions.sortable = true;
            if (ths.length > 1)
                actions.draggable = true;
            for (var i = 0; i < ths.length; i++) {
                if (actions.sortable) {
                    SortElem.makeSortable(ths[i]);
                }
                if (actions.draggable) {
                    DragElem.makeDraggable(ths[i]);
                }
            }
        }
}