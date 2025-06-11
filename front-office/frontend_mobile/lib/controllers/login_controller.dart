import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:frontend_mobile/screens/home.dart';
import 'package:frontend_mobile/utils/api_endpoints.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class LoginController extends GetxController {
  TextEditingController emailController = TextEditingController();
  TextEditingController mdpController = TextEditingController();

  final Future<SharedPreferences> _prefs = SharedPreferences.getInstance();

  Future<void> loginWithEmail() async {
    try {
      var headers = {'Content-Type': 'application/json'};
      var url = Uri.parse(
          ApiEndpoints.baseUrl + ApiEndpoints.authEndPoints.loginUser);
      Map body = {
        'email': emailController.text.trim(),
        'mdp': mdpController.text,
      };
      http.Response response =
          await http.post(url, body: jsonEncode(body), headers: headers);

      if (response.statusCode == 200) {
        final json = jsonDecode(response.body);
        var token = json['token'];
        print(token);
        final SharedPreferences? prefs = await _prefs;

        await prefs?.setString('token', token);

        emailController.clear();
        mdpController.clear();
        Get.off(HomeScreen());
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
              title: Text('Error'),
              contentPadding: EdgeInsets.all(20),
              children: [Text(e.toString())],
            );
          });
    }
  }
}
