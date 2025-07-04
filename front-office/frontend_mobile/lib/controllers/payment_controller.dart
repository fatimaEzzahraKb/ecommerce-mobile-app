import 'package:flutter_stripe/flutter_stripe.dart';
import 'package:get/get.dart';
import 'package:frontend_mobile/utils/api_endpoints.dart';
import 'package:dio/dio.dart' as dio;

class PaymentController extends GetxController {
  Map<String, dynamic>? paymentIntent;

  Future<void> makePayment() async {
    try {
      paymentIntent = await createPaymentIntent('100', 'usd');

      await Stripe.instance.initPaymentSheet(
        paymentSheetParameters: SetupPaymentSheetParameters(
          paymentIntentClientSecret: paymentIntent!['client_secret'],
          merchantDisplayName: 'Ikay',
        ),
      );

      await Stripe.instance.presentPaymentSheet();
      Get.snackbar('Succès', 'Paiement effectué avec succès');
    } on StripeException catch (e) {
      Get.snackbar('Erreur', 'Paiement annulé : ${e.error.localizedMessage}');
    } catch (err) {
      throw Exception(err);
    }
  }

  Future<Map<String, dynamic>> createPaymentIntent(
      String amount, String currency) async {
    try {
      // Dio dio = Dio();
      dio.Response response = await dio.Dio().post(
        '${ApiEndpoints.baseUrl}payments/create-payment-intent',
        options: dio.Options(
          headers: {
            'Authorization': 'Bearer sk_test_...', // ta vraie clé
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        ),
        data: {
          'amount': amount,
          'currency': currency,
        },
      );

      if (response.statusCode == 200) {
        return {'client_secret': response.data['client_secret']};
      } else {
        print('Erreur Stripe: ${response.data.toString()}');
        throw Exception('Erreur lors de la création du paiement');
      }
    } catch (e) {
      print('Exception Stripe: $e');
      throw Exception('Erreur lors de la création du paiement');
    }
  }
}
