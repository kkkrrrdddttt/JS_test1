const createGridData = () => {
    
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
}

export  {createGridData}