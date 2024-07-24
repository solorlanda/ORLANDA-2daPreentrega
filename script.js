let productos = [
    { id: 1001, nombre: "Lemon Pie", categoria: "Pies", precio: 5000, stock: 7 },
    { id: 1002, nombre: "Strawberry Pie", categoria: "Pies", precio: 6000, stock: 6 },
    { id: 2001, nombre: "Sacher Cake", categoria: "Cakes", precio: 9000, stock: 9 },
    { id: 2002, nombre: "Apple Cake", categoria: "Cakes", precio: 8000, stock: 5 },
    { id: 2003, nombre: "Chees Cake", categoria: "Cakes", precio: 7500, stock: 8 },
    { id: 3001, nombre: "Macarons", categoria: "Macarons", precio: 500, stock: 45 },
]
let carrito = []

let opcion = Number(prompt("Ingrese: \n1) Comprar \n2) Finalizar compra \n0) Salir"))
console.log(opcion)

while (opcion !== 0) {
    if (opcion === 1) {
        let idProducto = Number(prompt("Si desea filtrar por categoria ingrese: 4 \n\nSino seleccione producto por ID:\n" + listar(productos)))

        if (idProducto === 4) {
            let categoria
            do {
                categoria = Number(prompt("Seleccione la categoria a filtrar: \n1) Pies \n2) Cakes \n3) Macarons"))
            } while (![1, 2, 3].includes(categoria))

            let filtroCategoria
            switch (categoria) {
                case 1:
                    filtroCategoria = productos.filter(producto => producto.categoria === "Pies")
                    break
                case 2:
                    filtroCategoria = productos.filter(producto => producto.categoria === "Cakes")
                    break
                case 3:
                    filtroCategoria = productos.filter(producto => producto.categoria === "Macarons")
                    break
            }

            idProducto = Number(prompt("Ingrese el ID del producto que desea comprar:\n" + listar(filtroCategoria)))
        }

        let productoElegido = productos.find(producto => producto.id === idProducto)
        if (productoElegido && productoElegido.stock > 0) {
            let indiceProductoEnCarrito = carrito.findIndex(producto => producto.id === idProducto)

            if (indiceProductoEnCarrito === -1) {
                carrito.push({
                    id: productoElegido.id,
                    nombre: productoElegido.nombre,
                    precioUnitario: productoElegido.precio,
                    unidades: 1,
                    subtotal: productoElegido.precio
                })
            } else {
                carrito[indiceProductoEnCarrito].unidades++
                carrito[indiceProductoEnCarrito].subtotal = carrito[indiceProductoEnCarrito].unidades * carrito[indiceProductoEnCarrito].precioUnitario
            }

            // Disminuye stock
            productoElegido.stock--
        } else {
            alert("El ID ingresado es inexistente o el producto no tiene stock disponible. Por favor ingrese un ID valido.")
        }

    } else if (opcion === 2) {
        if (carrito.length > 0) {
            let total = carrito.reduce((acum, prod) => acum + prod.subtotal, 0)
            alert("Total: " + total + " .Gracias por su compra.")
            break
        } else {
            alert("El carrito está vacío.")
        }
    }

    opcion = Number(prompt("Ingrese: \n1) Comprar \n2) Finalizar compra \n0) Salir"))
}

function listar(listaProductos) {
    return listaProductos.map(producto => `ID: ${producto.id} - ${producto.nombre} - Categoria: ${producto.categoria} - Precio: $${producto.precio} - Stock: ${producto.stock}`).join("\n")
}