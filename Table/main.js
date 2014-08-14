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
                    img.style.cssFloat = 'right';
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
                        el.className = el.className === '' ? 'sorted-ascending' : el.className + ' sorted-ascending';
                        el.querySelector('img').src = 'img/arrowDown.png';
                        el.setAttribute('title', 'sorted ascending');
                        moveRows(getTableData(t, el.cellIndex, SortAsc).sort(SortAsc()));
                    }
                    else {
                        if (asc !== null) {
                            if (asc !== el) {
                                asc.querySelector('img').src = 'img/arrowInit.png';
                                asc.removeAttribute('title');
                                asc.className = asc.className.replace('sorted-ascending', '');
                                el.className += ' sorted-ascending';
                                el.querySelector('img').src = 'img/arrowDown.png';
                                el.setAttribute('title', 'sorted ascending');
                                moveRows(getTableData(t, el.cellIndex, SortAsc).sort(SortAsc()));
                            }
                            else {
                                el.className = el.className.replace('sorted-ascending', 'sorted-descending');
                                el.querySelector('img').src = 'img/arrowUp.png';
                                el.setAttribute('title', 'sorted descending');
                                moveRows(getTableData(t, el.cellIndex, SortDesc).sort(SortDesc()));
                            }
                        }
                        else {
                            if (desc !== null) {
                                if (desc !== el) {
                                    desc.querySelector('img').src = 'img/arrowInit.png';
                                    desc.removeAttribute('title');
                                    desc.className = desc.className.replace('sorted-descending', '') === '' ? '' : desc.className.replace('sorted-descending', '');
                                    el.className = el.className === '' ? 'sorted-ascending' : el.className + ' sorted-ascending';
                                    el.querySelector('img').src = 'img/arrowDown.png';
                                    el.setAttribute('title', 'sorted ascending');
                                    moveRows(getTableData(t, el.cellIndex, SortAsc).sort(SortAsc()));
                                }
                                else {
                                    el.className = el.className.replace('sorted-descending', 'sorted-ascending');
                                    el.querySelector('img').src = 'img/arrowDown.png';
                                    el.setAttribute('title', 'sorted ascending');
                                    moveRows(getTableData(t, el.cellIndex, SortAsc).sort(SortAsc()));
                                }
                            }
                        }
                    }
                }
                function getTableData(t, index, sort) {
                    var rows = Array.prototype.slice.call(t.rows),
                        col = [],
                        insertInCol = [];
                    rows.shift();
                    for (var i = 0; i < rows.length; i++) {
                        if (rows[i].querySelector('[rowspan]')) {
                            var spancell = rows[i].querySelector('[rowspan]');
                            if (spancell.cellIndex === index) {
                                col.push(spancell);
                            }
                            else {
                                insertInCol[insertInCol.length] = [];
                                insertInCol[insertInCol.length - 1].push(rows[i].cells[index]);
                                for (var s = 1; s < spancell.rowSpan; s++) {
                                    if (spancell.cellIndex < index)
                                        insertInCol[insertInCol.length - 1][s] = rows[i + s].cells[index - 1];
                                    else insertInCol[insertInCol.length - 1][s] = rows[i + s].cells[index];
                                }
                                insertInCol[insertInCol.length - 1].sort(sort());
                                moveRows(insertInCol[insertInCol.length - 1], spancell.parentNode);
                                col.push(insertInCol[insertInCol.length - 1][0]);
                            }
                            i += spancell.rowSpan - 1;
                        }
                        else col.push(rows[i].cells[index]);
                    }
                    return col;
                }

                function SortAsc() {
                    return function (a, b) {
                        if (isNumber(a.textContent) && isNumber(b.textContent)) {
                            var a = Number(a.textContent),
                                b = Number(b.textContent);
                            return a === b ? 0 : (a < b ? -1 : 1);
                        }
                        else return a.textContent.localeCompare(b.textContent);
                    };
                }

                function SortDesc(colNum) {
                    return function (a, b) {
                        if (isNumber(a.textContent) && isNumber(b.textContent)) {
                            var a = Number(a.textContent),
                                b = Number(b.textContent);
                            return a === b ? 0 : (b < a ? -1 : 1);
                        }
                        else return -a.textContent.localeCompare(b.textContent);
                    };
                }

                function isNumber(value) {
                    if (!isNaN(parseFloat(value)) && isFinite(value))
                        return true;
                    else return false;
                }

                function moveRows(tdsArr, spanrow) {
                    var currentRow = 1,
                        moveAgain = false,
                        elem = tdsArr[0].offsetParent;
                    if (spanrow) {
                        var spanRowIndex = spanrow.rowIndex;
                        for (var i = 0; i < tdsArr.length; i++) {
                            var index = tdsArr[i].parentNode.rowIndex,
                                spancell = spanrow.querySelector('[rowspan]');
                            if (index !== spanRowIndex + i) {
                                if (index > spanRowIndex + i)
                                    spanrow.parentNode.insertBefore(tdsArr[i].parentNode, elem.rows[spanRowIndex + i]);
                                else spanrow.parentNode.insertBefore(tdsArr[i].parentNode, elem.rows[spanRowIndex + i + 1]);
                            }
                        }
                        if (tdsArr[0].parentNode !== spanrow) {
                            if (spancell.cellIndex === spanrow.cells.length - 1)
                                tdsArr[0].parentNode.insertBefore(spancell, tdsArr[0].parentNode.cells[spancell.cellIndex + 1]);
                            else tdsArr[0].parentNode.insertBefore(spancell, tdsArr[0].parentNode.cells[spancell.cellIndex]);
                        }
                    }
                    else {
                        for (var i = 0; i < tdsArr.length; i++) {
                            var index = tdsArr[i].parentNode.rowIndex,
                                spancell = tdsArr[i].parentNode.querySelector('[rowspan]');
                            if (index !== currentRow) {
                                if (currentRow > index) {
                                    if (spancell) {
                                        for (var j = 0; j < spancell.rowSpan; j++) {
                                            elem.rows[i + 1].parentNode.insertBefore(elem.rows[index], elem.rows[currentRow + 1]);
                                        }
                                        currentRow += spancell.rowSpan;
                                    }
                                    else {
                                        elem.rows[i + 1].parentNode.insertBefore(elem.rows[index], elem.rows[currentRow + 1]);
                                        currentRow++;
                                    }
                                    moveAgain = true;
                                }
                                else {
                                    if (spancell) {
                                        for (var j = 0; j < spancell.rowSpan; j++) {
                                            elem.rows[i + 1].parentNode.insertBefore(elem.rows[index + spancell.rowSpan - 1], elem.rows[currentRow]);
                                        }
                                        currentRow += spancell.rowSpan;
                                    }
                                    else {
                                        elem.rows[i + 1].parentNode.insertBefore(elem.rows[index], elem.rows[currentRow]);
                                        currentRow++;
                                    }
                                    moveAgain = true;
                                }
                            }
                            else {
                                if (spancell && index === currentRow) {
                                    currentRow += spancell.rowSpan;
                                }
                                else {
                                    if (!spancell && index === currentRow) {
                                        currentRow++;
                                    }
                                }
                            }
                        }
                    }
                    if (moveAgain)
                        moveRows(tdsArr, spanrow);
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
                            x: e.offsetX === undefined ? e.layerX - e.target.parentNode.offsetLeft : e.offsetX + e.target.offsetLeft,
                            y: null,
                            right: Math.abs(e.pageX - e.target.parentNode.getBoundingClientRect().right),
                            style: e.target.parentNode.getBoundingClientRect(),
                            index: e.target.parentNode.cellIndex
                        };
                    } else {
                        prevParam = {
                            parent: e.target,
                            x: e.offsetX === undefined ? e.layerX - e.currentTarget.offsetLeft : e.offsetX,
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
                        if (tcopy.rows[i].querySelector('[rowspan]') === null) {
                            for (var j = tcopy.rows[i].cells.length; j > 0; j--) {
                                if (j - 1 != prevParam.index)
                                    tcopy.rows[i].removeChild(tcopy.rows[i].cells[j - 1]);
                            }
                            if (tcopy.rows[i].textContent.trim() === '')
                                tcopy.rows[i].style.height = Table.rows[i].getBoundingClientRect().height + 'px';
                        }
                        else {
                            var spancell = tcopy.rows[i].querySelector('[rowspan]'),
                                span = spancell.rowSpan;
                            switch (true) {
                                case (spancell.cellIndex === prevParam.index): {
                                    for (var j = tcopy.rows[i].cells.length; j > 0; j--) {
                                        if (j - 1 != prevParam.index)
                                            tcopy.rows[i].removeChild(tcopy.rows[i].cells[j - 1]);
                                    }
                                    tcopy.rows[i].style.height = Table.rows[i].getBoundingClientRect().height + 'px';
                                    for (var r = 1; r < span; r++) {
                                        for (var j = tcopy.rows[i + r].cells.length; j > 0; j--) {
                                            while (tcopy.rows[i + r].hasChildNodes())
                                                tcopy.rows[i + r].removeChild(tcopy.rows[i + r].firstChild);
                                            tcopy.rows[i + r].style.height = Table.rows[i + r].getBoundingClientRect().height + 'px';
                                        }
                                    }
                                    i += span - 1;
                                    break;
                                }
                                case (spancell.cellIndex < prevParam.index): {
                                    for (var j = tcopy.rows[i].cells.length; j > 0; j--) {
                                        if (j - 1 != prevParam.index)
                                            tcopy.rows[i].removeChild(tcopy.rows[i].cells[j - 1]);
                                    }
                                    if (tcopy.rows[i].textContent.trim() === '')
                                        tcopy.rows[i].style.height = Table.rows[i].getBoundingClientRect().height + 'px';
                                    for (var r = 1; r < span; r++) {
                                        for (var j = tcopy.rows[i + r].cells.length; j > 0; j--) {
                                            if (j != prevParam.index)
                                                tcopy.rows[i + r].removeChild(tcopy.rows[i + r].cells[j - 1]);
                                        }
                                        if (tcopy.rows[i + r].textContent.trim() === '')
                                            tcopy.rows[i + r].style.height = Table.rows[i + r].getBoundingClientRect().height + 'px';
                                    }
                                    i += span - 1;
                                    break;
                                }
                                case (spancell.cellIndex > prevParam.index): {
                                    for (var j = tcopy.rows[i].cells.length; j > 0; j--) {
                                        if (j - 1 != prevParam.index)
                                            tcopy.rows[i].removeChild(tcopy.rows[i].cells[j - 1]);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    DragObj = tcopy;
                    var getBorderWidth = (function () {
                        var parentItemComputed,
                            top,
                            rigth,
                            bottom,
                            left;
                        parentItemComputed = getComputedStyle(prevParam.parent);
                        top = Number(parentItemComputed.getPropertyValue('border-top-width').replace('px', ''));
                        rigth = Number(parentItemComputed.getPropertyValue('border-right-width').replace('px', ''));
                        bottom = Number(parentItemComputed.getPropertyValue('border-bottom-width').replace('px', ''));
                        left = Number(parentItemComputed.getPropertyValue('border-left-width').replace('px', ''));
                        return Math.max(top, rigth, bottom, left);
                    }());
                    var parentTableWidth = Number(getComputedStyle(Table).getPropertyValue('width').replace('px', ''));
                    if (getBorderWidth || parentTableWidth > prevParam.style.width)
                        DragObj.style.width = prevParam.style.width + getBorderWidth + 'px';
                    document.body.appendChild(DragObj);
                    DragObj.className = DragObj.className === '' ? 'copy' : DragObj.className + ' copy';
                    DragObj.style.left = prevParam.parent.getBoundingClientRect().left + 'px';
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
                        switch (Side) {
                            case 'right': {
                                var rows = Table.rows;
                                for (var i = 0; i < rows.length; i++) {
                                    var spancell = rows[i].querySelector('[rowspan]');
                                    if (spancell === null || spancell.cellIndex > prevParam.index + 1) {
                                        var a = rows[i].cells[prevParam.index];
                                        var b = rows[i].cells[prevParam.index + 1];
                                        rows[i].insertBefore(b, a);
                                    }
                                    else {
                                        if (spancell.cellIndex === prevParam.index || spancell.cellIndex === prevParam.index + 1) {
                                            var a = rows[i].cells[prevParam.index];
                                            var b = rows[i].cells[prevParam.index + 1];
                                            rows[i].insertBefore(b, a);
                                            i += spancell.rowSpan - 1;
                                        }
                                        if (spancell.cellIndex < prevParam.index) {
                                            var a = rows[i].cells[prevParam.index];
                                            var b = rows[i].cells[prevParam.index + 1];
                                            rows[i].insertBefore(b, a);
                                            for (var s = 1; s < spancell.rowSpan; s++) {
                                                var a = rows[i + s].cells[prevParam.index - 1];
                                                var b = rows[i + s].cells[prevParam.index];
                                                rows[i + s].insertBefore(b, a);
                                            }
                                            i += spancell.rowSpan - 1;
                                        }
                                    }
                                }
                                prevParam.index++;
                                prevParam.style = rows[0].cells[prevParam.index].getBoundingClientRect();
                                break;
                            }
                            case 'left': {
                                var rows = Table.rows;
                                for (var i = 0; i < rows.length; i++) {
                                    var spancell = rows[i].querySelector('[rowspan]');
                                    if (spancell === null || spancell.cellIndex > prevParam.index) {
                                        var a = rows[i].cells[prevParam.index - 1];
                                        var b = rows[i].cells[prevParam.index];
                                        rows[i].insertBefore(b, a);
                                    }
                                    else {
                                        if (spancell.cellIndex === prevParam.index || spancell.cellIndex === prevParam.index - 1) {
                                            var a = rows[i].cells[prevParam.index - 1];
                                            var b = rows[i].cells[prevParam.index];
                                            rows[i].insertBefore(b, a);
                                            i += spancell.rowSpan - 1;
                                            continue;
                                        }
                                        if (spancell.cellIndex < prevParam.index) {
                                            var a = rows[i].cells[prevParam.index - 1];
                                            var b = rows[i].cells[prevParam.index];
                                            rows[i].insertBefore(b, a);
                                            for (var s = 1; s < spancell.rowSpan; s++) {
                                                var a = rows[i + s].cells[prevParam.index - 2];
                                                var b = rows[i + s].cells[prevParam.index - 1];
                                                rows[i + s].insertBefore(b, a);
                                            }
                                            i += spancell.rowSpan - 1;
                                            continue;
                                        }
                                    }
                                }
                                prevParam.index--;
                                prevParam.style = rows[0].cells[prevParam.index].getBoundingClientRect();
                                break;
                            }
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