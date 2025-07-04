import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:frontend_mobile/screens/client/mainClient.dart';
import 'package:frontend_mobile/utils/api_endpoints.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class RegisterController extends GetxController {
  TextEditingController nomController = TextEditingController();
  TextEditingController prenomController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController villeController = TextEditingController();
  TextEditingController paysController = TextEditingController();
  TextEditingController mdpController = TextEditingController();

  final Future<SharedPreferences> _prefs = SharedPreferences.getInstance();

  Future<void> registerWitEmail() async {
    try {
      var headers = {'Content-Type': 'application/json'};
      var url = Uri.parse(
          ApiEndpoints.baseUrl + ApiEndpoints.authEndPoints.registerUser);
      Map body = {
        'nom': nomController.text,
        'prenom': prenomController.text,
        'email': emailController.text.trim(),
        'ville': villeController.text,
        'pays': paysController.text,
        'mdp': mdpController.text,
      };

      http.Response response =
          await http.post(url, body: jsonEncode(body), headers: headers);

      if (response.statusCode == 201) {
        final json = jsonDecode(response.body);
        var token = json['data']['Token'];
        var userId =
            json['data']['user']['id']; // ✅ récupère l'ID de l'utilisateur

        final SharedPreferences? prefs = await _prefs;
        await prefs?.setString('token', token);
        await prefs?.setInt('user_id', userId); // ✅ enregistre user_id

        // Nettoyage
        nomController.clear();
        prenomController.clear();
        emailController.clear();
        villeController.clear();
        paysController.clear();
        mdpController.clear();

        Get.off(MainClient());
      } else {
        throw jsonDecode(response.body)['message'] ?? "Uknown Error Occured";
      }
    } catch (e) {
      Get.back();
      showDialog(
        context: Get.context!,
        builder: (context) {
          return SimpleDialog(
            title: Text('Erreur'),
            contentPadding: EdgeInsets.all(20),
            children: [Text(e.toString())],
          );
        },
      );
    }
  }
}
