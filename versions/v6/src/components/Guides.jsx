import React from 'react'
import ProductList from './ProductList'
import products from './ProductData'

const Complete = () => {
    
    return (
        <>
            <section className="min-h-screen bg-gray-100">
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-semibold text-center mb-8">Guides</h1>
                <ProductList products={products} maxProducts={9999} />
            </div>
        </section>
        </>
    )
}

export default Complete;