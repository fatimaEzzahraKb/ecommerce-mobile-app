import 'package:flutter/material.dart';
import 'package:frontend_mobile/controllers/Categories_controller.dart';
import 'package:frontend_mobile/screens/client/pages/category_books.dart';
import 'package:get/get.dart';

class Categories extends StatefulWidget {
  const Categories({super.key});

  @override
  State<Categories> createState() => _CategoriesState();
}

class _CategoriesState extends State<Categories> {
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
      return ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: categories.length,
        separatorBuilder: (context, index) => const Divider(height: 24),
        itemBuilder: (context, index) {
          var category = categories[index];
          var bookCount = category["books"].length;
          return InkWell(
              onTap: (() => {Get.to(CategoryBooks(category: category))}),
              child: CategoryCard(name: category['nom'], bookCount: bookCount));
        },
      );
    });
  }
}

class CategoryCard extends StatelessWidget {
  final String name;
  final int bookCount;

  const CategoryCard({super.key, required this.name, required this.bookCount});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 3,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: ListTile(
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        title: Text(
          name,
          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
        ),
        trailing: Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
          decoration: BoxDecoration(
            color: Colors.blue.shade100,
            borderRadius: BorderRadius.circular(20),
          ),
          child: Text(
            '$bookCount books',
            style: TextStyle(
              color: Colors.blue.shade800,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),
    );
  }
}
