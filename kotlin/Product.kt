// Ejercicio independiente de Kotlin; no requiere un proyecto Android.
class Product(
    val id: Int,
    val name: String,
    val price: Double,
    val category: String,
    var stock: Int?,
)

fun stockLabel(stock: Int?): String = when {
    stock == null -> "Sin dato"
    stock == 0 -> "Agotado"
    stock < 5 -> "Pocas unidades"
    else -> "Disponible"
}

fun applyDiscount(price: Double, percent: Int): Double {
    return price * (1 - percent / 100.0)
}

fun main() {
    val products = listOf(
        Product(1, "Agua mineral 600 ml", 1800.0, "Bebidas", 120),
        Product(2, "Galletas de avena x6", 2700.0, "Snacks", 0),
        Product(3, "Jabón de manos 250 ml", 6900.0, "Aseo", null),
    )

    for (product in products) {
        val discountedPrice = applyDiscount(product.price, 10)
        println("${product.name} | Stock: ${stockLabel(product.stock)} | Precio con 10% de descuento: $discountedPrice")
    }
}
