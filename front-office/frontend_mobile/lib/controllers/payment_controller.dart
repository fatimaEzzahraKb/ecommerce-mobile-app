import 'package:flutter_stripe/flutter_stripe.dart';
import 'package:frontend_mobile/controllers/cartItems_controller.dart';
import 'package:frontend_mobile/controllers/orders_controller.dart';
import 'package:get/get.dart';
import 'package:frontend_mobile/utils/api_endpoints.dart';
import 'package:dio/dio.dart' as dio;
import 'package:shared_preferences/shared_preferences.dart';

class PaymentController extends GetxController {
  Map<String, dynamic>? paymentIntent;
  final CartController cartController = Get.put(CartController());
  final OrderController orderController = Get.put(OrderController());

  Future<void> makePayment({required Function onPaymentSuccess}) async {
    try {
      final totalAmount = (cartController.getTotal() * 100).toInt().toString();

      paymentIntent = await createPaymentIntent(totalAmount);

      await Stripe.instance.initPaymentSheet(
        paymentSheetParameters: SetupPaymentSheetParameters(
          paymentIntentClientSecret: paymentIntent!['client_secret'],
          merchantDisplayName: 'Ikay',
        ),
      );

      await Stripe.instance.presentPaymentSheet();
      Get.snackbar('Succès', 'Paiement effectué avec succès');
      onPaymentSuccess();
    } on StripeException catch (e) {
      Get.snackbar('Erreur', 'Paiement annulé : ${e.error.localizedMessage}');
    } catch (err) {
      print('Erreur inattendue: $err');
      throw Exception('Erreur inattendue pendant le paiement');
    }
  }

  Future<Map<String, dynamic>> createPaymentIntent(String amount) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');

      if (token == null) throw Exception("Utilisateur non authentifié");

      dio.Response response = await dio.Dio().post(
        '${ApiEndpoints.baseUrl}payments/create-payment-intent',
        options: dio.Options(
          headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        ),
        data: {
          'amount': amount,
        },
      );

      if (response.statusCode == 200 && response.data['clientSecret'] != null) {
        orderController.fetchOrders();
        return {
          'client_secret': response.data['clientSecret'],
        };
      } else {
        print('Erreur Stripe: ${response.data}');
        throw Exception('Erreur lors de la création du paiement');
      }
    } catch (e) {
      print('Exception Stripe: $e');
      throw Exception('Erreur lors de la création du paiement');
    }
  }
}
