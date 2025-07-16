import 'package:flutter/material.dart';
import 'package:frontend_mobile/controllers/orders_controller.dart';
import 'package:frontend_mobile/screens/client/pages/cartItems.dart';
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
  final CartController cartController = Get.put(CartController());

  int addAvailability = 0;
  // si c pas en panier 0 , si c en panier 1, si c épuisé -2, si il y a moins de 5 en qt c -1

  @override
  void initState() {
    super.initState();
    determineAvailability();
  }

  void determineAvailability() {
    final book = widget.book;
    final cart = cartController.cartItems;
    bool existInChart = cart.any((b) => b["id"] == book["id"]);
    if (book["quantite"] == 0) {
      addAvailability = -2;
    } else if (book["quantite"] < 5 && !existInChart) {
      addAvailability = -1;
    } else if (existInChart) {
      addAvailability = 1;
    } else if (!existInChart) {
      addAvailability = 0;
    }
  }

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
                onPressed: addAvailability == -2
                    ? null
                    : () {
                        if (addAvailability == 0 || addAvailability == -1) {
                          cartController.addToCart(bookId: book['id']);
                          setState(() => determineAvailability());
                        } else if (addAvailability == 1) {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => CartPage()),
                          );
                        }
                      },
                icon: addAvailability == 0
                    ? Icon(Icons.add_shopping_cart_rounded, color: Colors.white)
                    : addAvailability == 1
                        ? Icon(Icons.shopping_bag_rounded, color: Colors.white)
                        : addAvailability == -2
                            ? Icon(Icons.block, color: Colors.white)
                            : addAvailability == -1
                                ? Icon(Icons.add_shopping_cart_rounded,
                                    color: Colors.white)
                                : Icon(Icons.add_shopping_cart_rounded,
                                    color: Colors.white),
                label: addAvailability == 0
                    ? Text("Ajouter au panier")
                    : addAvailability == 1
                        ? Text("Accèder au panier")
                        : addAvailability == -2
                            ? Text("Epuisé")
                            : Text("Il reste moins de 5 exemplaire "),
                style: ElevatedButton.styleFrom(
                  backgroundColor: addAvailability == 0
                      ? Colors.blueAccent
                      : addAvailability == -1
                          ? Colors.amberAccent
                          : addAvailability == -2
                              ? Colors.grey
                              : Colors.greenAccent,
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
