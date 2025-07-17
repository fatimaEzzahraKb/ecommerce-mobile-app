import 'dart:convert';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:frontend_mobile/utils/api_endpoints.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CartController extends GetxController {
  final isLoading = false.obs;
  var cartItems = <dynamic>[].obs;

  /// Appelle l’API POST /cart
  Future<void> addToCart({required int bookId, int quantity = 1}) async {
    isLoading.value = true;
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');
      if (token == null) {
        Get.snackbar('Erreur', 'Vous devez être connecté·e');
        return;
      }

      final url = Uri.parse('${ApiEndpoints.baseUrl}cart');
      final body = jsonEncode({
        'book_id': bookId,
        'quantite': quantity,
      });

      final response = await http.post(url,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer $token',
          },
          body: body);

      if (response.statusCode == 200) {
        Get.snackbar('Succès', 'Livre ajouté au panier !',
            snackPosition: SnackPosition.BOTTOM);
        await fetchCartItems(); // Met à jour la liste locale
      } else {
        final decoded = jsonDecode(response.body);
        final msg = decoded['message'] ?? decoded['error'] ?? 'Erreur inconnue';
        Get.snackbar('Erreur', msg, snackPosition: SnackPosition.BOTTOM);
      }
    } catch (e) {
      Get.snackbar('Erreur', 'Une erreur est survenue : $e');
    } finally {
      isLoading.value = false;
    }
  }

  /// Appelle l’API get
  Future<bool> fetchCartItems() async {
    isLoading.value = true;

    final prefs = await SharedPreferences.getInstance();
    final userId = prefs.getInt('user_id');

    if (userId == null) {
      // Ne pas afficher snackbar ici
      cartItems.clear();
      isLoading.value = false;
      return false;
    }

    final url = Uri.parse('${ApiEndpoints.baseUrl}cart/$userId');

    try {
      final response = await http.get(url);

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        cartItems.value = data['cartItems'] ?? [];
        isLoading.value = false;
        return true;
      } else {
        cartItems.clear();
        isLoading.value = false;
        return false;
      }
    } catch (e) {
      cartItems.clear();
      isLoading.value = false;
      return false;
    }
  }

  Future<void> removeFromCart(int bookId) async {
    isLoading.value = true;

    final prefs = await SharedPreferences.getInstance();
    final userId = prefs.getInt('user_id');
    final token = prefs.getString('token');

    if (userId == null || token == null) {
      Get.snackbar('Erreur', 'Utilisateur non connecté');
      isLoading.value = false;
      return;
    }

    final url = Uri.parse('${ApiEndpoints.baseUrl}cart/$userId/$bookId');

    try {
      final response = await http.delete(
        url,
        headers: {
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        Get.snackbar('Succès', 'Livre retiré du panier');
        await fetchCartItems(); // Refresh cart after deletion
      } else {
        final message = jsonDecode(response.body)['message'] ?? 'Erreur';
        Get.snackbar('Erreur', message);
      }
    } catch (e) {
      Get.snackbar('Erreur', e.toString());
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> updateQuantity(
      {required int bookId, required int quantity}) async {
    isLoading.value = true;

    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');

      if (token == null) {
        Get.snackbar('Erreur', 'Vous devez être connecté·e');
        return;
      }

      final url = Uri.parse('${ApiEndpoints.baseUrl}cart');
      final body = jsonEncode({
        'book_id': bookId,
        'quantite': quantity,
      });

      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: body,
      );

      if (response.statusCode == 200) {
        Get.snackbar('Succès', 'Quantité mise à jour avec succès');
        // Ferme d'abord le dialog
        Get.back(); // <<<<< ajoute ça ici si tu peux accéder au contexte Get
        await fetchCartItems(); // Recharge le panier après
      } else {
        final msg = jsonDecode(response.body)['message'] ??
            "Erreur lors de la mise à jour";
        Get.snackbar('Erreur', msg);
      }
    } catch (e) {
      Get.snackbar('Erreur', e.toString());
    } finally {
      isLoading.value = false;
    }
  }

  double getTotal() {
    double total = 0.0;
    for (var item in cartItems) {
      final prix = item['prix'] ?? 0;
      final quantite = item['cartItems']?['quantite'] ?? 1;
      total += prix * quantite;
    }
    return total;
  }

 Future<void> clearCartServer() async {
  final prefs = await SharedPreferences.getInstance();
  final userId = prefs.getInt('user_id');
  final token = prefs.getString('token');

  if (userId == null) {
    Get.snackbar('Erreur', 'Utilisateur non connecté');
    return;
  }

  final url = Uri.parse('${ApiEndpoints.baseUrl}cart/clear/$userId');

  try {
    final response = await http.delete(
      url,
      headers: {
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      Get.snackbar('Succès', data['message']);
      cartItems.clear();
      prefs.remove('cartItems');
    } else {
      final msg = jsonDecode(response.body)['message'] ?? 'Erreur inconnue';
      Get.snackbar('Erreur', msg);
    }
  } catch (e) {
    Get.snackbar('Erreur', 'Erreur serveur : $e');
  }
}

  
}
