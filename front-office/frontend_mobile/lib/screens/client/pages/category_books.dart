import 'package:flutter/material.dart';
import 'package:frontend_mobile/screens/client/pages/book_details.dart';
import 'package:frontend_mobile/utils/api_endpoints.dart';
import 'package:get/get.dart';

class CategoryBooks extends StatefulWidget {
  final Map category;
  const CategoryBooks({super.key, required this.category});

  @override
  State<CategoryBooks> createState() => _CategoryBooksState();
}

class _CategoryBooksState extends State<CategoryBooks> {
  @override
  Widget build(BuildContext context) {
    final Map category = widget.category;
    final List books = category["books"] ?? [];

    return Scaffold(
      appBar: AppBar(
        title: Text(category['nom'] ?? "Détails"),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Get.back(),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              category["nom"] ?? "Nom inconnu",
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 24,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),
            books.isEmpty
                ? const Center(
                    child: Text(
                      "Aucun livre trouvé.",
                      style: TextStyle(color: Colors.grey),
                    ),
                  )
                : ListView.builder(
                    itemCount: books.length,
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemBuilder: (context, index) {
                      var book = books[index];
                      return InkWell(
                        onTap: () => Get.to(() => BookDetails(book: book)),
                        child: Card(
                          margin: const EdgeInsets.symmetric(
                              vertical: 10, horizontal: 0),
                          elevation: 4,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(12),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                ClipRRect(
                                  borderRadius: BorderRadius.circular(10),
                                  child: Image.network(
                                    ApiEndpoints.imagesBaseUrl + book['image'],
                                    width: 100,
                                    height: 140,
                                    fit: BoxFit.cover,
                                    errorBuilder:
                                        (context, error, stackTrace) =>
                                            const Icon(Icons.broken_image,
                                                size: 100),
                                  ),
                                ),
                                const SizedBox(width: 16),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        book["titre"] ?? 'Titre inconnu',
                                        style: const TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      const SizedBox(height: 6),
                                      Text(
                                        "Auteur: ${book['auteur'] ?? 'Inconnu'}",
                                        style:
                                            const TextStyle(color: Colors.grey),
                                      ),
                                      const SizedBox(height: 6),
                                      Text(
                                        "Catégories: ${book['categories'] != null && book['categories'].isNotEmpty ? book['categories'].map((cat) => cat['nom']).join(', ') : 'Non classé'}",
                                        style: const TextStyle(
                                            color: Colors.blueGrey),
                                      ),
                                      const SizedBox(height: 6),
                                      Text(
                                        "Prix: ${book['prix'] ?? 'N/A'} MAD",
                                        style: const TextStyle(
                                          color: Colors.green,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      )
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      );
                    },
                  ),
          ],
        ),
      ),
    );
  }
}
