import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:frontend_mobile/controllers/Categories_controller.dart';
import 'package:frontend_mobile/screens/client/pages/category_books.dart';
import 'package:get/get.dart';

class Categorylist extends StatefulWidget {
  final bool horizontal_direction;
  const Categorylist({super.key, this.horizontal_direction = true});

  @override
  State<Categorylist> createState() => _CategorylistState();
}

class _CategorylistState extends State<Categorylist> {
  final CategoriesController categoriesController = CategoriesController();
  @override
  void initState() {
    super.initState();
    categoriesController.getCategories();
  }

  @override
  Widget build(BuildContext context) {
    return Obx(() {
      var categories = categoriesController.categories;
      if (categories.isEmpty) {
        return const Center(child: CircularProgressIndicator());
      }
      return SizedBox(
        height: 60, // smaller height now that we're not using images
        child: ListView.builder(
          scrollDirection: Axis.horizontal,
          itemCount: categories.length,
          padding: const EdgeInsets.symmetric(horizontal: 12),
          itemBuilder: (context, index) {
            var category = categories[index];
            return InkWell(
              onTap: (() => {Get.to(CategoryBooks(category: category))}),
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 6),
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                decoration: BoxDecoration(
                  color: Color.fromARGB(255, 87, 159, 200)
                      .withOpacity(0.1), // Soft background
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                      color:
                          Color.fromARGB(255, 87, 159, 200)), // Optional border
                ),
                child: Center(
                  child: Text(
                    category['nom'] ?? '',
                    style: const TextStyle(
                      fontSize: 14,
                      color: Color.fromARGB(255, 87, 159, 200),
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ),
            );
          },
        ),
      );
    });
  }
}
