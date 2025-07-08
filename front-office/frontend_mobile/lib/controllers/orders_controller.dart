import 'dart:convert';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:frontend_mobile/utils/api_endpoints.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:dio/dio.dart' as dio;

class OrderController extends GetxController {
  var orders = [].obs;
  var isLoading = false.obs;

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
          'books': products
              .map((item) => {
                    'book_id': item['id'],
                    'quantity': item['cartItems']?['quantite'] ?? 1,
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

  Future<void> fetchOrders() async {
    try {
      isLoading.value = true;

      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');

      if (token == null) {
        throw Exception("Utilisateur non authentifié");
      }

      final response = await dio.Dio().get(
        '${ApiEndpoints.baseUrl}orders',
        options: dio.Options(
          headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/json',
          },
        ),
      );

      if (response.statusCode == 200) {
        orders.value = response.data['orders'];
      } else {
        print('Erreur réponse: ${response.data}');
        throw Exception('Erreur lors de la récupération des commandes');
      }
    } catch (e) {
      print('Erreur fetchOrders: $e');
      Get.snackbar('Erreur', 'Erreur lors du chargement des commandes');
    } finally {
      isLoading.value = false;
    }
  }
}
