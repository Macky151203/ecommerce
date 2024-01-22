'use client'
import React, { FC } from 'react'



function Product({params}) {
    
  return (
    <div>The product id and details- {params.id}</div>
  )
}

export default Product