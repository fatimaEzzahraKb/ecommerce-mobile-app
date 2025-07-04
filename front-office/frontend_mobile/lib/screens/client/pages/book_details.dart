import 'package:flutter/material.dart';
import 'package:frontend_mobile/utils/api_endpoints.dart';
import 'package:get/get.dart';
import 'package:frontend_mobile/controllers/cartItems_controller.dart'; // 🔸 Ajout important

class BookDetails extends StatefulWidget {
  final Map book;
  const BookDetails({super.key, required this.book});

  @override
  State<BookDetails> createState() => _BookDetailsState();
}

class _BookDetailsState extends State<BookDetails> {
  final CartController cartController = Get.put(CartController()); // 🔸 Instanciation du controller

  @override
  Widget build(BuildContext context) {
    final Map book = widget.book;

    return Scaffold(
      appBar: AppBar(
        title: Text(book['titre'] ?? "Détails"),
        leading: IconButton(
          onPressed: () {
            Get.back();
          },
          icon: Icon(Icons.arrow_back),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              book["titre"] ?? 'Titre inconnu',
              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: Image.network(
                ApiEndpoints.imagesBaseUrl + book["image"],
                height: 250,
                width: double.infinity,
                fit: BoxFit.cover,
              ),
            ),
            const SizedBox(height: 20),
            Text(
              "Description:",
              style: TextStyle(
                fontSize: 19,
                height: 2,
                color: const Color.fromARGB(255, 49, 91, 103),
              ),
              textAlign: TextAlign.justify,
            ),
            const SizedBox(height: 10),
            Text(
              book['description'] ?? 'Aucune description disponible.',
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey[700],
                fontStyle: FontStyle.italic,
                height: 1.6,
              ),
              textAlign: TextAlign.justify,
            ),
            const SizedBox(height: 16),
            Text(
              "Catégories:       ${book['categories'] != null && book['categories'].isNotEmpty ? book['categories'].map((cat) => cat['nom']).join(', ') : 'Non classé.'}",
              style: TextStyle(
                fontSize: 16,
                color: const Color.fromARGB(255, 56, 56, 56),
                height: 1.6,
              ),
              textAlign: TextAlign.justify,
            ),
            const SizedBox(height: 20),
            Center(
              child: ElevatedButton.icon(
                onPressed: () {
                  cartController.addToCart(bookId: book['id']); // ✅ Appel de la méthode
                },
                icon: Icon(Icons.add_shopping_cart_rounded, color: Colors.white),
                label: Text("Ajouter au panier"),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blueAccent,
                  foregroundColor: Colors.white,
                  padding: EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
