// Generic components
// Author Hansell Kopp
//
// Table header row
function makeHeader(item) {
    var fragment = document.createDocumentFragment();
    var row = document.createElement('tr')
    $.each(item, function(key, value) {
        var cell = document.createElement('th')
        if(value !== 'id') {
          cell.appendChild(document.createTextNode(value))
        } else {
          var button = makeActionButton(
            'fa-plus',
            'mui--text-primary',
            'add',
            onAddClick
          )
          button.className += ' mui--pull-right'
          cell.appendChild(button)
        }
        row.appendChild(cell);
    })
    fragment.append(row)
    return fragment
}
// Table body rows
function makeBody(data) {
    var fragment = document.createDocumentFragment()
    $.each(data, function(key, value) {
        var row = document.createElement('tr')
        fragment.appendChild(row)
        $.each(value, function(childKey, childValue) {
        var cell = document.createElement('td')
        // fill data columns
        if(childKey !== 'id') {
            cell.appendChild(document.createTextNode(childValue))
            row.appendChild(cell);
        }
        })
        // create actions buttons
        var div = document.createElement('div')
        div.className = 'mui--pull-right'
        div.appendChild(makeActionLink("/users/delete/" + value.id, 'fa-times', 'mui--text-accent'))
        div.appendChild(makeActionLink("/users/edit/" + value.id, 'fa-pencil', 'mui--text-primary'))
        var cell = document.createElement('td')
        cell.append(div)
        row.appendChild(cell)
        fragment.append(row)
    })
    return fragment
}
// Action link
function makeActionLink(href,icon, color) {
    var actionLink = document.createElement('a')
    actionLink.href = href
    actionLink.className = "mui-btn mui-btn--small"
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
    i.appendChild(document.createTextNode(` ${caption}`))
    button.appendChild(i)
    button.addEventListener("click", onClick);
    return button
}