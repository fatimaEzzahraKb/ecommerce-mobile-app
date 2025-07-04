import 'dart:convert';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:frontend_mobile/utils/api_endpoints.dart';
import 'package:shared_preferences/shared_preferences.dart';

class OrderController extends GetxController {
  Future<bool> sendOrder({
    required String telephone,
    required String adresse,
    required String ville,
    required double total,
    required List<Map<String, dynamic>> products,
  }) async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');

    if (token == null) {
      Get.snackbar('Erreur', 'Utilisateur non connecté');
      return false;
    }

    try {
      final url = Uri.parse('${ApiEndpoints.baseUrl}orders');

      final response = await http.post(
        url,
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'tel': telephone,
          'adress': adresse,
          'ville': ville,
          'total': total,
          'products': products
              .map((item) => {
                    'id': item['id'],
                    'quantite': item['cartItems']?['quantite'] ?? 1,
                  })
              .toList(),
        }),
      );

      print('Réponse status: ${response.statusCode}');
      print('Réponse corps: ${response.body}');

      if (response.statusCode == 201) {
        final data = json.decode(response.body);
        Get.snackbar('Commande envoyée', data['message']);
        return true;
      } else {
        Get.snackbar('Erreur', 'Échec de l\'envoi de la commande');
        return false;
      }
    } catch (e) {
      Get.snackbar('Erreur serveur', e.toString());
      return false;
    }
  }
}
