// Generic components
// Author Hansell Kopp
//

// Generic functions
//
// Determine if a value is object
function isObject(obj) {
  return obj === Object(obj);
}

// Jquery Ajax extensions
//
// Ajax delete
//
$.delete = function(url, data, callback, type){
    if ( $.isFunction(data) ){
        type = type || callback,
            callback = data,
            data = {}
    }

    return $.ajax({
        url: url,
        type: 'DELETE',
        success: callback,
        data: data,
        contentType: type
    })
}

// Jquery Ajax extensions
//
// Ajax put
$.put = function(url, data, callback, type){
    if ( $.isFunction(data) ){
        type = type || callback,
        callback = data,
        data = {}
    }
    
    return $.ajax({
        url: url,
        type: 'PUT',
        success: callback,
        data: data,
        contentType: type
    })
}
// Jquery ajax errors extension
$.handleErrors = function(err) {
    let message= ''
    switch(err.status) {
        case 500 :
            let errors = JSON.parse(err.responseText)
            message= 'Validation errors'
            errors.msg.forEach(function(a) {
                let fieldError = document.getElementById(`error-${a.path}`)
                if(fieldError) {
                    // Clear old errors
                    while (fieldError.firstChild) {
                        fieldError.removeChild(fieldError.firstChild);
                    }
                    const fieldMessage = isObject(a.message) ? a.message : a.message
                    fieldError.appendChild(document.createTextNode(fieldMessage + ' '))
                }
            })
            break
        default:
        message = err.statusText
    }
    swal("Error on saving!",`${err.status} ${message}`, "error")    
}
// Autocomplete render input options
// 
function renderOptions(element,data) {
    var items = document.createDocumentFragment()
    $.each(data.places, function(key, value) {
        var option = document.createElement('option')
        option.setAttribute('value', value.place)
        items.append(option)
    })
    element.append(items)
}

// Breadcrumb
//
function renderBreadcrumb(options) {
    const breadcrumb = $('#breadcrumb')
    var fragment = document.createDocumentFragment();
    $.each(options, function(key, value) {
        var item = document.createElement('li')
        var actionLink = document.createElement('a')
        actionLink.href = value.href
        actionLink.appendChild(document.createTextNode(value.text))
        item.appendChild(actionLink)
        fragment.append(item)
    })
    breadcrumb.empty()
    breadcrumb.append(fragment)
}
// Search Box
// 
function makeInputBox(placeholder, icon) {
    var div = document.createElement('div')
    div.className = 'mui-textfield'
    var input = document.createElement('input')
    input.setAttribute('placeholder', placeholder)
    input.setAttribute('id','searchBox')
    input.className ='mui-textfield'
    if (icon) {
        var i = document.createElement('i')
        i.className = `${icon} input-icon`
        div.appendChild(i)
    }
    div.appendChild(input)
    return div
}
// Layout components
//
// Container
function makeContainer() {
    var container = document.createElement('div')
    container.className = 'mui-container-fluid'
    return container
}
// Row
function makeRow() {
    var row = document.createElement('div')
    row.className = 'mui-row'
    return row
}
// Col
function makeCol(cols) {
    var col = document.createElement('div')
    col.className = `mui-col-md-${cols}`
    return col
}

// Table components
//

// Table capion
//
function makeCaption(title, icon) {
    var fragment = document.createDocumentFragment();
    var container = makeContainer()
    var row = makeRow()
    var col = makeCol(12)
    var h = document.createElement('h2')
    var i = document.createElement('i')
    i.className = `fa ${icon}`
    var span = document.createElement('span')
    span.appendChild(document.createTextNode(` ${title}`))
    h.appendChild(i)
    h.appendChild(span)
    col.appendChild(h)
    row.appendChild(col)
    container.appendChild(row)
    var row = makeRow()
    col = new makeCol(10)
    var inputBox = makeInputBox('search','fa fa-search')
    col.appendChild(inputBox)
    row.appendChild(col)
    col = new makeCol(2)
    col.appendChild(makeActionButton(
                'fa-plus', 'mui--text-primary',
                'add',
                onAddClick
            )
    )
    col.className = 'mui--pull-right'
    row.appendChild(col)
    container.appendChild(row)
    fragment.append(container)
    return fragment
}

// Table header row
//
function makeHeader(item) {
    var fragment = document.createDocumentFragment();
    row = document.createElement('tr')
    $.each(item, function(key, value) {
        var cell = document.createElement('th')
        if(value !== 'id') {
          cell.appendChild(document.createTextNode(value))
        } else {
          
        }
        row.appendChild(cell);
    })
    fragment.append(row)
    return fragment
}

// Table body rows
//
function makeBody(data, actions) {
    var fragment = document.createDocumentFragment()
    $.each(data, function(key, value) {
        var row = document.createElement('tr')
        $.each(value, function(childKey, childValue) {
            var cell = document.createElement('td')
            if(childKey !== 'id') {
                // fill data columns
                cell.appendChild(document.createTextNode(childValue))
                row.appendChild(cell);
            } else {
            // create actions buttons
                var span = document.createElement('span')
                span.className = 'mui--pull-right'
                actions.forEach( (action) => {
                    var link = makeActionLink(
                        `${action.url}${value.id}`,
                        action.icon,
                        action.color,
                        action.eventListener
                    )
                    span.appendChild(link)
                })
                cell.append(span)
                row.appendChild(cell)
            }
        })
        fragment.append(row)
    })
    return fragment
}

// Action link
function makeActionLink(href,icon, color, onClick) {
    var actionLink = document.createElement('a')
    actionLink.href = href
    actionLink.className = "mui-btn mui-btn--small"
    actionLink.addEventListener("click", onClick);
    var i = document.createElement('i')
    i.className = `fa ${icon} ${color}`
    actionLink.appendChild(i)
    return actionLink
}

// Action button
function makeActionButton(icon, color, caption, onClick) {
    var button = document.createElement('button')
    button.className = "mui-btn mui-btn--small"
    var i = document.createElement('i')
    i.className = `fa ${icon} ${color}`
    var span = document.createElement('strong')
    span.appendChild(document.createTextNode(` ${caption}`))
    button.appendChild(i)
    button.appendChild(span)
    button.addEventListener("click", onClick);
    return button
}