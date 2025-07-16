import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:frontend_mobile/utils/api_endpoints.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;

class BooksController extends GetxController {
  var books = [].obs;
  var book = {}.obs;
  Future<void> getBooks() async {
    try {
      var headers = {'Content-Type': "application/json"};
      var url = Uri.parse(
          ApiEndpoints.baseUrl + ApiEndpoints.booksEndPoints.getAllBooks);
      http.Response response = await http.get(url, headers: headers);
      if (response.statusCode == 200) {
        final json = jsonDecode(response.body);
        print(json['message']);
        books.value = json['books'];
      } else {
        final error = jsonDecode(response.body);
        throw error['message'] ?? error.toString();
      }
    } catch (e) {
      Get.back();
      showDialog(
          context: Get.context!,
          builder: (context) {
            return SimpleDialog(
              title: Text("Error"),
              contentPadding: EdgeInsets.all(20),
              children: [Text(e.toString())],
            );
          });
    }
  }

  Future<void> bookDetails(id) async {
    try {
      var headers = {'Content-Type': "application/json"};
      var url = Uri.parse(
          ApiEndpoints.baseUrl + ApiEndpoints.booksEndPoints.getOneBook(id));
      http.Response response = await http.get(url, headers: headers);
      if (response.statusCode == 200) {
        final json = jsonDecode(response.body);
        book.value = json['book'];
      } else {
        final error = jsonDecode(response.body);
        throw error['message'] ?? error.toString();
      }
    } catch (e) {
      Get.back();
      showDialog(
          context: Get.context!,
          builder: (context) {
            return SimpleDialog(
              title: Text("Error"),
              contentPadding: EdgeInsets.all(20),
              children: [Text(e.toString())],
            );
          });
    }
  }

  List<dynamic> filterBooks(String query) {
    // ignore: invalid_use_of_protected_member
    if (query.isEmpty) return books.value.take(5).toList();
    return books
        .where((book) => book['titre']
            .toString()
            .toLowerCase()
            .contains(query.toLowerCase()))
        .toList();
  }
}
