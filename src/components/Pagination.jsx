"use client"

import React, { useState } from 'react'

const Pagination = ({totalCategories, categoriesPerPage, setCurrentPage , currentPage}) => {
  const [currButton, setCurrButton] = useState(1)
  const buttonsPerPage = 7
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalCategories/categoriesPerPage); i++) {
        pages.push(i)
    }
    const lastButtonIndex = currButton* buttonsPerPage
    const firstButtonIndex = lastButtonIndex - buttonsPerPage
    const currentButtons = pages.slice(firstButtonIndex , lastButtonIndex)
  return (
    <div className='pagination'>
        <span onClick={() =>  currButton > 1 && setCurrButton(currButton-1)}> 	&lt;&lt; </span>
        {currButton > 1 ? <span onClick={() =>  currButton > 1 && setCurrButton(currButton-1)}>&lt; ...</span> : <span>&lt;</span>}
        {
            currentButtons.map((page,index) => <button className={page ===currentPage ? "currentPageBtn" :'pagination-btns'} key={index} onClick={() => setCurrentPage(page)} >{page}</button>)
        }
        {currButton < Math.ceil(pages?.length / buttonsPerPage) ? <span onClick={() => currButton < Math.ceil(pages?.length / buttonsPerPage) && setCurrButton(currButton+1)}>... &gt;</span> : <span>&gt;</span>}
        <span onClick={() => currButton < Math.ceil(pages?.length / buttonsPerPage) && setCurrButton(currButton+1)}> &gt;&gt; </span>


    </div>
  )
}

export default Pagination