import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:frontend_mobile/utils/api_endpoints.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;

class CategoriesController extends GetxController {
  var categories = [].obs;

  Future<void> getCategories() async {
    try {
      var headers = {'Content-Type': "application/json"};
      var url = Uri.parse(ApiEndpoints.baseUrl +
          ApiEndpoints.categoriesEndPoints.getAllCategories);
      http.Response response = await http.get(url, headers: headers);
      if (response.statusCode == 200) {
        final json = jsonDecode(response.body);
        print(json['message']);
        categories.value = json['categories'];
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
}
