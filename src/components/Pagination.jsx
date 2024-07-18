import React from 'react'

const Pagination = ({totalCategories, categoriesPerPage, setCurrentPage}) => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalCategories/categoriesPerPage); i++) {
        pages.push(i)
    }
  return (
    <div className='pagination'>
        {
            pages.map((page,index) => <button key={index} onClick={() => setCurrentPage(page)} >{page}</button>)
        }
    </div>
  )
}

export default Pagination