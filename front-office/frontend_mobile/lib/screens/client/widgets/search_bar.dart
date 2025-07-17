import 'package:flutter/material.dart';
import 'package:frontend_mobile/controllers/Books_controller.dart';
import 'package:frontend_mobile/screens/client/pages/book_details.dart';
import 'package:get/get.dart';
import 'package:get/get_rx/src/rx_types/rx_types.dart';

/// Flutter code sample for [SearchBar].

class SearchBarWidget extends StatefulWidget {
  @override
  State<SearchBarWidget> createState() => _SearchBarWidgetState();
}

class _SearchBarWidgetState extends State<SearchBarWidget> {
  final BooksController booksController = Get.put(BooksController());

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: SearchAnchor(
          builder: (BuildContext context, SearchController controller) {
            return SearchBar(
              controller: controller,
              autoFocus: false,
              hintText: "Recherecher...",
              padding: const WidgetStatePropertyAll<EdgeInsets>(
                EdgeInsets.symmetric(horizontal: 16.0),
              ),
              onTap: () {
                controller.openView();
              },
              onChanged: (_) {
                // controller.openView();
              },
              leading: const Icon(Icons.search),
            );
          },
          suggestionsBuilder:
              (BuildContext context, SearchController controller) {
            final List<dynamic> results =
                booksController.filterBooks(controller.text);
            return results.map((book) {
              return ListTile(
                  title: Text(book["titre"]),
                  onTap: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => BookDetails(book: book)));
                  });
            }).toList();
          },
        ),
      ),
    );
  }
}
