import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:frontend_mobile/controllers/cartItems_controller.dart';
import 'package:frontend_mobile/controllers/orders_controller.dart';
import 'package:flutter_stripe/flutter_stripe.dart';

class CartPage extends StatefulWidget {
  const CartPage({Key? key}) : super(key: key);

  @override
  State<CartPage> createState() => _CartPageState();
}

class _CartPageState extends State<CartPage> {
  final CartController cartController = Get.put(CartController());
  final OrderController orderController = Get.put(OrderController());

  bool _userConnected = true;

  @override
  void initState() {
    super.initState();
    _checkAndLoadCart();
  }

  Future<void> _checkAndLoadCart() async {
    final prefs = await SharedPreferences.getInstance();
    final userId = prefs.getInt('user_id');
    if (userId != null) {
      setState(() => _userConnected = true);
      await cartController.fetchCartItems();
    } else {
      setState(() => _userConnected = false);
    }
  }

  Future<void> displayPaymentSheet(BuildContext context) async {
    try {
      await Stripe.instance.presentPaymentSheet();
      await showDialog(
        context: context,
        builder: (_) => const AlertDialog(
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.check_circle, color: Colors.green, size: 100),
              SizedBox(height: 10),
              Text("Paiement réussi !"),
            ],
          ),
        ),
      );
    } on StripeException catch (e) {
      await showDialog(
        context: context,
        builder: (_) => const AlertDialog(
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                children: [
                  Icon(Icons.cancel, color: Colors.red),
                  SizedBox(width: 8),
                  Text("Paiement échoué"),
                ],
              ),
            ],
          ),
        ),
      );
      throw Exception('Paiement échoué: ${e.error.localizedMessage}');
    } catch (e) {
      print('Erreur inattendue: $e');
      throw Exception('Erreur inattendue pendant le paiement');
    }
  }

  Future<void> handleQuantityUpdate(
      Map book, TextEditingController quantityController) async {
    final input = quantityController.text.trim();

    if (input.isEmpty || int.tryParse(input) == null || int.parse(input) <= 0) {
      Get.snackbar('Erreur', 'Entrez une quantité valide (>= 1)');
      return;
    }

    int newQuantity = int.parse(input);

    try {
      await cartController.updateQuantity(
          bookId: book['id'], quantity: newQuantity);
      await Future.delayed(const Duration(milliseconds: 100));
      Get.back(); // Fermer le dialog après la mise à jour réussie
    } catch (e) {
      Get.snackbar('Erreur', 'Erreur lors de la mise à jour');
    }
  }

  void showQuantityDialog(Map book) {
    final TextEditingController quantityController = TextEditingController(
      text: (book['cartItems']?['quantite'] ?? '1').toString(),
    );

    Get.defaultDialog(
      title: 'Modifier la quantité',
      content: Column(
        children: [
          TextField(
            controller: quantityController,
            keyboardType: TextInputType.number,
            decoration: const InputDecoration(
              labelText: 'Quantité',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () {
              handleQuantityUpdate(book, quantityController);
            },
            child: const Text('Mettre à jour'),
          ),
        ],
      ),
    );
  }

  void _showOrderForm() {
    final TextEditingController telephoneController = TextEditingController();
    final TextEditingController adresseController = TextEditingController();
    final TextEditingController villeController = TextEditingController();

    Get.defaultDialog(
      title: "Passer la commande",
      content: Column(
        children: [
          TextField(
            controller: telephoneController,
            keyboardType: TextInputType.phone,
            decoration: const InputDecoration(
              labelText: 'Téléphone',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 10),
          TextField(
            controller: adresseController,
            decoration: const InputDecoration(
              labelText: 'Adresse',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 10),
          TextField(
            controller: villeController,
            decoration: const InputDecoration(
              labelText: 'Ville',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () async {
              final tel = telephoneController.text.trim();
              final addr = adresseController.text.trim();
              final city = villeController.text.trim();

              if (tel.isEmpty || addr.isEmpty || city.isEmpty) {
                Get.snackbar('Erreur', 'Veuillez remplir tous les champs');
                return;
              }

              final totalAmount = cartController.getTotal();

              try {
                // 1) Lancer la feuille de paiement Stripe
                await displayPaymentSheet(context);

                // 2) Enregistrer la commande uniquement si paiement réussi
                final successOrder = await orderController.sendOrder(
                  telephone: tel,
                  adresse: addr,
                  ville: city,
                  total: totalAmount,
                  products: List<Map<String, dynamic>>.from(
                      cartController.cartItems.toList()),
                );
                if (successOrder) {
                  Get.back(); // Fermer le dialogue
                  Get.snackbar('Succès', 'Commande passée avec succès');
                  cartController.cartItems.clear();
                } else {
                  Get.snackbar(
                      'Erreur', 'Erreur lors de la création de la commande');
                }
              } catch (e) {
                Get.snackbar('Erreur', e.toString());
              }
            },
            child: const Text("Confirmer la commande"),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (!_userConnected) {
      return Scaffold(
        appBar: AppBar(title: const Text("Votre panier")),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text("Vous n'êtes pas connecté."),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () => Get.toNamed('/login'),
                child: const Text("Se connecter"),
              )
            ],
          ),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Obx(() => Text(
            'Votre panier - Total: ${cartController.getTotal().toStringAsFixed(2)} DH')),
        centerTitle: true,
      ),
      body: Obx(() {
        if (cartController.isLoading.value) {
          return const Center(child: CircularProgressIndicator());
        } else if (cartController.cartItems.isEmpty) {
          return const Center(child: Text('Panier vide'));
        } else {
          return Column(
            children: [
              Expanded(
                child: ListView.builder(
                  itemCount: cartController.cartItems.length,
                  itemBuilder: (context, index) {
                    final book = cartController.cartItems[index];
                    return Container(
                      margin:
                          const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(10),
                        boxShadow: const [
                          BoxShadow(
                            color: Colors.black12,
                            blurRadius: 5,
                            offset: Offset(0, 3),
                          ),
                        ],
                      ),
                      child: ListTile(
                        title: Text(book['titre'] ?? 'Titre inconnu'),
                        subtitle: Text(
                            'Quantité : ${book['cartItems']?['quantite'] ?? "0"}'),
                        trailing: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            IconButton(
                              icon: const Icon(Icons.edit),
                              onPressed: () {
                                showQuantityDialog(book);
                              },
                            ),
                            IconButton(
                              icon: const Icon(Icons.delete),
                              onPressed: () {
                                cartController.removeFromCart(book['id']);
                              },
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _showOrderForm,
                    style: ElevatedButton.styleFrom(padding: const EdgeInsets.all(16)),
                    child: const Text("Commander maintenant"),
                  ),
                ),
              )
            ],
          );
        }
      }),
    );
  }
}
