
let count = 30
const dataArr = (side) => {
    const arr = []
    for (let i = 1; i <= count; i++) {
        const elemArr =   {
            id:     i-1,
            title:  side
        }
        arr.push(elemArr) 
    }
    return arr
}


const dataJson = {
		left: 			dataArr('Left'),
        middle: 		dataArr('Middle'),
        right: 			dataArr('Right')
    }

localStorage.setItem('data', JSON.stringify(dataJson))
const data      = JSON.parse(localStorage.getItem('data')),
    tabContent  = document.getElementsByClassName('tab-c')
// localStorage.clear()


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

window.onhashchange = () => showTab()
window.addEventListener('load', () => showTab())
const checkBox = (item, key) => {
    let  all = []
    const main  = document.getElementById('mainCheck' + '-' + item + '-' + key)
    for ( let i = 0; i < count; i++) {
         all.push(document.getElementById('chk' + i + '-' + item + '-' + key))
    }
    
    console.log(all)

    for(let i = 0; i < all.length; i++) {  
        all[i].onclick = () => {
            let allChecked = document.querySelectorAll('#group > [type="checkbox"]:checked').length
            main.checked = allChecked == all.length
            main.indeterminate = allChecked > 0 && allChecked < all.length
        }
    }

   
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
    if (key == 'bottom') 
        document.querySelector(`#chk${id}-${item}-top`).checked = document.querySelector(`#chk${id}-${item}-${key}`).checked
    else
        document.querySelector(`#chk${id}-${item}-bottom`).checked = document.querySelector(`#chk${id}-${item}-${key}`).checked
}








