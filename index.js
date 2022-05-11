import {createGridData} from './business.js'
createGridData()
const   count     = 30,
        data      = JSON.parse(localStorage.getItem('data')),
        tabContent = document.getElementsByClassName('tab-c')
    //localStorage.clear()

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
const checkBox = (item, key) => {
    let  all = []
    const main  = document.getElementById('mainCheck' + '-' + item + '-' + key)
    for ( let i = 0; i < count; i++) {
         all.push(document.getElementById('chk' + i + '-' + item + '-' + key))
         //all.push(document.getElementById('chk' + i + '-' + item + '-bottom'))
    }
    

    for(let i = 0; i < all.length; i++) {  
        all[i].onclick = () => {
            let allChecked = document.querySelectorAll('#group > [type="checkbox"]:checked').length
            main.checked = allChecked == all.length
            main.indeterminate = allChecked > 0 && allChecked < all.length
        }
    }
    
    if (key == 'bottom') 
        document.querySelector(`#mainCheck-${item}-top`).checked = main.checked
    else
        document.querySelector(`#mainCheck-${item}-bottom`).checked = main.checked
   
    for(let i = 0; i < all.length; i++) {
        all[i].checked = main.checked
    }
    
}

const contentTab = (key) => {
    Object.keys(data).map(item => {
        let template 	= document.createElement('template')
        template.innerHTML = `
                            <ol class="list-group list-group-flush">
                            <fieldset id="group">
                                <legend><input class="mainCheck" id="mainCheck-${item}-${key}" type="checkbox">Check all</legend>
                                ${
                                data[item].map(elem =>`
                                    <li class="list-group-item list-group-item-info" >
                                        <input type="checkbox" id="chk${elem.id}-${item}-${key}" onclick="checkCopy('${elem.id}', '${item}', '${key}')">   
                                        ${elem.title}   ${elem.id}
                                    </li>
                                `).join('')		
                                }
                            </fieldset>
                            </ol>
                            `
        document.querySelector('#' + item + '-' + key).append(template.content.cloneNode(true))
       document.querySelector(`#mainCheck-${item}-${key}`).addEventListener('click', () => checkBox(item, key))
    })
    
}
contentTab('top')
contentTab('bottom')
window.checkCopy = (id, item, key) => {
    let elem = document.querySelector(`#chk${id}-${item}-${key}`),
        myIndex = chckArr.indexOf(`#chk${id}-${item}-top,#chk${id}-${item}-bottom`)
       
    if (key == 'bottom') 
        document.querySelector(`#chk${id}-${item}-top`).checked = elem.checked
    else
        document.querySelector(`#chk${id}-${item}-bottom`).checked = elem.checked

    if (elem.checked) 
        chckArr.push(`#chk${id}-${item}-top,#chk${id}-${item}-bottom`)
    else 
        if (myIndex !== -1) {
            chckArr.splice(myIndex, 1);
        }
   
    localStorage.setItem('checkBoxArray', chckArr)

 }








