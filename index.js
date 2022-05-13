import {createGridData} from './business.js'
const   data      = createGridData(),
        tabContent = document.getElementsByClassName('tab-c')

window.tabs = (event) => {
    const dataTab = event.target.getAttribute('data-tab')
    for (let i = 0; i < tabContent.length; i++) {
        if (dataTab == i) {
            tabContent[i].style.display = 'block'
            history.pushState(null, null, `#${tabContent[i].id}`)
            document.getElementById(i).style.backgroundColor = '#cff4fc'
            }
        else {
            tabContent[i].style.display = 'none'
            document.getElementById(i).style.backgroundColor = 'rgb(126, 211, 214)'  
        }
    }
}

const showTab = () => {
    const location = window.location.hash
    for (let i = 0; i < tabContent.length; i++) {
       if (location == `#${tabContent[i].id}`) {
        tabContent[i].style.display = 'block'
        document.getElementById(i).style.backgroundColor = '#cff4fc'
       }
       else {
            tabContent[i].style.display = 'none'
            document.getElementById(i).style.backgroundColor = 'rgb(126, 211, 214)'
       }
    }
}
window.chckArr = []
window.onhashchange = () => showTab()
window.addEventListener('load', () => showTab())
window.checkBox = (item, key) => {
    let  all = [],
        allTop = [],
        allBottom = [],
        count = document.querySelectorAll(`.chk-${item}-${key}`).length
    const main  = document.getElementById('mainCheck' + '-' + item + '-' + key)
    for ( let i = 0; i < count; i++) {
         all.push(document.getElementById('chk' + i + '-' + item + '-' + key))
         allTop.push(document.getElementById('chk' + i + '-' + item + '-top'))
         allBottom.push(document.getElementById('chk' + i + '-' + item + '-bottom'))
    }
    
    for(let i = 0; i < all.length; i++) {  
        all[i].onclick = () => {
            let allChecked = document.querySelectorAll(`.chk-${item}-${key}:checked`).length,
                elem = document.getElementById('chk' + i + '-' + item + '-' + key)
            document.querySelector(`#mainCheck-${item}-top`).checked = allChecked == all.length
            document.querySelector(`#mainCheck-${item}-bottom`).checked = allChecked == all.length
            document.querySelector(`#mainCheck-${item}-top`).indeterminate = allChecked > 0 && allChecked < all.length
            document.querySelector(`#mainCheck-${item}-bottom`).indeterminate = allChecked > 0 && allChecked < all.length
            document.getElementById('chk' + i + '-' + item + '-top').checked = elem.checked
            document.getElementById('chk' + i + '-' + item + '-bottom').checked = elem.checked
                    
        }

    }

            document.querySelector(`#mainCheck-${item}-top`).checked = main.checked
            document.querySelector(`#mainCheck-${item}-bottom`).checked = main.checked
            document.querySelector(`#mainCheck-${item}-top`).indeterminate = main.indeterminate
            document.querySelector(`#mainCheck-${item}-bottom`).indeterminate = main.indeterminate
  
    for(let i = 0; i < all.length; i++) {
        all[i].checked = main.checked
        allTop[i].checked = main.checked 
        allBottom[i].checked = main.checked  
    }
    
}

const contentTab = (key) => {
    Object.keys(data).map(item => {
        let template 	= document.createElement('template')
        template.innerHTML = `
                            <ol class="list-group list-group-flush">
                            <fieldset id="group">
                                <legend><input class="mainCheck" id="mainCheck-${item}-${key}" type="checkbox" onclick="checkBox('${item}', '${key}')">Check all</legend>
                                ${
                                data[item].map(elem =>`
                                    <li class="list-group-item list-group-item-info" >
                                        <input type="checkbox" class="chk-${item}-${key}" id="chk${elem.id}-${item}-${key}" onclick="checkBox('${item}', '${key}')">   
                                        ${elem.title}   ${elem.id}
                                    </li>
                                `).join('')		
                                }
                            </fieldset>
                            </ol>
                            `
        document.querySelector('#' + item + '-' + key).append(template.content.cloneNode(true))
    })
    
}
contentTab('top')
contentTab('bottom')
