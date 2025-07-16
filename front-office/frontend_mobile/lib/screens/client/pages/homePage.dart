import 'package:flutter/material.dart';
import 'package:frontend_mobile/controllers/Books_controller.dart';
import 'package:frontend_mobile/screens/client/pages/book_details.dart';
import 'package:frontend_mobile/screens/client/widgets/search_bar.dart';
import 'package:frontend_mobile/screens/client/widgets/bookItem.dart';
import 'package:frontend_mobile/screens/client/widgets/categoryList.dart';
import 'package:frontend_mobile/screens/client/widgets/heroBanner.dart';
import 'package:frontend_mobile/utils/api_endpoints.dart';
import 'package:get/get.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final BooksController booksController = Get.put(BooksController());

  @override
  void initState() {
    super.initState();
    booksController.getBooks();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const HeroBanner(),
          const SizedBox(height: 18),
          SearchBarWidget(),
          const SizedBox(height: 18),
          const Categorylist(
            horizontal_direction: false,
          ),
          const SizedBox(height: 19),
          Obx(() {
            if (booksController.books.isEmpty) {
              return const Center(child: CircularProgressIndicator());
            }

            return ListView.builder(
              itemCount: booksController.books.length,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemBuilder: (context, index) {
                var book = booksController.books[index];
                return InkWell(
                  onTap: () {
                    Get.to(() => BookDetails(book: book));
                  },
                  child: Card(
                    margin:
                        const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                    elevation: 4,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12)),
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
                                errorBuilder: (context, error, stackTrace) =>
                                    const Icon(Icons.broken_image, size: 100),
                              ),
                            ),
                            const SizedBox(
                              width: 16,
                            ),
                            Expanded(
                                child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  book["titre"] ?? 'Titre inconnu',
                                  style: const TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold),
                                ),
                                const SizedBox(
                                  height: 6,
                                ),
                                Text(
                                  "Auteur: ${book['auteur'] ?? 'Inconnu'}",
                                  style: const TextStyle(color: Colors.grey),
                                ),
                                const SizedBox(
                                  height: 6,
                                ),
                                Text(
                                  "Catégories: ${book['categories'] != null && book['categories'].isNotEmpty ? book['categories'].map((cat) => cat['nom']).join(', ') : 'Non classé'} ",
                                  style:
                                      const TextStyle(color: Colors.blueGrey),
                                ),
                                const SizedBox(
                                  height: 6,
                                ),
                                Text(
                                  "Prix: ${book['prix'] ?? 'N/A'} MAD",
                                  style: const TextStyle(
                                      color: Colors.green,
                                      fontWeight: FontWeight.bold),
                                )
                              ],
                            ))
                          ]),
                    ),
                  ),
                );
              },
            );
          }),
        ],
      ),
    );
  }
}
